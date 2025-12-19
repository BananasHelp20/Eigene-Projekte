#include <Arduino.h>
#include <time.h>

void setup() {
  // Initialisieren der seriellen Kommunikation
  Serial.begin(115200);

  // Warten, bis die serielle Kommunikation bereit ist
  while (!Serial);

  // Setzen der Zeit (nur erforderlich, wenn der ESP32 eine NTP-Anfrage benötigt)
  configTime(0, 0, "pool.ntp.org");  // Hole die Zeit von einem NTP-Server

  // Warte, bis die Zeit synchronisiert wurde
  Serial.println("Warte auf Zeit...");
  time_t now;
  struct tm timeinfo;
  
  // Warte, bis die Zeit vom NTP-Server abgerufen wurde
  while (!getLocalTime(&timeinfo)) {
    delay(1000);
    Serial.print(".");
  }

  // Erhalte die Unix-Zeit (Anzahl der Sekunden seit 1970-01-01)
  time(&now);

  // Ausgabe der Unix-Zeit
  Serial.print("Aktuelle Unix-Zeit: ");
  Serial.println(now);

  // Umwandlung in eine lesbare Zeit
  localtime_r(&now, &timeinfo);
  Serial.print("Aktuelles Datum und Uhrzeit: ");
  Serial.print(timeinfo.tm_hour);
  Serial.print(":");
  Serial.print(timeinfo.tm_min);
  Serial.print(":");
  Serial.println(timeinfo.tm_sec);
}

void loop() {
  // Hier kannst du weitere Berechnungen mit der Zeit anstellen
}

//SPEICHERN
#include <Preferences.h>

// Erstelle ein Preferences-Objekt
Preferences preferences;

void setup() {
  // Starte die serielle Kommunikation
  Serial.begin(115200);
  while (!Serial);

  // Öffne den "Namespace" für das Speichern (dies kann als Identifikator verwendet werden)
  preferences.begin("my-app", false);  // "my-app" ist der Namespace, false bedeutet nur Lesezugriff

  // Speichere eine Integer-Variable im Flash-Speicher
  int valueToStore = 1234;
  preferences.putInt("myInt", valueToStore);

  // Speichere eine String-Variable im Flash-Speicher
  String valueToStoreStr = "Hallo, Welt!";
  preferences.putString("myString", valueToStoreStr);

  // Lese die gespeicherten Werte
  int storedInt = preferences.getInt("myInt", 0);  // Default-Wert ist 0, falls der Key nicht existiert
  String storedString = preferences.getString("myString", "default");

  // Ausgabe der gespeicherten Werte
  Serial.print("Gespeicherter Integer-Wert: ");
  Serial.println(storedInt);
  Serial.print("Gespeicherter String: ");
  Serial.println(storedString);

  // Schließe den Zugriff auf den Flash-Speicher
  preferences.end();
}

void loop() {
  // Keine kontinuierliche Aktion notwendig
}
#include <Preferences.h>

Preferences preferences;

int myVar;  // Variable, die im Flash-Speicher gespeichert ist

void setup() {
  Serial.begin(115200);

  // Öffne den "Namespace" zum Speichern und Lesen der Daten
  preferences.begin("myNamespace", false);  // false für schreibgeschützten Modus

  // Speichern einer Beispiel-Variable im Flash-Speicher
  preferences.putInt("myVarKey", 42);

  // Beenden der Speicherung (optional, aber empfohlen)
  preferences.end();
}

void loop() {
  // Öffne den "Namespace" zum Lesen der gespeicherten Daten
  preferences.begin("myNamespace", true);  // true für Lesezugriff

  // Lesen der gespeicherten Variable
  myVar = preferences.getInt("myVarKey", -1);  // Defaultwert -1, falls keine Variable gefunden wird

  // Ausgabe auf der seriellen Konsole
  if (myVar != -1) {
    Serial.print("Gespeicherte Variable: ");
    Serial.println(myVar);
  } else {
    Serial.println("Variable nicht gefunden!");
  }

  preferences.end();  // Schließt den Zugriff auf den Flash-Speicher

  delay(1000);  // Eine Sekunde warten, bevor erneut ausgelesen wird
}
