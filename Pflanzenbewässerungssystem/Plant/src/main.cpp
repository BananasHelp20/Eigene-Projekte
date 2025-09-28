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

// int manipulateSecPump(int pumpNum, boolean increase, int intervallInMillSecs[]) {
//     pumpNum --;
//     if (increase) {
//         if (intervallInMillSecs[pumpNum] < 3600000) {
//             intervallInMillSecs[pumpNum] += 100;
//             preferences.putInt("duration1", intervallInMillSecs[pumpNum]);
//             Serial.println("flow duration: " + intervallInMillSecs[pumpNum]);

//         } else {
//             Serial.println("Maximum von 1200 sekunden erreicht (20min)");
//         }
//     } else {
//         if (intervallInMillSecs[pumpNum] > 100) {
//             intervallInMillSecs[pumpNum] -= 100;
//             preferences.putInt("duration1", intervallInMillSecs[pumpNum]);
//             Serial.println("flow duration: " + intervallInMillSecs[pumpNum]);
            
//         } else {
//             Serial.println("Minimum von 0.1 sekunden erreicht (100 millsec.)");
//         }
//     }
//     return intervallInMillSecs[pumpNum];
// }

// int manipulateDayPump(int pumpNum, boolean increase, int daysGoal[]) {
//     pumpNum--;
//     Serial.println(increase);
//     if (increase) {
//         if (daysGoal[pumpNum] < 365) {
//             daysGoal[pumpNum]++;
//             preferences.putInt("dayGoal3", daysGoal[pumpNum]);
//         } else {
//             Serial.println("Maximum von 1 Jahr (365 Tage) erreicht");
//         }
//     } else {
//         if (daysGoal[pumpNum] > 1) {
//             daysGoal[pumpNum]--;
//             preferences.putInt("dayGoal1", daysGoal[pumpNum]);
//         } else {
//             Serial.println("Minimum von 1 Tag erreicht");
//         }
//     }
//     return daysGoal[pumpNum];
// }

void webserverOnUse() {
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
}

// void webserverOnNoCounter() {
//     webServer.on("/usePump1IgnoreCTR", HTTP_GET, [](AsyncWebServerRequest *request) {
//         usePump(intervalInMillSec[0], 1);
//         Serial.println("pump1 was used");
//         request->send(200); 
//     });

//     webServer.on("/usePump2IgnoreCTR", HTTP_GET, [](AsyncWebServerRequest *request) {
//         usePump(intervalInMillSec[1], 2);
//         Serial.println("pump2 was used");
//         request->send(200); 
//     });

//     webServer.on("/usePump3IgnoreCTR", HTTP_GET, [](AsyncWebServerRequest *request) {
//         usePump(intervalInMillSec[2], 3);
//         Serial.println("pump3 was used");
//         request->send(200); 
//     });
// }

// void webserverProcessStatus() {
//     webServer.on("/startProcess", HTTP_GET, [](AsyncWebServerRequest *request) {
//         running = true;
//         preferences.putBool("running", running);
//         Serial.println("process started"); 
//         request->send(200, "text/plain", "true");
//     });

//     webServer.on("/stopProcess", HTTP_GET, [](AsyncWebServerRequest *request) {
//         running = false;
//         preferences.putBool("running", running);
//         Serial.println("progress stopped"); 
//         request->send(200, "text/plain", "false");
//     });
// }

// void webserverOnIncreaseSec() {
//     webServer.on("/increaseSecPump1", HTTP_GET, [](AsyncWebServerRequest *request) {
//         preferences.putInt("Seconds1", intervalInMillSec[0]);
//         Serial.println("duration increased 1"); 
//         request->send(200, "text/plain", String(intervalInMillSec[0] = manipulateSecPump(1, true, intervalInMillSec)));
//     });

//     webServer.on("/increaseSecPump2", HTTP_GET, [](AsyncWebServerRequest *request) {
//         preferences.putInt("Seconds2", intervalInMillSec[1]);
//         Serial.println("duration increased 2"); 
//         request->send(200, "text/plain", String(intervalInMillSec[1] = manipulateSecPump(2, true, intervalInMillSec)));
//     });

//     webServer.on("/increaseSecPump3", HTTP_GET, [](AsyncWebServerRequest *request) {
//         preferences.putInt("Seconds3", intervalInMillSec[2]);
//         Serial.println("duration increased 3"); 
//         request->send(200, "text/plain", String(intervalInMillSec[2] = manipulateSecPump(3, true, intervalInMillSec)));
//     });
// }

// void webserverOnDecreaseSec() {
//     webServer.on("/decreaseSecPump3", HTTP_GET, [](AsyncWebServerRequest *request) {
//         preferences.putInt("Seconds3", intervalInMillSec[2]);
//         Serial.println("duration decreased 3"); 
//         request->send(200, "text/plain", String(intervalInMillSec[2] = manipulateSecPump(3, false, intervalInMillSec)));
//     });

//     webServer.on("/decreaseSecPump2", HTTP_GET, [](AsyncWebServerRequest *request) {
//         preferences.putInt("Seconds2", intervalInMillSec[1]);
//         Serial.println("duration decreased 2"); 
//         request->send(200, "text/plain", String(intervalInMillSec[1] = manipulateSecPump(2, false, intervalInMillSec)));
//     });

//     webServer.on("/decreaseSecPump1", HTTP_GET, [](AsyncWebServerRequest *request) {
//         preferences.putInt("Seconds1", intervalInMillSec[0]);
//         Serial.println("duration decreased 1"); 
//         request->send(200, "text/plain", String(intervalInMillSec[0] = manipulateSecPump(1, false, intervalInMillSec)));
//     });
// }

// void webserverOnIncreaseDays() {
//     webServer.on("/increaseDaysPump3", HTTP_GET, [](AsyncWebServerRequest *request) {
//         preferences.putInt("Daygoal3", dayGoal[2]);
//         Serial.println("days increased 3"); 
//         request->send(200, "text/plain", String(dayGoal[2] = manipulateDayPump(3, true, dayGoal)));
//         //request->send(200, "text/plain", "Hello");
//     });

//     webServer.on("/increaseDaysPump2", HTTP_GET, [](AsyncWebServerRequest *request) {
//         preferences.putInt("Daygoal2", dayGoal[1]);
//         Serial.println("days increased 2"); 
//         request->send(200, "text/plain", String(dayGoal[1] = manipulateDayPump(2, true, dayGoal)));
//     });

//     webServer.on("/increaseDaysPump1", HTTP_GET, [](AsyncWebServerRequest *request) {
//         preferences.putInt("Daygoal1", dayGoal[0]);
//         Serial.println("days increased 1"); 
//         request->send(200, "text/plain", String(dayGoal[0] = manipulateDayPump(1, true, dayGoal)));
//     });
// }

// void webserverOnDecreaseDays() {
//     webServer.on("/decreaseDaysPump1", HTTP_GET, [](AsyncWebServerRequest *request) {
//         preferences.putInt("Daygoal1", dayGoal[0]);
//         Serial.println("days decreased 1"); 
//         request->send(200, "text/plain", String(dayGoal[0] = manipulateDayPump(1, false, dayGoal)));
//     });

//     webServer.on("/decreaseDaysPump2", HTTP_GET, [](AsyncWebServerRequest *request) {
//         preferences.putInt("Daygoal2", dayGoal[1]);
//         Serial.println("days decreased 2"); 
//         request->send(200, "text/plain", String(dayGoal[1] = manipulateDayPump(2, false, dayGoal)));
//     });

//     webServer.on("/decreaseDaysPump3", HTTP_GET, [](AsyncWebServerRequest *request) {
//         preferences.putInt("Daygoal3", dayGoal[2]);
//         Serial.println("days decreased 3"); 
//         request->send(200, "text/plain", String(dayGoal[2] = manipulateDayPump(3, false, dayGoal)));
//     });
// }

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