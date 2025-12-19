#include <Arduino.h>
#include <WiFi.h>
#include <NTPClient.h>
#include <Preferences.h>
#include <ESPAsyncWebServer.h>
#include <FS.h>
#include <SPIFFS.h>
#include <fstream>
#include <iostream>

#define PUMP1 17
#define PUMP2 16
#define PUMP3 15

// für die schule
const char *ssid = "HTL-Perg Gast";
const char *password = "FIT2024!";

// für zuhause
// const char *ssid = "Friedhof";
// const char *password = "EW749DF109";

AsyncWebServer webServer(80);
String header;
String output26State = "off";
String output27State = "off";

// ntp client einrichten
WiFiUDP udp;
NTPClient timeClient(udp, "pool.ntp.org", 0, 60000); // Zeitserver und Zeitintervall
Preferences preferences;


/** Variables */

static boolean running = true;      //Variable, die true ist, wenn auf der Website eingeschaltet wird, bzw false ist, wenn ausgeschaltet wird

/** Pump variables */
static int[] dayGoal = {0, 0, 0};               //ziel an Tagen bis wieder gepumt wird
static int[] intervalInMillSec = {1000, 1000, 1000};     //zeit, die gepummt wird: intervall = 3000 --> 3 sec. pumpen (3000 millisec.)

/* variables for Time */
static int[] timeStamp = {NTPClient.getEpochTime(), NTPClient.getEpochTime(), NTPClient.getEpochTime()};             //wenn gepumpt wird, wird diese Variable auf die momentane Zeit gesetzt
static int deviderDays = 24 * 60 * 60 * 1000;                                   //Hilfsvariable zum dividieren
static int currentTimeInSec = NTPClient.getEpochTime();                         //Hilfsvariable, das ist die momentane Zeit in Sekunden

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
}


/** Setup (macht der 1 mal beim Einschalten) */
void setup() {
    Serial.begin(115200);
    preferences.begin("PlantWatering", false);
    delay(1000);
    preferences.begin("PlantwateringSystem", false);

    pinMode(PUMP1, OUTPUT);
    pinMode(PUMP2, OUTPUT);
    pinMode(PUMP3, OUTPUT);

    Serial.println("Initializing SPIFFS...");
    if (!SPIFFS.begin())
    {
        Serial.println("An Error has occurred while mounting SPIFFS");
        return;
    }
    webServer.serveStatic("/", SPIFFS, "/").setDefaultFile("index.html");

    // Connect to Wi-Fi network with SSID and password
    Serial.print("Connecting to ");
    Serial.println(ssid);
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED)
    {
        delay(500);
        Serial.print(".");
    }

    webServer.begin();
    timeClient.begin();

    /** Buttons on the Website */
    
    /* Pumpe manuell betätigen */
    webServer.on("/usePump1", HTTP_GET, [](AsyncWebServerRequest *request) {
        usePump(intervalInMillSec[0], 1);
        request->send(200); 
    });
    
    webServer.on("/usePump2", HTTP_GET, [](AsyncWebServerRequest *request) {
        usePump(intervalInMillSec[1], 2);
        request->send(200);
    });

    webServer.on("/usePump3", HTTP_GET, [](AsyncWebServerRequest *request) {
        usePump(intervalInMillSec[2], 3);
        request->send(200);
    });

    /* Prozess starten/stoppen */
    webServer.on("/startProcess", HTTP_GET, [](AsyncWebServerRequest *request) {
        request->send(200, "text/plain", running);
        running = true; 
    });

    webServer.on("/stopProcess", HTTP_GET, [](AsyncWebServerRequest *request) {
        request->send(200, "text/plain", running);
        running = false; 
    });

    /* Increase/decrease duration */
    webServer.on("/increaseSecPump1", HTTP_GET, [](AsyncWebServerRequest *request) {
        if (intervallInMillSec[0] < 1200000) {
            intervallInMillSec[0] += 100;
            preferences.putInt("duration1", intervallInMillSec[0]);

            Serial.println("flow duration: " + intervallInMillSec[0]);
            
        } else {
            Serial.println("Maximum von 1200 sekunden erreicht (20min)");
        }
        request->send(200);
        //request->send(200, "text/plain", intervallInMillSec[0]);
    });

    webServer.on("/increaseSecPump2", HTTP_GET, [](AsyncWebServerRequest *request) {
        if (intervallInMillSec[1] < 1200000) {
            intervallInMillSec[1] += 100;
            preferences.putInt("duration2", intervallInMillSec[1]);

            Serial.println("flow duration: " + intervallInMillSec[1]);
            
        } else {
            Serial.println("Maximum von 1200 sekunden erreicht (20min)");
        }
        request->send(200);
        //request->send(200, "text/plain", intervallInMillSec[0]);
    });

    webServer.on("/increaseSecPump3", HTTP_GET, [](AsyncWebServerRequest *request) {
        if (intervallInMillSec[2] < 1200000) {
            intervallInMillSec[2] += 100;
            preferences.putInt("duration3", intervallInMillSec[2]);

            Serial.println("flow duration: " + intervallInMillSec[2]);
            
        } else {
            Serial.println("Maximum von 1200 sekunden erreicht (20min)");
        }
        request->send(200);
        //request->send(200, "text/plain", intervallInMillSec[0]);
    });

    webServer.on("/decreaseSecPump3", HTTP_GET, [](AsyncWebServerRequest *request) {
        if (intervallInMillSec[2] > 100) {
            intervallInMillSec[2] -= 100;
            preferences.putInt("duration3", intervallInMillSec[2]);

            Serial.println("flow duration: " + intervallInMillSec[2]);
            
        } else {
            Serial.println("Minimum von 0.1 sekunden erreicht (100 millsec.)");
        }
        request->send(200);
        //request->send(200, "text/plain", intervallInMillSec[0]);
    });

    webServer.on("/decreaseSecPump2", HTTP_GET, [](AsyncWebServerRequest *request) {
        if (intervallInMillSec[1] > 100) {
            intervallInMillSec[1] -= 100;
            preferences.putInt("duration2", intervallInMillSec[1]);

            Serial.println("flow duration: " + intervallInMillSec[1]);
            
        } else {
            Serial.println("Minimum von 0.1 sekunden erreicht (100 millsec.)");
        }
        request->send(200);
        //request->send(200, "text/plain", intervallInMillSec[0]);
    });

    webServer.on("/decreaseSecPump1", HTTP_GET, [](AsyncWebServerRequest *request) {
        if (intervallInMillSec[0] > 100) {
            intervallInMillSec[0] -= 100;
            preferences.putInt("duration1", intervallInMillSec[0]);

            Serial.println("flow duration: " + intervallInMillSec[0]);
            
        } else {
            Serial.println("Minimum von 0.1 sekunden erreicht (100 millsec.)");
        }
        request->send(200);
        //request->send(200, "text/plain", intervallInMillSec[0]);
    });



    /* Increase/decrease dayGoal */
    webServer.on("/decreaseDaysPump1", HTTP_GET, [](AsyncWebServerRequest *request) {
            if (dayGoal[0] > 1) {
                dayGoal[0]--;
            preferences.putInt("dayGoal1", dayGoal[0]);
            } else {
                Serial.println("Minimum von 1 Tag erreicht");
            }
            request->send(200);
        //request->send(200, "text/plain", dayGoal[0]);
    });

    webServer.on("/decreaseDaysPump2", HTTP_GET, [](AsyncWebServerRequest *request) {
            if (dayGoal[1] > 1) {
                dayGoal[1]--;
            preferences.putInt("dayGoal2", dayGoal[1]);
            } else {
                Serial.println("Minimum von 1 Tag erreicht");
            }
            request->send(200);
        //request->send(200, "text/plain", dayGoal[0]);
    });

    webServer.on("/decreaseDaysPump3", HTTP_GET, [](AsyncWebServerRequest *request) {
            if (dayGoal[2] > 1) {
                dayGoal[2]--;
            preferences.putInt("dayGoal3", dayGoal[2]);
            } else {
                Serial.println("Minimum von 1 Tag erreicht");
            }
            request->send(200);
        //request->send(200, "text/plain", dayGoal[0]);
    });

    webServer.on("/increaseDaysPump3", HTTP_GET, [](AsyncWebServerRequest *request) {
            if (dayGoal[2] < 365) {
                dayGoal[2]++;
            preferences.putInt("dayGoal3", dayGoal[2]);
            } else {
                Serial.println("Maximum von 1 Jahr (365 Tage) erreicht");
            }
            request->send(200);
        //request->send(200, "text/plain", dayGoal[0]);
    });

    webServer.on("/increaseDaysPump2", HTTP_GET, [](AsyncWebServerRequest *request) {
            if (dayGoal[1] < 365) {
                dayGoal[1]++;
            preferences.putInt("dayGoal2", dayGoal[1]);
            } else {
                Serial.println("Maximum von 1 Jahr (365 Tage) erreicht");
            }
            request->send(200);
        //request->send(200, "text/plain", dayGoal[0]);
    });

    webServer.on("/increaseDaysPump3", HTTP_GET, [](AsyncWebServerRequest *request) {
            if (dayGoal[0] < 365) {
                dayGoal[0]++;
            preferences.putInt("dayGoal1", dayGoal[0]);
            } else {
                Serial.println("Maximum von 1 Jahr (365 Tage) erreicht");
            }
            request->send(200);
        //request->send(200, "text/plain", dayGoal[0]);
    });



    // Print local IP address and start web server
    Serial.println("WiFi connected.");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
}

void loop {
    
    dayGoal[0] = preferences.getInt("Daygoal1", -1);
    dayGoal[1] = preferences.getInt("Daygoal2", -1);
    dayGoal[2] = preferences.getInt("Daygoal3", -1);

    while (!timeClient.update() && running) {
        if ((currentTimeInSec-timeStamp[0])/dividerDays >= dayGoal[0]) {
            usePump(intervalInMillSec[0], 1);
        }
        if ((currentTimeInSec-timeStamp[1])/dividerDays >= dayGoal[1]) {
            usePump(intervalInMillSec[1], 2);
        }
        if ((currentTimeInSec-timeStamp[2])/dividerDays >= dayGoal[2]) {
            usePump(intervalInMillSec[2], 3);
        }
    }

}