#ifdef ARDUINO_ARCH_ESP32
#include <WiFi.h>
#include <WiFiMulti.h>
WiFiMulti wifiMulti;
#else
#include <ESP8266WiFi.h>
#include <ESP8266WiFiMulti.h>
ESP8266WiFiMulti wifiMulti;
#endif

#include <MQTT.h>

WiFiClient net;
MQTTClient client;

long TiempoPasado = 0;
#define ledIndicador 2
#define led 5
#define boton 4
boolean estadoBoton = false;
boolean estadoLed = false;

void setup() {
  Serial.begin(115200);
  delay(10);
  Serial.println("Iniciando Sistema");
  pinMode(ledIndicador, OUTPUT);
  pinMode(led, OUTPUT);
  pinMode(boton, PULLDOWN);
  wifiMulti.addAP("CoWorking", "CoWorking$");
  wifiMulti.addAP("SSID_FROM_AP_1", "YOUR_PASSWORD_FOR_AP_1");
  wifiMulti.addAP("SSID_FROM_AP_1", "YOUR_PASSWORD_FOR_AP_1");
  client.begin("broker.shiftr.io", net);
  client.onMessage(RecibirMensaje);
  Conectando();

}

void loop() {
  client.loop();
  delay(10);
  if (!client.connected()) {
    Conectando();
  }

  ActualizarLed();
  ActualizarBoton();
  MandarData();
  
}

void MandarData() {
  if (millis() > TiempoPasado + 500) {
    String Mensaje = String(estadoBoton);
    client.publish("/data/Boton", Mensaje);
    TiempoPasado = millis();
  }

}

void ActualizarLed() {
  if (estadoLed) {
    digitalWrite(led, 1);
    Serial.println("Encendido");
  }
  else {
    digitalWrite(led, 0);
    Serial.println("Apagado");
  }
}

void ActualizarBoton() {
  if (digitalRead(boton) == 1) {
    estadoBoton = !estadoBoton;
    delay(500);
  }
}

void Conectando() {

  while (wifiMulti.run() != WL_CONNECTED) {
    digitalWrite(ledIndicador, 0);
    delay(2000);
    digitalWrite(ledIndicador, 1);
    delay(2000);
    Serial.println(".");
  }
  while (!client.connect("ControladorIOT", "dataKevfh05", "12345678")) {
    digitalWrite(ledIndicador, 0);
    delay(500);
    digitalWrite(ledIndicador, 1);
    delay(500);
    Serial.println("*");
  }
  Serial.println("Conectado MQTT");
  client.subscribe("/data/Led");

}

void RecibirMensaje(String &topic, String &payload) {
  Serial.println("incoming: " + topic + " - " + payload);

  if (payload == "1") {
    estadoLed = true;
  }
  else {
    estadoLed = false;
  }

  // Note: Do not use the client in the callback to publish, subscribe or
  // unsubscribe as it may cause deadlocks when other things arrive while
  // sending and receiving acknowledgments. Instead, change a global variable,
  // or push to a queue and handle it in the loop after calling `client.loop()`.
}

void EstadoWiFi() {


}
