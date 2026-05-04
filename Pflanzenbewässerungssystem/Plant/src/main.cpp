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
int dayGoal[3] = {1, 1, 1};                     //ziel an Tagen bis wieder gepumpt wird
int intervalInMillSec[3] = {1000, 1000, 1000};     //zeit, die gepummt wird in Millisekunden
int pumpCount = sizeof(dayGoal) / sizeof(dayGoal[0]);                               //anzahl der pumpen
bool running = false;                            //ob das bewässerungssystem läuft

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
void webRouts() { //initialize webrouts to frontend
    
}

/** Setup (macht der 1 mal beim Einschalten) */
void setup() { //setup local storage, webserver routes, get variables from local storage (if )...
    Serial.begin(115200);
    delay(1000);
    preferences.begin("PlantSystem", false);

    pinMode(PUMP1, OUTPUT);
    pinMode(PUMP2, OUTPUT);
    pinMode(PUMP3, OUTPUT);

    // Register web endpoints
    webRouts();
}

void loop() {
}