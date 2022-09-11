#include <WebSocketsClient.h>
#include <SocketIoClient.h>
#include <ArduinoJson.h>
#include <Arduino.h>
#include <ESP8266WiFi.h>
#include <SPI.h>
#include <MFRC522.h>

#define USER_SERIAL Serial
#define SS_PIN D8
#define RST_PIN D0


const char* ssid = "ZTE_2.4G_zncMNd";
const char* pass = "iLyCfbAc";
const char* ip = "192.168.1.4";

MFRC522 rfid(SS_PIN, RST_PIN);
MFRC522::MIFARE_Key key;
SocketIOclient webSocket;

byte nuidPICC[4];
String tag;


void setup() {


  USER_SERIAL.begin(9600);

  searchWiFi();
  connectWiFi();
  
  webSocket.begin(ip, 4000);

  // webSocket.onEvent(socketIOEvent);

  SPI.begin(); 
	rfid.PCD_Init();
  USER_SERIAL.println();
	USER_SERIAL.print(F("Reader :"));
	rfid.PCD_DumpVersionToSerial();
	for (byte i = 0; i < 6; i++) {
			key.keyByte[i] = 0xFF;
	}
	USER_SERIAL.println();
	USER_SERIAL.println(F("This code scan the MIFARE Classic NUID."));
	USER_SERIAL.print(F("Using the following key:"));
	printHex(key.keyByte, MFRC522::MF_KEY_SIZE);
  USER_SERIAL.println();
}

void loop() {
  webSocket.loop();

  if ( ! rfid.PICC_IsNewCardPresent())
			return;
	// Verify if the NUID has been readed
	if ( ! rfid.PICC_ReadCardSerial())
			return;
  
  USER_SERIAL.print(F("PICC type: "));
	MFRC522::PICC_Type piccType = rfid.PICC_GetType(rfid.uid.sak);
	USER_SERIAL.println(rfid.PICC_GetTypeName(piccType));
	// Check is the PICC of Classic MIFARE type
	if (piccType != MFRC522::PICC_TYPE_MIFARE_MINI &&
					piccType != MFRC522::PICC_TYPE_MIFARE_1K &&
					piccType != MFRC522::PICC_TYPE_MIFARE_4K) {
			USER_SERIAL.println(F("Your tag is not of type MIFARE Classic."));
			return;
	}
	if (rfid.uid.uidByte[0] != nuidPICC[0] ||
					rfid.uid.uidByte[1] != nuidPICC[1] ||
					rfid.uid.uidByte[2] != nuidPICC[2] ||
					rfid.uid.uidByte[3] != nuidPICC[3] ) {
			
			for (byte i = 0; i < 4; i++) {
					nuidPICC[i] = rfid.uid.uidByte[i];
			}

      for (byte i = 0; i < 4; i++) {
        tag += rfid.uid.uidByte[i];
      }
      USER_SERIAL.print("Tag: ");
      USER_SERIAL.print(tag);
      USER_SERIAL.println();

      String output = "[\"time:in\",{\"uid\":\"" + tag + "\"}]";
      webSocket.sendEVENT(output);
      USER_SERIAL.println();
	}
	else USER_SERIAL.println(F("Card read previously."));

  tag = "";
	rfid.PICC_HaltA();
	rfid.PCD_StopCrypto1();
}

// //////////////////////////////////////////////////////

void printHex(byte *buffer, byte bufferSize) {
	for (byte i = 0; i < bufferSize; i++) {
			Serial.print(buffer[i] < 0x10 ? " 0" : " ");
			Serial.print(buffer[i], HEX);
	}
}

void socketIOEvent(socketIOmessageType_t type, uint8_t* payload, size_t length) {
  switch (type) {
    case sIOtype_DISCONNECT:
      USER_SERIAL.println("Disconnected!");
      break;

    case sIOtype_CONNECT:
      USER_SERIAL.printf("Connected to url: %s%s\n", ip, payload);

      // join default namespace (no auto join in Socket.IO V3)
      webSocket.send(sIOtype_CONNECT, "/");
      break;
  }
}

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