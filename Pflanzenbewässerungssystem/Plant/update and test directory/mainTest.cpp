#include <Arduino.h>
#include <WiFi.h>
#include <NTPClient.h>
#include <Preferences.h>
#include <ESPAsyncWebServer.h>
#include <FS.h>
#include <SPIFFS.h>
#include <fstream>
#include <iostream>

#define PUMP1 4
#define PUMP2 5
#define PUMP3 6

void usePump(int seconds, int pumpNum) {
    if (pumpNum == 1) {
        digitalWrite(PUMP1, HIGH);
        delay(seconds);
        digitalWrite(PUMP1, LOW);
    } else if (pumpNum == 2) {
        digitalWrite(PUMP2, HIGH);
        delay(seconds);
        digitalWrite(PUMP2, LOW);
    } else if (pumpNum == 3) {
        digitalWrite(PUMP3, HIGH);
        delay(seconds);
        digitalWrite(PUMP3, LOW);
    }
}

void setup() {
    Serial.begin(115200);
    delay(2000);
    pinMode(PUMP1, OUTPUT);
    pinMode(PUMP2, OUTPUT);
    pinMode(PUMP3, OUTPUT);
}

void loop() {
    usePump(10000, 1);
    Serial.println("1 gepummpt");
    delay(1000);
    usePump(10000, 2);
    Serial.println("2 gepummpt");
    delay(1000);
    usePump(10000, 3);
    Serial.println("3 gepummpt");
    delay(1000);
}