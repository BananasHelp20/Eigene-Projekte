#include <Arduino.h>
#include <WiFi.h>
#include <NTPClient.h>
#include <Preferences.h>
#include <ESPAsyncWebServer.h>
#include <FS.h>
#include <SPIFFS.h>
#include <LittleFS.h>
#include <fstream>
#include <iostream>


#define PUMP1 21 //da preprocessor geht afoch drüba und schreibt überall wo PUMP1 steht de zoi 21 hi. (ziemlich warscheinlich)
#define PUMP2 20
#define PUMP3 1

// für die schule
const char *ssid = "HTL-Perg Gast";
const char *password = "FIT2025!";

// für zuhause
// const char *ssid = "Friedhof";
// const char *password = "EW749DF109";

AsyncWebServer server(80); //80 is da port
String header;
String output26State = "off";
String output27State = "off";

// ntp client einrichten
WiFiUDP udp;
NTPClient timeClient(udp, "pool.ntp.org", 0, 60000); // Zeitserver und Zeitintervall
Preferences preferences;

/** Variables */
boolean running = true;      //Variable, die true ist, wenn auf der Website eingeschaltet wird, bzw false ist, wenn ausgeschaltet wird

/** Pump variables */
int dayGoal[3] = {10, 10, 10};                     //ziel an Tagen bis wieder gepumpt wird
int intervArSize = 3;
int intervalInMillSec[3] = {1000, 1000, 1000};     //zeit, die gepummt wird: intervall = 3000 --> 3 sec. pumpen (3000 millisec.)

/* variables for Time */
int timeStamp[3] = {timeClient.getEpochTime(), timeClient.getEpochTime(), timeClient.getEpochTime()};             //wenn gepumpt wird, wird diese Variable auf die momentane Zeit gesetzt
int deviderDays = 24 * 60 * 60 * 1000;                                    //Hilfsvariable zum dividieren
int currentTimeInSec = timeClient.getEpochTime();                         //Hilfsvariable, das ist die momentane Zeit in Sekunden
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
    /*else if (pumpNum == 4)
    {
        digitalWrite(PUMP4, HIGH);
        delay(seconds);
        digitalWrite(PUMP4, LOW);
    }*/
}

void flushAll(int seconds) {
    digitalWrite(PUMP1, HIGH);
    delay(seconds);
    digitalWrite(PUMP1, LOW);
    delay(1000);
    digitalWrite(PUMP2, HIGH);
    delay(seconds);
    digitalWrite(PUMP2, LOW);
    delay(1000);
    digitalWrite(PUMP3, HIGH);
    delay(seconds);
    digitalWrite(PUMP3, LOW);
    /*delay(1000);
    digitalWrite(PUMP4, HIGH);
    delay(seconds);
    digitalWrite(PUMP4, LOW);*/
    //...
}

/*void webserverOnUse() {
    webServer.on("/usePump1", HTTP_GET, [](AsyncWebServerRequest *request) {
        usePump(intervalInMillSec[0], 1);
        timeStamp[0] = timeClient.getEpochTime();
        preferences.putInt("Stamp1", timeStamp[0]);
        Serial.println("pump1 was used");
        request->send(200);
    });

    webServer.on("/usePump2", HTTP_GET, [](AsyncWebServerRequest *request) {
        usePump(intervalInMillSec[1], 2);
        timeStamp[1] = timeClient.getEpochTime();
        preferences.putInt("Stamp2", timeStamp[1]);
        Serial.println("pump2 was used");
        request->send(200); 
    });

    webServer.on("/usePump3", HTTP_GET, [](AsyncWebServerRequest *request) {
        usePump(intervalInMillSec[2], 3);
        timeStamp[2] = timeClient.getEpochTime();
        preferences.putInt("Stamp3", timeStamp[2]);
        Serial.println("pump3 was used");
        request->send(200);
    });
}*/

/** Setup (macht der 1 mal beim Einschalten) */
void setup() {
    Serial.begin(115200);
    delay(1000);
    preferences.begin("PlantSystem", false);

    pinMode(PUMP1, OUTPUT);
    pinMode(PUMP2, OUTPUT);
    pinMode(PUMP3, OUTPUT);

    /*Serial.println("Initializing SPIFFS...");
    if (!SPIFFS.begin(true)) {
        Serial.println("An Error has occurred while mounting SPIFFS");
        return;
    }*/
    //webServer.serveStatic("/", SPIFFS, "/").setDefaultFile("index.html");

    // Connect to Wi-Fi network with SSID and password
    Serial.print("Connecting to ");
    Serial.println(ssid);
    WiFi.begin(ssid, password);
    Serial.print("Verbinde mit WLAN");
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }

    Serial.println();
    // webServer.begin();
    timeClient.begin();

    // Print local IP address and start web server
    Serial.println("\nVerbunden! IP: ");
    Serial.println(WiFi.localIP());


    if (!LittleFS.begin()) {
        Serial.println("Fehler beim Start von LittleFS");
        return;
    }
    server.serveStatic("/", LittleFS, "/").setDefaultFile("index.html");

    server.on("/api/status", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(200, "application/json", "{\"status\": \"ok\", \"uptime\": " + String(millis()) + "}");
    });
    server.begin();
}

void loop() {
    int num = 0;
    while (!timeClient.update() && running) {
        num++;
        Serial.print(num);
        delay(1000);
    }
}