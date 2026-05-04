#include <Arduino.h>
#include <WiFi.h>
#include <NTPClient.h>
#include <Preferences.h>
#include <ESPAsyncWebServer.h>
#include <FS.h>
#include <SPIFFS.h>
#include <fstream>
#include <iostream>
#include <ESPmDNS.h>
#include <ArduinoJson.h>

#define PUMP1 4 //da preprocessor geht afoch drüba und schreibt überall wo PUMP1 steht de zoi 21 hi. (ziemlich warscheinlich)
#define PUMP2 5
#define PUMP3 6
//#define PUMP4 [PIN]

// für die schule
//const char *ssid = "HTL-Perg Gast";
//const char *password = "FIT2024!";

// für zuhause
const char *ssid = "Friedhof";
const char *password = "EW749DF109";

AsyncWebServer webServer(80); //80 is da port
String header;
String output26State = "off";
String output27State = "off";

// ntp client einrichten
WiFiUDP udp;
NTPClient timeClient(udp, "pool.ntp.org", 0, 60000); // Zeitserver und Zeitintervall
Preferences preferences;

/** Variables */

/** Pump variables */
int dayGoal[3] = {1, 1, 1};                     //ziel an Tagen bis wieder gepumpt wird
int durationInMillSec[3] = {1000, 1000, 1000};     //zeit, die gepumpt wird in Millisekunden
int pumpCount = sizeof(dayGoal) / sizeof(dayGoal[0]);                               //anzahl der pumpen
bool running = false;                            //ob das bewässerungssystem läuft
int pumpDefinitions[3] = {PUMP1, PUMP2, PUMP3}; //array mit den pump pins (für spätere erweiterung auf mehr pumpen)

/* variables for Time */
long unsigned int timeStamp[3] = {timeClient.getEpochTime(), timeClient.getEpochTime(), timeClient.getEpochTime()};             //wenn gepumpt wird, wird diese Variable auf die momentane Zeit gesetzt
int dividerDays = 24 * 60 * 60 * 1000;                                    //Hilfsvariable zum dividieren
long unsigned int currentTimeInSec = timeClient.getEpochTime();                         //Hilfsvariable, das ist die momentane Zeit in Sekunden
constexpr unsigned long SECONDS_PER_DAY = 24UL * 60UL * 60UL;                           // = 86400

/** Methods */

int getArLength(int Ar[]) {
    int length = sizeof(Ar) / sizeof(Ar[0]);
    return length;
}

/** betätigt die Pumpe (X) für (X) Millisekunden */
void usePump(int seconds, int pumpNum) {
    digitalWrite(pumpDefinitions[pumpNum - 1], HIGH); //pumpe an
    delay(seconds); //warte die angegebene
    digitalWrite(pumpDefinitions[pumpNum - 1], LOW); //pumpe aus
    Serial.print("Pumped " + String(pumpNum) + " for " + String(seconds) + " milliseconds");
}

void flushAll() {
    for (size_t i = 0; i < pumpCount; i++)
    {
        usePump(durationInMillSec[i], i + 1);
    }

    Serial.println("flushed all pumps");
}

/** Helper to check cooldown and remaining time (based on dayGoal) */
void webRouts() { //initialize webroutes to frontend
    
    // GET /api/getData - returns all pump data as JSON array
    webServer.on("/api/getData", HTTP_GET, [](AsyncWebServerRequest *request) {
        StaticJsonDocument<512> doc;
        JsonArray pumpArray = doc.createNestedArray("pumps");
        
        for (int i = 0; i < pumpCount; i++) {
            JsonObject pumpObject = pumpArray.createNestedObject();
            pumpObject["pumpNumber"] = i + 1;
            pumpObject["interval"] = dayGoal[i];
            pumpObject["duration"] = durationInMillSec[i];
            pumpObject["lastPumpingTimestamp"] = (long unsigned int)timeStamp[i];
        }
        
        String response;
        serializeJson(doc, response);
        request->send(200, "application/json", response);
    });
    
    // POST /api/pump - activate pump and set timestamp
    webServer.on("/api/pump", HTTP_POST, [](AsyncWebServerRequest *request) {}, nullptr, [](AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total) {
        StaticJsonDocument<200> doc;
        DeserializationError error = deserializeJson(doc, data);
        
        if (error) {
            request->send(400, "application/json", "{\"error\":\"Invalid JSON\"}");
            return;
        }
        
        int pumpNumber = doc["number"];
        int duration = doc["duration"];
        
        if (pumpNumber > 0 && pumpNumber <= pumpCount) {
            usePump(duration, pumpNumber);
            timeStamp[pumpNumber - 1] = timeClient.getEpochTime();
            request->send(200, "application/json", "{\"status\":\"success\"}");
        } else {
            request->send(400, "application/json", "{\"error\":\"Invalid pump number\"}");
        }
    });
    
    // POST /api/pump/no-counter - activate pump without setting timestamp
    webServer.on("/api/pump/no-counter", HTTP_POST, [](AsyncWebServerRequest *request) {}, nullptr, [](AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total) {
        StaticJsonDocument<200> doc;
        DeserializationError error = deserializeJson(doc, data);
        
        if (error) {
            request->send(400, "application/json", "{\"error\":\"Invalid JSON\"}");
            return;
        }
        
        int pumpNumber = doc["number"];
        int duration = doc["duration"];
        
        if (pumpNumber > 0 && pumpNumber <= pumpCount) {
            usePump(duration, pumpNumber);
            // NO timestamp update - intentionally omitted
            request->send(200, "application/json", "{\"status\":\"success\"}");
        } else {
            request->send(400, "application/json", "{\"error\":\"Invalid pump number\"}");
        }
    });
    
    // POST /api/setDuration - set pump duration
    webServer.on("/api/setDuration", HTTP_POST, [](AsyncWebServerRequest *request) {}, nullptr, [](AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total) {
        StaticJsonDocument<200> doc;
        DeserializationError error = deserializeJson(doc, data);
        
        if (error) {
            request->send(400, "application/json", "{\"error\":\"Invalid JSON\"}");
            return;
        }
        
        int pumpNumber = doc["number"];
        int duration = doc["duration"];
        
        if (pumpNumber > 0 && pumpNumber <= pumpCount) {
            durationInMillSec[pumpNumber - 1] = duration;
            request->send(200, "application/json", "{\"status\":\"success\"}");
        } else {
            request->send(400, "application/json", "{\"error\":\"Invalid pump number\"}");
        }
    });
    
    // POST /api/setInterval - set pump interval (dayGoal)
    webServer.on("/api/setInterval", HTTP_POST, [](AsyncWebServerRequest *request) {}, nullptr, [](AsyncWebServerRequest *request, uint8_t *data, size_t len, size_t index, size_t total) {
        StaticJsonDocument<200> doc;
        DeserializationError error = deserializeJson(doc, data);
        
        if (error) {
            request->send(400, "application/json", "{\"error\":\"Invalid JSON\"}");
            return;
        }
        
        int pumpNumber = doc["number"];
        int interval = doc["interval"];
        
        if (pumpNumber > 0 && pumpNumber <= pumpCount) {
            dayGoal[pumpNumber - 1] = interval;
            request->send(200, "application/json", "{\"status\":\"success\"}");
        } else {
            request->send(400, "application/json", "{\"error\":\"Invalid pump number\"}");
        }
    });
}

/** Setup (macht der 1 mal beim Einschalten) */
void setup() { //setup local storage, webserver routes, get variables from local storage (if )...
    Serial.begin(115200);
    delay(1000);
    preferences.begin("PlantSystem", false);

    for (size_t i = 0; i < pumpCount; i++)
    {
        pinMode(pumpDefinitions[i], OUTPUT);
    }

    // Register web endpoints
    webRouts();
}

void loop() {
}