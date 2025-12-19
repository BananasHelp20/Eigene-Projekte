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
#define PUMP2 18
#define PUMP3 19

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

// Variablen zum Speichern
static int daysToPump1 = preferences.getInt("dayGoal1", -1);
static int daysToPump2 = preferences.getInt("dayGoal2", -1);
static int daysToPump3 = preferences.getInt("dayGoal3", -1);

static double durationPump1 = preferences.getInt("duration1", -1);
static double durationPump2 = preferences.getInt("duration2", -1);
static double durationPump3 = preferences.getInt("duration3", -1);

// zuletzt gespeicherte Zeit, an der gepumpt wurde
static int lastTimeAnActionTookPlaceInSeconds1;
static int lastTimeAnActionTookPlaceInSeconds2;
static int lastTimeAnActionTookPlaceInSeconds3;
static int currentTimeInSeconds = timeClient.getEpochTime();
static int ctrDays1 = (currentTimeInSeconds - lastTimeAnActionTookPlaceInSeconds1) / 60 / 60 / 24;
static int ctrDays2 = (currentTimeInSeconds - lastTimeAnActionTookPlaceInSeconds2) / 60 / 60 / 24;
static int ctrDays3 = (currentTimeInSeconds - lastTimeAnActionTookPlaceInSeconds3) / 60 / 60 / 24;

String intToString(int num)
{
    return "" + num + "";
}

String doubleToString(double num)
{
    return "" + num + "";
}

void usePump(int seconds; int pumpNum)
{
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

void setup()
{

    Serial.begin(115200);

    pinMode(PUMP1, OUTPUT);
    pinMode(PUMP2, OUTPUT);
    pinMode(PUMP3, OUTPUT);

    Serial.println("Initializing SPIFFS...");
    if (!SPIFFS.begin())
    {
        Serial.println("An Error has occurred while mounting SPIFFS");
        return;
    }
    preferences.begin("PlantWatering", false);
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

    webServer.on("/usePump1", HTTP_GET, [](AsyncWebServerRequest *request)
                 { 
                        Serial.println("müsli.println");
                        ctrDays1 = 0;
                        lastTimeAnActionTookPlaceInSeconds1 = timeClient.getEpochTime();
                        usePump(durationPump1, 1);
                        //preferences.putInt("latestEvent1", lastTimeAnActionTookPlaceInSeconds1);
                        request->send(200); });
    webServer.on("/usePump2", HTTP_GET, [](AsyncWebServerRequest *request)
                 {
                        request->send(200);
                        usePump(durationPump2, 2);
                        ctrDays2 = 0;
                        lastTimeAnActionTookPlaceInSeconds2 = timeClient.getEpochTime();
                        preferences.putInt("latestEvent2", lastTimeAnActionTookPlaceInSeconds2); });
    webServer.on("/usePump3", HTTP_GET, [](AsyncWebServerRequest *request)
                 {
                        request->send(200);
                        usePump(durationPump3, 3);
                        ctrDays3 = 0;
                        lastTimeAnActionTookPlaceInSeconds3 = timeClient.getEpochTime();
                        preferences.putInt("latestEvent3", lastTimeAnActionTookPlaceInSeconds3); });
    webServer.on("/usePump1IgnoreCTR", HTTP_GET, [](AsyncWebServerRequest *request)
                 {
                        request->send(200);
                        usePump(durationPump1, 1); });
    webServer.on("/usePump2IgnoreCTR", HTTP_GET, [](AsyncWebServerRequest *request)
                 {
                        request->send(200);
                        usePump(durationPump2, 2); });
    webServer.on("/usePump3IgnoreCTR", HTTP_GET, [](AsyncWebServerRequest *request)
                 {
                        request->send(200);
                        usePump(durationPump3, 3); });
    webServer.on("/increaseSecPump1", HTTP_GET, [](AsyncWebServerRequest *request)
                 {
                        if (durationPump1 < 600) {
                           durationPump1+= 0.1;
                           preferences.putInt("duration1", durationPump1);
                           Serial.println("flow duration: " + durationPump1);
                        } else {
                            Serial.println("Maximum von 600 sekunden erreicht (10min)");
                        }
                        request->send(200, "text/plain", durationPump1);
                        });
    /*webServer.on("/increaseSecPump2", HTTP_GET, [](AsyncWebServerRequest *request)
                 {
                     if (durationPump1 < 600) {
                           durationPump1+= 0.1;
                           preferences.putInt("duration1", durationPump1);
                           Serial.println("flow duration: " + durationPump1);
                        } else {
                            Serial.println("Maximum von 600 sekunden erreicht (10min)");
                        }
                        request->send(200, "text/plain", durationPump1);
                        });
                });
    webServer.on("/increaseSecPump3", HTTP_GET, [](AsyncWebServerRequest *request)
                 {
                     if (durationPump1 < 600) {
                           durationPump1+= 0.1;
                           preferences.putInt("duration1", durationPump1);
                           Serial.println("flow duration: " + durationPump1);
                        } else {
                            Serial.println("Maximum von 600 sekunden erreicht (10min)");
                        }
                        request->send(200, "text/plain", durationPump1);

                 });
    webServer.on("/decreaseSecPump1", HTTP_GET, [](AsyncWebServerRequest *request)
                 {
                     request->send(200);
                     if (durationPump1 > 0.1) {
                        durationPump1-= 0.1;
                        preferences.putInt("duration1", durationPump1);
                     }
                     //writeFile(SPIFFS, "currS1.txt", doubleToString(durationPump1));
                 });
    webServer.on("/decreaseSecPump2", HTTP_GET, [](AsyncWebServerRequest *request)
                 {
                     request->send(200);
                     if (durationPump2 > 0.1) {
                        durationPump2-= 0.1;
                        preferences.putInt("duration2", durationPump2);
                     }
                     //writeFile(SPIFFS, "currS2.txt", doubleToString(durationPump2));
                 });
    webServer.on("/decreaseSecPump3", HTTP_GET, [](AsyncWebServerRequest *request)
                 {
                     request->send(200);
                     if (durationPump3 > 0.1) {
                        durationPump3-= 0.1;
                        preferences.putInt("duration3", durationPump3);
                     }
                     //writeFile(SPIFFS, "currS3.txt", doubleToString(durationPump3));
                 });

    webServer.on("/decreaseDaysPump1", HTTP_GET, [](AsyncWebServerRequest *request)
                 {
                     request->send(200);
                     if (daysToPump1 > 1) {
                        daysToPump1--;
                        preferences.putInt("dayGoal3", daysToPump1);
                     }
                     writeFile(SPIFFS, "currD1.txt", intToString(daysToPump1));
                 });
    webServer.on("/decreaseDaysPump2", HTTP_GET, [](AsyncWebServerRequest *request)
                 {
                     request->send(200);
                     if (daysToPump2 > 1) {
                        daysToPump2--;
                        preferences.putInt("dayGoal3", daysToPump2);
                     }
                     writeFile(SPIFFS, "currD2.txt", intToString(daysToPump2));
                 });
    webServer.on("/decreaseDaysPump3", HTTP_GET, [](AsyncWebServerRequest *request)
                 {
                     request->send(200);
                     if (daysToPump3 > 1) {
                        daysToPump3--;
                        preferences.putInt("dayGoal3", daysToPump3);
                     }
                     writeFile(SPIFFS, "currD3.txt", intToString(daysToPump3));
                 });
    webServer.on("/increaseDaysPump1", HTTP_GET, [](AsyncWebServerRequest *request)
                 {
                     request->send(200);
                     if (daysToPump1 < 365) {
                        daysToPump1++;
                        preferences.putInt("dayGoal1", daysToPump1);
                     }
                     writeFile(SPIFFS, "currD1.txt", intToString(daysToPump1));
                 });
    webServer.on("/increaseDaysPump2", HTTP_GET, [](AsyncWebServerRequest *request)
                 {
                     request->send(200);
                     if (daysToPump2 < 365) {
                        daysToPump2++;
                        preferences.putInt("dayGoal2", daysToPump2);
                     }
                     writeFile(SPIFFS, "currD2.txt", intToString(daysToPump2));
                 });
    webServer.on("/increaseDaysPump3", HTTP_GET, [](AsyncWebServerRequest *request)
                 {
                     request->send(200);
                     if (daysToPump3 < 365) {
                        daysToPump3++;
                        preferences.putInt("dayGoal3", daysToPump3);
                     }
                     writeFile(SPIFFS, "currD3.txt", intToString(daysToPump3));
                 });
    */

    static boolean running = true;
    static int timeCtr1 = 0;
    static int timeCtr2 = 0;
    static int timeCtr3 = 0;
    
    webServer.on("/startProcess", HTTP_GET, [](AsyncWebServerRequest *request)
                 {
                    request->send(200);
                    running = true; });

    webServer.on("/stopProcess", HTTP_GET, [](AsyncWebServerRequest *request)
                 {
                    request->send(200);
                    running = false; });

    // Print local IP address and start web server
    Serial.println("WiFi connected.");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
}

void loop()
{
    if (running == true)
    {
        currentTimeInSeconds = timeClient.getEpochTime();
        preferences.begin("PlantwateringSystem", false);

        // Warten, bis die Zeit synchronisiert ist
        while (!timeClient.update())
        { // NOTE AN MICH, in der While is der dann de ganze zeit!

            if (timeCtr1 /1000 / 60 / 60 >= 24)
            {
                ctrDays1++;
                timeCtr1 -= (24 * 60 * 60 * 1000);
            }
            if (timeCtr2 / 1000 / 60 / 60 >= 24)
            {
                ctrDays2++;
                timeCtr2 -= (1000 * 24 * 60 * 60);
            }
            if (timeCtr3 /1000 / 60 / 60 >= 24)
            {
                ctrDays3++;
                timeCtr3 -= (1000 * 24 * 60 * 60);
            }
            preferences.putInt("dayGoal1", daysToPump1);
            preferences.putInt("dayGoal2", daysToPump2);
            preferences.putInt("dayGoal3", daysToPump3);

            timeClient.forceUpdate();
            Serial.println(timeClient.getFormattedTime());
            timeClient.update(); // Die aktuelle Zeit abfragen

            // zeitberechnungen
            if (preferences.getInt("dayGoal1", -1) <= ctrDays1)
            {
                usePump(durationPump1, 1);
                lastTimeAnActionTookPlaceInSeconds1 = timeClient.getEpochTime();
                preferences.putInt("latestEvent1", lastTimeAnActionTookPlaceInSeconds1);
                ctrDays1 = 0;
            }

            if (preferences.getInt("dayGoal2", -1) <= ctrDays2)
            {
                usePump(durationPump2, 2);
                lastTimeAnActionTookPlaceInSeconds2 = timeClient.getEpochTime();
                preferences.putInt("latestEvent2", lastTimeAnActionTookPlaceInSeconds2);
                ctrDays2 = 0;
            }

            if (preferences.getInt("dayGoal3", -1) <= ctrDays3)
            {
                ctrDays3 = 0;
                usePump(durationPump3, 3);
                lastTimeAnActionTookPlaceInSeconds3 = timeClient.getEpochTime();
                preferences.putInt("latestEvent3", lastTimeAnActionTookPlaceInSeconds3);
            }
        }
        delay(10000);
    }
}