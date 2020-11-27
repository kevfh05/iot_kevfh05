#ifdef ARDUINO_ARCH_ESP32
#include <WiFi.h>
#include <WiFiMulti.h>
WiFiMulti wifiMulti;
#else
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
ESP8266WiFiMulti wifiMulti;
#endif

#define ledIndicador 2

void setup() {
  Serial.begin(115200);
  delay(10);
  Serial.println("Iniciando Sistema");
  pinMode(ledIndicador, OUTPUT);

  wifiMulti.addAP("CoWorking", "CoWorking$");
 // wifiMulti.addAP("SSID_FROM_AP_1", "YOUR_PASSWORD_FOR_AP_1");
  //wifiMulti.addAP("SSID_FROM_AP_1", "YOUR_PASSWORD_FOR_AP_1");
  Conectando();

}

void loop() {
  Conectando();

}

void Conectando() {

  if (wifiMulti.run() != WL_CONNECTED) {
    digitalWrite(ledIndicador, 1);
    delay(2000);
    digitalWrite(ledIndicador, 1);
    delay(2000);
  } else {
    Serial.println("");
    Serial.println("WiFi connected");
    Serial.println("IP address: ");
    Serial.println(WiFi.localIP());
  }

}

void EstadoWiFi() {


}
