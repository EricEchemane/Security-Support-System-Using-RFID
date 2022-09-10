#include <ESP8266WiFi.h>
#include <ArduinoJson.h>
#include <WebSocketsClient.h>  // download and install from https://github.com/Links2004/arduinoWebSockets
#include <SocketIOclient.h>
#include <SPI.h>
#include <MFRC522.h>

#define SS_PIN D8
#define RST_PIN D0
// #define SSID "ZTE_2.4G_zncMNd"
// #define PASSWORD "iLyCfbAc"
// #define SERVER "192.168.1.4"
#define SSID "AN5506-04-FA_91b28"
#define PASSWORD "32d6e4d7"
#define SERVER "192.168.254.100"

MFRC522 rfid(SS_PIN, RST_PIN);
MFRC522::MIFARE_Key key;
SocketIOclient socketIO;

byte nuidPICC[4];


void messageHandler(uint8_t* payload) {
  StaticJsonDocument<64> doc;

  DeserializationError error = deserializeJson(doc, payload);

  if (error) {
    Serial.println(error.f_str());
    return;
  }

  String messageKey = doc[0];
  bool value = doc[1];

  if (messageKey == "time:in") {
    Serial.println("Someone is emitting time:in event!");
  }
}

void socketIOEvent(socketIOmessageType_t type, uint8_t* payload, size_t length) {
  switch (type) {
    case sIOtype_DISCONNECT:
      Serial.println("Disconnected!");
      break;

    case sIOtype_CONNECT:
      Serial.printf("Connected to url: %s%s\n", SERVER, payload);

      // join default namespace (no auto join in Socket.IO V3)
      socketIO.send(sIOtype_CONNECT, "/");
      break;

    case sIOtype_EVENT:
      messageHandler(payload);
      break;
  }
}

void setupWiFi() {
  Serial.println("\nConnecting...");

  WiFi.mode(WIFI_AP);
  
  WiFi.begin(SSID, PASSWORD);
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(500);
  }

  Serial.println("\nConnected : ");
  Serial.println(WiFi.localIP());
}

void printHex(byte *buffer, byte bufferSize) {
	for (byte i = 0; i < bufferSize; i++) {
			Serial.print(buffer[i] < 0x10 ? " 0" : " ");
			Serial.print(buffer[i], HEX);
	}
}

String tag;

void setup() {
  pinMode(LED_BUILTIN, OUTPUT);

  Serial.begin(9600);

  setupWiFi();

  // server address, port and URL
  socketIO.begin(SERVER, 4000, "/socket.io/?EIO=4");

  socketIO.onEvent(socketIOEvent);

  SPI.begin(); 
	rfid.PCD_Init();
	Serial.println();
	Serial.print(F("Reader :"));
	rfid.PCD_DumpVersionToSerial();
	for (byte i = 0; i < 6; i++) {
			key.keyByte[i] = 0xFF;
	}
	Serial.println();
	Serial.println(F("This code scan the MIFARE Classic NUID."));
	Serial.print(F("Using the following key:"));
	printHex(key.keyByte, MFRC522::MF_KEY_SIZE);
  Serial.println();
}

void loop() {
  socketIO.loop();

  	// Reset the loop if no new card present on the sensor/reader. This saves the entire process when idle.
	if ( ! rfid.PICC_IsNewCardPresent())
			return;
	// Verify if the NUID has been readed
	if ( ! rfid.PICC_ReadCardSerial())
			return;

  Serial.print(F("PICC type: "));
	MFRC522::PICC_Type piccType = rfid.PICC_GetType(rfid.uid.sak);
	Serial.println(rfid.PICC_GetTypeName(piccType));
	// Check is the PICC of Classic MIFARE type
	if (piccType != MFRC522::PICC_TYPE_MIFARE_MINI &&
					piccType != MFRC522::PICC_TYPE_MIFARE_1K &&
					piccType != MFRC522::PICC_TYPE_MIFARE_4K) {
			Serial.println(F("Your tag is not of type MIFARE Classic."));
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
      Serial.print("Tag: ");
      Serial.print(tag);
      Serial.println();

      String output = "[\"time:in\",{\"uid\":\"" + tag + "\"}]";
      socketIO.sendEVENT(output);
      Serial.println();
	}
	else Serial.println(F("Card read previously."));

  tag = "";
	rfid.PICC_HaltA();
	rfid.PCD_StopCrypto1();
}



