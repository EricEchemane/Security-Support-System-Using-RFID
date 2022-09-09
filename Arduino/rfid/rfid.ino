#include <ESP8266WiFi.h>
#include <ArduinoJson.h>       // https://arduinojson.org/
#include <WebSocketsClient.h>  // download and install from https://github.com/Links2004/arduinoWebSockets
#include <SocketIOclient.h>

#define SSID "ZTE_2.4G_zncMNd"
#define PASSWORD "iLyCfbAc"
#define SERVER "192.168.1.4"


SocketIOclient socketIO;


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


void setup() {
  pinMode(LED_BUILTIN, OUTPUT);

  Serial.begin(9600);

  setupWiFi();

  // server address, port and URL
  socketIO.begin(SERVER, 4000, "/socket.io/?EIO=4");

  socketIO.onEvent(socketIOEvent);
}

void loop() {
  socketIO.loop();

  // // creat JSON message for Socket.IO (event)
  DynamicJsonDocument doc(1024);
  JsonArray array = doc.to<JsonArray>();

  // // add evnet name
  // // Hint: socket.on('event_name', ....
  array.add("time:in");

  // // add payload (parameters) for the event
  JsonObject param1 = array.createNestedObject();
  param1["uid"] = "19126222";

  // // JSON to String (serializion)
  String output;
  serializeJson(doc, output);

  // // Send event
  socketIO.sendEVENT(output);

  // // Print JSON for debugging
  // Serial.println(output);

  

  // delay(1000);
}




