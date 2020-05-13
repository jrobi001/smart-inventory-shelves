#include <SPI.h>
#include <WiFiNINA.h>
#include <MySQL_Connection.h>
#include <MySQL_Cursor.h>
#include <MySQL_Encrypt_Sha1.h>
#include <MySQL_Packet.h>
#include "HX711.h"

// Name: smart_shelf arduino sketch
// Author: Software Projects Group 24
// Version: 1.2
// Date last updated: 12/05/20
// Notes: Designed to work with Arduino Uno Wifi Rev2, SparkFun HX711 ADC, 5kg Bar Load Cell, MySQL Server 8 (legacy authentication).

// WIFI:

// Create WiFiClient object
WiFiClient client;

// Wifi Connection credentials and radio status
char ssid[] = "XXXXXXXXXXXXX";
char pass[] = "XXXXXXXX";
int status = WL_IDLE_STATUS;

//MySQL:

// Create MySQL_Connection object
MySQL_Connection conn ((Client *)&client);

// IP Address of MySQL Server
IPAddress server_addr(192,168,X,XX);

// MySQL user details
char user[] = "testX";
char password[] = "cake123";

// MySQL Query
char INSERT_DATA[] = "INSERT INTO shelfdatav3.id5weights (weight) VALUES (%s)";
char query[128];
char weight[10];

// HX711 24-bit Analog-to-Digital Converter (ADC)
// Create HX711 scale object
HX711 scale;

// setup
void setup() {
  // start connection to serial port
  Serial.begin(9600);
  // Wait for serial port to be ready
  //while (!Serial);
 
  // HX711 scale set up
  Serial.println("Setting up scale...");
  scale.begin(A1, A0); // Connections from ADC to arduino pins: Data output: DAT = pinA1, Clock input: CLK = pinA0

  // take and output the raw average of 20 readings to serial port
  Serial.print("Raw average of 20 readings: \t\t");
  Serial.println(scale.read_average(20));

  // Set the scale factor:
  // 458 is the scale factor value I obtained for a 5kg Load cell after calibrating with known weights
  scale.set_scale(458.f);
  // Reset scale to zero
  scale.tare();

  Serial.println("\nScale set up complete!!!:");

  // output single raw scale reading to serial port
  Serial.print("Raw: \t\t\t");
  Serial.println(scale.read());
  // output raw average of 20 scale readings to serial port
  Serial.print("Raw ave(20): \t\t");
  Serial.println(scale.read_average(20));
  // output raw average of 5 scale readings minus tare weight
  Serial.print("Raw ave(5) - tare: \t");
  Serial.println(scale.get_value(5));
  // output calibrated average of 5 scale readings minus tare weight and divided by scale factor(458)
  Serial.print("Calibrated ave(5): \t");
  Serial.println(scale.get_units(5), 1);

  // Commence wifi connection attempt
  while (status != WL_CONNECTED){
    Serial.print("Attempting to connect to WPA SSID:");
    Serial.println(ssid);
    status = WiFi.begin(ssid,pass);
    // delay of 10 seconds
    delay(10000);
  }

  Serial.println("Connected to network!!!");
  IPAddress ip = WiFi.localIP();
  long rssi = WiFi.RSSI();
  Serial.print("My IP address is: ");
  Serial.println(ip);
  Serial.print("Received signal strength(RSSI): ");
  Serial.println(rssi);
  

  // Connect to MySQL Server
  Serial.println("Attempting connection to MySQL Server...");
  if (conn.connect(server_addr, 3306, user, password)) {
    Serial.println("Connection to MySQL Server established!!!");
    delay(1000);
  }
  else {
    Serial.println("Connection to MySQL Server failed!!!");
    conn.close();
  }

}

void loop() {
  delay(5000);
  // re-check if MySQL Server is connected
  if(conn.connected()){
    // calculate average of 20 scale readings:
    // declare and initialize variables:
    int t, i, n, T;
    double val, sum, sumsq, mean, reading;
    float stddev;
    n = 20;
    t = millis();
    i = sum = sumsq = 0;
    reading = 0;
    // sum the readings
    while (i<n) {
      val = ((scale.read() - scale.get_offset()) / scale.get_scale());
      sum += val;
      sumsq += val * val;
      i++;
      }
    // calculate time taken
    t = millis() - t;
    // calculate and output the mean and standard deviation of n readings
    mean = sum / n;
    stddev = sqrt(sumsq / n - mean * mean);
    Serial.print("Mean, Std Dev of "); Serial.print(i); Serial.print(" readings:\t");
    Serial.print(sum / n, 3); Serial.print("\t"); Serial.print(stddev, 3);
    // Note: 2 sigma is 95% confidence, 3 sigma is 99.7%
    Serial.print("\nTime taken:\t"); Serial.print(float(t)/1000, 3); Serial.println("Secs\n");
  
    // Insert data into database
    Serial.println("Sending data to database...");
    MySQL_Cursor *cur_mem = new MySQL_Cursor(&conn);
    reading = sum/n;
    dtostrf(reading,7,2,weight);
    sprintf(query,INSERT_DATA,weight);
    cur_mem->execute(query);
    delete cur_mem;
    Serial.println("Data recorded!");
    } 
    else {
      conn.close();
      Serial.println("Reattempting connection to MySQL Server...");
      if(conn.connect(server_addr, 3306, user, password)){
        delay(500);
        Serial.println("Reconnected to MySQL Server!!!");
        } 
        else {
          Serial.println("Cannot reconnect to MySQL Server!!!");
          }
          }
}
