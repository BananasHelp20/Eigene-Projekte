#include <Arduino.h>
#include <WiFi.h>
#include <NTPClient.h>
#include <Preferences.h>
#include <ESPAsyncWebServer.h>
#include <FS.h>
#include <SPIFFS.h>
#include <fstream>
#include <iostream>

#define PUMP1 21 //da preprocessor geht afoch drüba und schreibt überall wo PUMP1 steht de zoi 21 hi. (ziemlich warscheinlich)
#define PUMP2 20
#define PUMP3 1

// für die schule
const char *ssid = "HTL-Perg Gast";
const char *password = "FIT2024!";

// für zuhause
// const char *ssid = "Friedhof";
// const char *password = "EW749DF109";

AsyncWebServer webServer(80); //80 is da port
String header;
String output26State = "off";
String output27State = "off";

// ntp client einrichten
WiFiUDP udp;
NTPClient timeClient(udp, "pool.ntp.org", 0, 60000); // Zeitserver und Zeitintervall
Preferences preferences;

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
}

void webserverOnUse() {
    webServer.on("/usePump1", HTTP_GET, [](AsyncWebServerRequest *request) {
        digitalWrite(PUMP1, HIGH);
        Serial.println("pump1 was started");
        request->send(200);
    });

    webServer.on("/stopPump1", HTTP_GET, [](AsyncWebServerRequest *request) {
        digitalWrite(PUMP1, LOW);
        Serial.println("pump1 was stopped");
        request->send(200); 
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

    // Print local IP address and start web server
    Serial.println("WiFi connected.");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
}

void loop() {
    int num = 0;
    while (!timeClient.update() && running) {
        num++;
        Serial.print(num);
        delay(1000);
    }
}