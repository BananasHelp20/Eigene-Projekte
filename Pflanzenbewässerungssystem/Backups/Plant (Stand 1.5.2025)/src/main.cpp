#include <Arduino.h>
#include <WiFi.h>
#include <NTPClient.h>
#include <Preferences.h>
#include <ESPAsyncWebServer.h>
#include <FS.h>
#include <SPIFFS.h>
#include <fstream>
#include <iostream>

#define PUMP1 17 //da prepocessor geht afoch drüba und schreibt überall wo PUMP1 steht de zoi 17 hi. (ziemlich warscheinlich)
#define PUMP2 16
#define PUMP3 15

// für die schule
const char *ssid = "HTL-Perg Gast";
const char *password = "FIT2024!";

int pumps[] = {1, 2, 3};

// für zuhausewwwwwwwww
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
int dayGoal[3] = {10, 10, 10};                        //ziel an Tagen bis wieder gepumt wird
int intervalInMillSec[3] = {10000, 10000, 10000};     //zeit, die gepummt wird: intervall = 3000 --> 3 sec. pumpen (3000 millisec.)

/* variables for Time */
int timeStamp[3] = {timeClient.getEpochTime(), timeClient.getEpochTime(), timeClient.getEpochTime()};             //wenn gepumpt wird, wird diese Variable auf die momentane Zeit gesetzt
int deviderDays = 24 * 60 * 60 * 1000;                                   //Hilfsvariable zum dividieren
int currentTimeInSec = timeClient.getEpochTime();                         //Hilfsvariable, das ist die momentane Zeit in Sekunden
String tempStr = "";
const size_t PUMP_COUNT = 3;
const unsigned long SECONDS_PER_DAY = 24UL * 60UL * 60UL;
volatile int pumpQueuePumpNum = 0;             // 0 == none, 1..3 pump number
volatile unsigned long pumpQueueDuration = 0;  // milliseconds
SemaphoreHandle_t pumpQueueMutex = nullptr;
const bool PUMP_ACTIVE_LOW = false; 
/** Methods */

/** betätigt die Pumpe (X) für (X) Millisekunden */
void usePump(int seconds, int pumpNum) {
    Serial.println("Using pump " + String(pumpNum) + " for " + String(seconds) + " milliseconds.");
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
int manipulateSecPump(int pumpNum, boolean increase, int intervallInMillSecs[]) {
    pumpNum --;
    if (increase) {
        if (intervallInMillSecs[pumpNum] < 3600000) {
            intervallInMillSecs[pumpNum] += 100;
            preferences.putInt("duration1", intervallInMillSecs[pumpNum]);
            Serial.println("flow duration: " + intervallInMillSecs[pumpNum]);

        } else {
            Serial.println("Maximum von 1200 sekunden erreicht (20min)");
        }
    } else {
        if (intervallInMillSecs[pumpNum] > 100) {
            intervallInMillSecs[pumpNum] -= 100;
            preferences.putInt("duration1", intervallInMillSecs[pumpNum]);
            Serial.println("flow duration: " + intervallInMillSecs[pumpNum]);
            
        } else {
            Serial.println("Minimum von 0.1 sekunden erreicht (100 millsec.)");
        }
    }
    return intervallInMillSecs[pumpNum];
}

int manipulateDayPump(int pumpNum, boolean increase, int daysGoal[]) {
    pumpNum--;
    Serial.println(increase);
    if (increase) {
        if (daysGoal[pumpNum] < 365) {
            daysGoal[pumpNum]++;
            preferences.putInt("dayGoal3", daysGoal[pumpNum]);
        } else {
            Serial.println("Maximum von 1 Jahr (365 Tage) erreicht");
        }
    } else {
        if (daysGoal[pumpNum] > 1) {
            daysGoal[pumpNum]--;
            preferences.putInt("dayGoal1", daysGoal[pumpNum]);
        } else {
            Serial.println("Minimum von 1 Tag erreicht");
        }
    }
    return daysGoal[pumpNum];
}

void pumpTask(void *pvParameters) {
    (void)pvParameters;
    for (;;) {
        // quick check if there's a queued job
        if (xSemaphoreTake(pumpQueueMutex, pdMS_TO_TICKS(100))) {
            if (pumpQueuePumpNum != 0) {
                int pn = pumpQueuePumpNum;
                unsigned long dur = pumpQueueDuration;
                // clear queue before running so further requests can be queued
                pumpQueuePumpNum = 0;
                pumpQueueDuration = 0;
                xSemaphoreGive(pumpQueueMutex);

                // run pump (this is a FreeRTOS task; using vTaskDelay is safe)
                usePumpSync(dur, pn);

                // update timestamp and prefs after run
                unsigned long now = timeClient.getEpochTime();
                if (pn >= 1 && pn <= 3) {
                    timeStamp[pn - 1] = (int)now;
                    preferences.putUInt((String("Stamp") + (pn)).c_str(), timeStamp[pn - 1]);
                    Serial.println("pumpTask: finished pump " + String(pn));
                }
            } else {
                xSemaphoreGive(pumpQueueMutex);
                vTaskDelay(pdMS_TO_TICKS(200));
            }
        } else {
            // couldn't take mutex, wait a bit
            vTaskDelay(pdMS_TO_TICKS(100));
        }
    }
}

static void usePumpSync(int ms, int pumpNum) {
    int pin = (pumpNum == 1) ? PUMP1 : (pumpNum == 2) ? PUMP2 : PUMP3;
    Serial.println("usePumpSync: pump " + String(pumpNum) + " for " + String(ms) + "ms");
    // Set active level depending on relay wiring
    if (PUMP_ACTIVE_LOW) digitalWrite(pin, LOW); else digitalWrite(pin, HIGH);
    vTaskDelay(pdMS_TO_TICKS(ms));
    if (PUMP_ACTIVE_LOW) digitalWrite(pin, HIGH); else digitalWrite(pin, LOW);
}


/** Setup (macht der 1 mal beim Einschalten) */
void setup() {
    Serial.begin(115200);
    delay(1000);
    preferences.begin("PlantwateringSystem", false);

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

    Serial.println("SPIFFS content:");
    File root = SPIFFS.open("/");
    File file = root.openNextFile();
    while (file) {
        Serial.print(" - ");
        Serial.println(file.name());
        file = root.openNextFile();
    }


    // log unmatched requests (hilfreich beim Debug)
    webServer.onNotFound([](AsyncWebServerRequest *request){
        Serial.print("404 NotFound: ");
        Serial.println(request->url());
        request->send(404, "text/plain", "Not found");
    });

    pumpQueueMutex = xSemaphoreCreateMutex();
    if (pumpQueueMutex == nullptr) {
        Serial.println("ERROR: could not create pumpQueue mutex");
    } else {
        xTaskCreatePinnedToCore(pumpTask, "pumpTask", 4096, NULL, 1, NULL, 1);
        Serial.println("pumpTask started");
    }

    // nachdem SPIFFS.begin() erfolgreich war und bevor webServer.begin()
    webServer.serveStatic("/pumpManually.html", SPIFFS, "/doSomething.html").setDefaultFile("doSomething.html");
    // oder als Handler:
    webServer.on("/pumpManually.html", HTTP_GET, [](AsyncWebServerRequest *request){
        request->send(SPIFFS, "/doSomething.html", "text/html");
    });

    /** Buttons on the Website */
    
    webServer.on("/usePump1", HTTP_GET, [](AsyncWebServerRequest *request) {
        if (xSemaphoreTake(pumpQueueMutex, pdMS_TO_TICKS(50))) {
            pumpQueuePumpNum = 1;
            pumpQueueDuration = intervalInMillSec[0];
            xSemaphoreGive(pumpQueueMutex);
            Serial.println("Queued usePump1");
            request->send(200, "text/plain", "QUEUED");
        } else {
            request->send(503, "text/plain", "BUSY");
        }
    });

    webServer.on("/usePump2", HTTP_GET, [](AsyncWebServerRequest *request) {
        if (xSemaphoreTake(pumpQueueMutex, pdMS_TO_TICKS(50))) {
            pumpQueuePumpNum = 2;
            pumpQueueDuration = intervalInMillSec[1];
            xSemaphoreGive(pumpQueueMutex);
            Serial.println("Queued usePump2");
            request->send(200, "text/plain", "QUEUED");
        } else {
            request->send(503, "text/plain", "BUSY");
        }
    });

    webServer.on("/usePump3", HTTP_GET, [](AsyncWebServerRequest *request) {
        if (xSemaphoreTake(pumpQueueMutex, pdMS_TO_TICKS(50))) {
            pumpQueuePumpNum = 3;
            pumpQueueDuration = intervalInMillSec[2];
            xSemaphoreGive(pumpQueueMutex);
            Serial.println("Queued usePump3");
            request->send(200, "text/plain", "QUEUED");
        } else {
            request->send(503, "text/plain", "BUSY");
        }
    });

    // Für IgnoreCTR-Versionen queueen wir ebenfalls, nur Timestamp wird nicht gesetzt (task setzt Stamp aktuell)
    webServer.on("/usePump1IgnoreCTR", HTTP_GET, [](AsyncWebServerRequest *request) {
        if (xSemaphoreTake(pumpQueueMutex, pdMS_TO_TICKS(50))) {
            pumpQueuePumpNum = 1;
            pumpQueueDuration = intervalInMillSec[0];
            xSemaphoreGive(pumpQueueMutex);
            Serial.println("Queued usePump1IgnoreCTR");
            request->send(200, "text/plain", "QUEUED");
        } else {
            request->send(503, "text/plain", "BUSY");
        }
    });

    webServer.on("/usePump2IgnoreCTR", HTTP_GET, [](AsyncWebServerRequest *request) {
        if (xSemaphoreTake(pumpQueueMutex, pdMS_TO_TICKS(50))) {
            pumpQueuePumpNum = 2;
            pumpQueueDuration = intervalInMillSec[1];
            xSemaphoreGive(pumpQueueMutex);
            Serial.println("Queued usePump2IgnoreCTR");
            request->send(200, "text/plain", "QUEUED");
        } else {
            request->send(503, "text/plain", "BUSY");
        }
    });

    webServer.on("/usePump3IgnoreCTR", HTTP_GET, [](AsyncWebServerRequest *request) {
        if (xSemaphoreTake(pumpQueueMutex, pdMS_TO_TICKS(50))) {
            pumpQueuePumpNum = 3;
            pumpQueueDuration = intervalInMillSec[2];
            xSemaphoreGive(pumpQueueMutex);
            Serial.println("Queued usePump3IgnoreCTR");
            request->send(200, "text/plain", "QUEUED");
        } else {
            request->send(503, "text/plain", "BUSY");
        }
    });

    /* Prozess starten/stoppen */
    webServer.on("/startProcess", HTTP_GET, [](AsyncWebServerRequest *request) {
        request->send(200, "text/plain", "true");
        running = true;
        Serial.println("process started");
    });

    webServer.on("/stopProcess", HTTP_GET, [](AsyncWebServerRequest *request) {
        request->send(200, "text/plain", "false");
        running = false;
        Serial.println("progress stopped");
    });

    /* Increase/decrease duration */

    webServer.on("/increaseSecPump1", HTTP_GET, [](AsyncWebServerRequest *request) {
        request->send(200, "text/plain", "" + (intervalInMillSec[0] = manipulateSecPump(1, true, intervalInMillSec)));
        Serial.println("duration increased 1");
    });

    webServer.on("/increaseSecPump2", HTTP_GET, [](AsyncWebServerRequest *request) {
        request->send(200, "text/plain", "" + (intervalInMillSec[1] = manipulateSecPump(2, true, intervalInMillSec)));
        Serial.println("duration increased 2");
    });

    webServer.on("/increaseSecPump3", HTTP_GET, [](AsyncWebServerRequest *request) {
        request->send(200, "text/plain", "" + (intervalInMillSec[2] = manipulateSecPump(3, true, intervalInMillSec)));
        Serial.println("duration increased 3");
    });

    webServer.on("/decreaseSecPump3", HTTP_GET, [](AsyncWebServerRequest *request) {
        request->send(200, "text/plain", "" + (intervalInMillSec[2] = manipulateSecPump(3, false, intervalInMillSec)));
        Serial.println("duration decreased 3");
    });

    webServer.on("/decreaseSecPump2", HTTP_GET, [](AsyncWebServerRequest *request) {
        request->send(200, "text/plain", "" + (intervalInMillSec[1] = manipulateSecPump(2, false, intervalInMillSec)));
        Serial.println("duration decreased 2");
    });

    webServer.on("/decreaseSecPump1", HTTP_GET, [](AsyncWebServerRequest *request) {
        Serial.println("duration decreased 1");
        request->send(200, "text/plain", "" + (intervalInMillSec[0] = manipulateSecPump(1, false, intervalInMillSec))); 
    });

    /* Increase/decrease dayGoal */

    webServer.on("/decreaseDaysPump1", HTTP_GET, [](AsyncWebServerRequest *request) {
        request->send(200, "text/plain", "" + (dayGoal[0] = manipulateDayPump(1, false, dayGoal)));
        Serial.println("days decreased 1");
    });

    webServer.on("/decreaseDaysPump2", HTTP_GET, [](AsyncWebServerRequest *request) {
        Serial.println("days decreased 2");
        request->send(200, "text/plain", "" + (dayGoal[1] = manipulateDayPump(2, false, dayGoal)));
    });

    webServer.on("/decreaseDaysPump3", HTTP_GET, [](AsyncWebServerRequest *request) {
        Serial.println("days decreased 3");
        request->send(200, "text/plain", "" + (dayGoal[2] = manipulateDayPump(3, false, dayGoal)));
    });

    webServer.on("/increaseDaysPump3", HTTP_GET, [](AsyncWebServerRequest *request) {
        Serial.println("days increased 3");
        request->send(200, "text/plain", "" + (dayGoal[2] = manipulateDayPump(3, true, dayGoal)));
    });

    webServer.on("/increaseDaysPump2", HTTP_GET, [](AsyncWebServerRequest *request) {
        Serial.println("days increased 2");
        request->send(200, "text/plain", "" + (dayGoal[1] = manipulateDayPump(2, true, dayGoal)));
    });

    webServer.on("/increaseDaysPump1", HTTP_GET, [](AsyncWebServerRequest *request) {
        Serial.println("days increased 1");
        request->send(200, "text/plain", "" + (dayGoal[0] = manipulateDayPump(1, true, dayGoal)));
    });
}

void loop() {
    usePump(3000, 1); //test pumpe 1
    usePump(3000, 2); //test pumpe 2
    usePump(3000, 3); //test pumpe 3
    // keep NTP updateddsafsddssadfasdfsda
    timeClient.update();
    currentTimeInSec = timeClient.getEpochTime();

    // initialize any zero timestamps to now
    for (size_t i = 0; i < PUMP_COUNT; ++i) {
        if (timeStamp[i] == 0) {
            timeStamp[i] = currentTimeInSec;
            preferences.putUInt((String("Stamp") + (i + 1)).c_str(), timeStamp[i]);
        }
    }

    if (running) {
        for (size_t i = 0; i < PUMP_COUNT; ++i) {
            unsigned long daysSince = 0;
            if (currentTimeInSec >= timeStamp[i]) {
                daysSince = (currentTimeInSec - timeStamp[i]) / SECONDS_PER_DAY;
            }
            if (daysSince >= (unsigned long)dayGoal[i]) {
                usePump(intervalInMillSec[i], i + 1);
                timeStamp[i] = currentTimeInSec;
                preferences.putUInt((String("Stamp") + (i + 1)).c_str(), timeStamp[i]);
            }
        }
    }

    delay(200); // avoid tight loop
}