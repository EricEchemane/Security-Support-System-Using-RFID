#include <SocketIoClient.h>
#include <ArduinoJson.h>
#include <Arduino.h>
#include <ESP8266WiFi.h>

#define USER_SERIAL Serial


const char* ssid = "ZTE_2.4G_zncMNd";
const char* pass = "iLyCfbAc";


SocketIoClient webSocket;


void setup() {


  USER_SERIAL.begin(115200);

  searchWiFi();
  connectWiFi();
  
  webSocket.begin("192.168.1.4", 3000);
}

void loop() {
  webSocket.loop();
  webSocket.emit("message", "\"this is a plain string\"");
  delay(500);
}

// void controlled(const char* message, size_t length){
// //  USER_SERIAL.println(message);


//   DynamicJsonDocument doc(1024);
//   deserializeJson(doc, message);
  
// }

void searchWiFi(){
  int numberOfNetwork = WiFi.scanNetworks();
  USER_SERIAL.println("----");
  
  for(int i = 0; i < numberOfNetwork; i++ ){
    USER_SERIAL.print("Network name: ");
    USER_SERIAL.println(WiFi.SSID(i));
    USER_SERIAL.print("Signal strength: ");
    USER_SERIAL.println(WiFi.RSSI(i));
    USER_SERIAL.println("--------------");
  }
}


void connectWiFi(){
  WiFi.begin(ssid, pass);
  while(WiFi.status() != WL_CONNECTED){
    USER_SERIAL.print(".");
    delay(1000);
  }

  USER_SERIAL.print("");
  USER_SERIAL.println("WiFi connected");
  USER_SERIAL.print("IP Address : ");
  USER_SERIAL.println(WiFi.localIP());
  
}