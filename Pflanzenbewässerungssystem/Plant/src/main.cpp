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
int dayGoal[3] = {10, 10, 10};                     //ziel an Tagen bis wieder gepumpt wird
int intervalInMillSec[3] = {1000, 1000, 1000};     //zeit, die gepummt wird in Millisekunden
int pumpCount = 3;                               //anzahl der pumpen

/* variables for Time */
long unsigned int timeStamp[3] = {timeClient.getEpochTime(), timeClient.getEpochTime(), timeClient.getEpochTime()};             //wenn gepumpt wird, wird diese Variable auf die momentane Zeit gesetzt
int dividerDays = 24 * 60 * 60 * 1000;                                    //Hilfsvariable zum dividieren
long unsigned int currentTimeInSec = timeClient.getEpochTime();                         //Hilfsvariable, das ist die momentane Zeit in Sekunden
constexpr unsigned long SECONDS_PER_DAY = 24UL * 60UL * 60UL;                           // = 86400

/** Methods */

/** betätigt die Pumpe (X) für (X) Millisekunden */
void usePump(int seconds, int pumpNum) {
    if (pumpNum == 1)
    {
        digitalWrite(PUMP1, HIGH);
        delay(seconds);
        digitalWrite(PUMP1, LOW);
    }
    else if (pumpNum == 2) 
    {
        digitalWrite(PUMP2, HIGH);
        delay(seconds);
        digitalWrite(PUMP2, LOW);
    }
    else if (pumpNum == 3)
    {
        digitalWrite(PUMP3, HIGH);
        delay(seconds);
        digitalWrite(PUMP3, LOW);
    }
    /*
    else if (pumpNum == 4)
    {
        digitalWrite(PUMP4, HIGH);
        delay(seconds);
        digitalWrite(PUMP4, LOW);
    }
    */
    Serial.print("Pumped " + String(pumpNum) + " for " + String(seconds) + " milliseconds");
}

void flushAll() {
    for (size_t i = 0; i < pumpCount; i++)
    {
        usePump(intervalInMillSec[i], i + 1);
    }

    Serial.println("flushed all pumps");
}

/** Helper to check cooldown and remaining time (based on dayGoal) */
bool canUsePump(int pumpNum) {
    int i = pumpNum - 1;
    unsigned long now = currentTimeInSec;
    unsigned long allowedAt = timeStamp[i] + (unsigned long)dayGoal[i]; //* SECONDS_PER_DAY;
    return now >= allowedAt;
}

unsigned long remainingSeconds(int pumpNum) {
    int i = pumpNum - 1;
    unsigned long now = currentTimeInSec;
    unsigned long allowedAt = timeStamp[i] + (unsigned long)dayGoal[i]; //* SECONDS_PER_DAY;
    if (now >= allowedAt) return 0;
    return allowedAt - now;
}

void webserverOnUse() {
    String uri;
    String key;
    for (int i = 0; i < pumpCount; i++)
    {
        uri = "/usePump" + String(i + 1);
        key = "Stamp" + String(i + 1);

        webServer.on(uri.c_str(), HTTP_GET, [i, key](AsyncWebServerRequest *request) {
            timeClient.update();
            currentTimeInSec = timeClient.getEpochTime();
            usePump(intervalInMillSec[i], i + 1);
            timeStamp[i] = currentTimeInSec;
            preferences.putULong(key.c_str(), timeStamp[i]);

            Serial.println("pump" + String(i + 1) + " was used");
            request->send(200, "text/plain", "OK"); 
        });
    }

    for (int i = 0; i < pumpCount; i++) 
    {
        uri = "/usePumpNoCtr" + String(i + 1);

        webServer.on(uri.c_str(), HTTP_GET, [i](AsyncWebServerRequest *request) {
            usePump(intervalInMillSec[i], i + 1);

            Serial.println("pump" + String(i + 1) + " was used");
            request->send(200, "text/plain", "OK");
        });
    }

    webServer.on("/flushAll", HTTP_GET, [](AsyncWebServerRequest *request) {
        timeClient.update();
        currentTimeInSec = timeClient.getEpochTime();
        flushAll(); //flush all pumps
        for (int i = 0; i < pumpCount; i++) {
            timeStamp[i] = currentTimeInSec;
            String keyStamp = "Stamp" + String(i + 1);
            preferences.putULong(keyStamp.c_str(), timeStamp[i]);
        }
        Serial.println("all pumps flushed");
        request->send(200, "text/plain", "OK");
    });

    webServer.on("/setPump", HTTP_GET, [](AsyncWebServerRequest *request) {
        if (!request->hasParam("pump")) {
            request->send(400, "text/plain", "missing pump");
            return;
        }
        int pump = request->getParam("pump")->value().toInt();
        if (pump < 1 || pump > pumpCount) {
            request->send(400, "text/plain", "invalid pump");
            return;
        }

        int days = request->hasParam("days") ? request->getParam("days")->value().toInt() : dayGoal[pump-1];
        int interval = request->hasParam("interval") ? request->getParam("interval")->value().toInt() : intervalInMillSec[pump-1];

        dayGoal[pump - 1] = days;
        intervalInMillSec[pump - 1] = interval;

        String keyDay = "DayGoal" + String(pump);
        String keyInterval = "Interval" + String(pump);

        preferences.putInt(keyDay.c_str(), days);
        preferences.putInt(keyInterval.c_str(), interval);

        request->send(200, "application/json", String("{\"ok\":true,\"pump\":") + pump + "}");
    });

    webServer.on("/getPump", HTTP_GET, [](AsyncWebServerRequest *request) {
        if (!request->hasParam("pump")) {
            request->send(400, "text/plain", "missing pump");
            return;
        }

        int pump = request->getParam("pump")->value().toInt();
        if (pump < 1 || pump > pumpCount) {
            request->send(400, "text/plain", "invalid pump");
            return;
        }

        int i = pump - 1;
        String json = "{";
        json += "\"dayGoal\":" + String(dayGoal[i]) + ",";
        json += "\"intervalInMillSec\":" + String(intervalInMillSec[i]) + ",";
        json += "}";
        request->send(200, "application/json", json);
    });
}

/** Setup (macht der 1 mal beim Einschalten) */
void setup() {
    Serial.begin(115200);
    delay(1000);
    preferences.begin("PlantSystem", false);

    pinMode(PUMP1, OUTPUT);
    pinMode(PUMP2, OUTPUT);
    pinMode(PUMP3, OUTPUT);

    Serial.println("Initializing SPIFFS...");
    if (!SPIFFS.begin(true)) {
        Serial.println("An Error has occurred while mounting SPIFFS");
        return;
    }
    webServer.serveStatic("/", SPIFFS, "/").setDefaultFile("index.html");

    // Connect to Wi-Fi network with SSID and password
    Serial.print("Connecting to ");
    Serial.println(ssid);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }

    Serial.println();
    webServer.begin();
    timeClient.begin();

    // Load saved timestamps and settings from Preferences
    for (int i = 0; i < pumpCount; i++) {
        String keyStamp = "Stamp" + String(i + 1);
        timeStamp[i] = preferences.getULong(keyStamp.c_str(), 0);
        String keyDay = "DayGoal" + String(i + 1);
        dayGoal[i] = preferences.getInt(keyDay.c_str(), dayGoal[i]);
        String keyInterval = "Interval" + String(i + 1);
        intervalInMillSec[i] = preferences.getInt(keyInterval.c_str(), intervalInMillSec[i]);
    }

    // Register web endpoints
    webserverOnUse();

    // Ensure we have a time value
    timeClient.update();
    currentTimeInSec = timeClient.getEpochTime();

    // Print local IP address and start web server
    Serial.println("WiFi connected.");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
    MDNS.begin("plant.willi");
}

void loop() {
    // keep NTP time up to date
    if (timeClient.update()) {
        currentTimeInSec = timeClient.getEpochTime();
    }
    delay(1000);
}