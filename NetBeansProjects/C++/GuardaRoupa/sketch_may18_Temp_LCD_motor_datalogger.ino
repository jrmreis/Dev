 
//---------- Bloco de define e inclusão de bibliotecas ----------------//
#include <dht.h> //Biblioteca do DHT
#include <Wire.h> //Biblioteca do módulo I2C
#include <LiquidCrystal_I2C.h> //Biblioteca do LCD
#include <Time.h>
#include <SD.h>
#include <SPI.h>
#include <DS3231.h>


File myFile;
DS3231  rtc(SDA, SCL);
int pinCS = 53; // Pin 10 on Arduino Uno

byte termometro[8] = //icon for termometer
{
    B00100,
    B01010,
    B01010,
    B01110,
    B01110,
    B11111,
    B11111,
    B01110
};

byte gota[8] = //icon for water droplet
{
  B00100,
  B00100,
  B01010,
  B01010,
  B10001,
  B10001,
  B10001,
  B01110
};



byte orvalho[8] = //icone para ponto de orvalho
{
  B11100,
  B10100,
  B11100,
  B10000,
  B10000,
  B10111,
  B00101,
  B00111
};


LiquidCrystal_I2C lcd(0x27, 2, 1, 0, 4, 5, 6, 7, 3, POSITIVE); // configurações do LCD

#define dht1_dpin A1 //Pino DATA do Sensor ligado na porta Analogica A1
#define dht2_dpin A2 //Pino DATA do Sensor ligado na porta Analogica A2
#define dht3_dpin A3 //Pino DATA do Sensor ligado na porta Analogica A3
#define dht4_dpin A4 //Pino DATA do Sensor ligado na porta Analogica A4
#define dht5_dpin A5 //Pino DATA do Sensor ligado na porta Analogica A5

dht DHT1; //Inicializa o DHT
dht DHT2; //Inicializa o DHT
dht DHT3; //Inicializa o DHT
dht DHT4; //Inicializa o DHT
dht DHT5; //Inicializa o DHT

//Porta ligada ao pino IN1 do modulo
int porta_rele1 = 8;
//Porta ligada ao pino IN2 do modulo
int porta_rele2 = 9;
//Porta ligada ao pino IN3 do modulo
int porta_rele3 = 10;
//Porta ligada ao pino IN4 do modulo
int porta_rele4 = 11;

Time t;



// ------------- Inicialização de DHT e LCD ---------------------------//
void setup() {
  lcd.begin(16, 2); // inicializa o LCD
  lcd.setCursor(0, 0);
  lcd.print("Ola' Joel Reis");
  lcd.setCursor(0, 1);
  lcd.print("Inicializando...");
 
  delay(1500);
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("Objetivo:");
  lcd.setCursor(0, 1);
  lcd.print("Umidade < 45%");
  delay(2500);
  lcd.clear();
  
  lcd.setCursor(0, 0);
  lcd.print("Testando o sen-");
  lcd.setCursor(0, 1);
  lcd.print("sor de tempera-");
  delay(2500);
  lcd.clear();
  lcd.setCursor(0, 0);
  lcd.print("tura e umidade");
  lcd.setCursor(0,1);
  lcd.print("DHT11!");
  delay(2500);
  lcd.clear();

  lcd.createChar(1,termometro);
  lcd.createChar(2,gota);
  lcd.createChar(3,orvalho);

 //Define pinos para o rele como saida
  pinMode(porta_rele1, OUTPUT); 
  pinMode(porta_rele2, OUTPUT);
  pinMode(porta_rele3, OUTPUT); 
  pinMode(porta_rele4, OUTPUT);

  
  Serial.begin(9600);
    pinMode(pinCS, OUTPUT);
   

  
  // SD Card Initialization
  if (SD.begin())
  {
    Serial.println("SD card is ready to use.");
    lcd.setCursor(0, 0);
    lcd.clear();
    lcd.setCursor(0, 1);
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("SD ok!");
    lcd.setCursor(0, 1);
    lcd.print("Arquivo ok!");
    
    Serial.println("Data, Hora, Temp.CPU, Temp1, Umid1, Temp2, Umid2, Temp3, Umid3, Temp4, Umid4, Temp5, Umid5");
    myFile = SD.open("test.txt", FILE_WRITE);
 
  } else
  {
    Serial.println("SD card initialization failed");
    lcd.setCursor(0, 0);
    lcd.clear();
    lcd.setCursor(0, 1);
    lcd.clear();
    lcd.setCursor(0, 0);
    lcd.print("Erro ao ler Card");
    lcd.setCursor(0, 1);
    lcd.print("Verif SD ou Arq!");
    delay (3000);
    
    digitalWrite(porta_rele1, HIGH);  //Desliga rele 1 
    digitalWrite(porta_rele2, HIGH);  //Desliga rele 2 
    digitalWrite(porta_rele3, HIGH);  //Desliga rele 3 
    
    return;
    
  }
  myFile = SD.open("test.txt", FILE_WRITE);
  if (myFile) {
    myFile.println("Data, Hora, Temp.CPU, Temp1, Umid1, Temp2, Umid2, Temp3, Umid3, Temp4, Umid4, Temp5, Umid5");    
    
    myFile.close(); // close the file
  }
  // if the file didn't open, print an error:
  else {
    Serial.println("error opening test.txt");
    
  }
  delay(3000);


   rtc.begin();
  
    //Depois de ajustado os dados do RTC as duas linhas abaixos devem ser comentadas
//rtc.setDOW(FRIDAY);     // Set Day-of-Week to SUNDAY
//rtc.setTime(22, 00, 00);     // Set the time to 21:51:00 (24hr format)
//rtc.setDate( 5, 6, 2018);   // Set the date to Jun 05th, 2018
   
}

// ------------------- Lê e mostra informações -------------------- //
void loop() {

  t = rtc.getTime(); 

  DHT1.read11(dht1_dpin); //Lê as informações do sensor
  DHT2.read11(dht2_dpin); //Lê as informações do sensor
  DHT3.read11(dht3_dpin); //Lê as informações do sensor
  DHT4.read11(dht4_dpin); //Lê as informações do sensor
  DHT5.read11(dht5_dpin); //Lê as informações do sensor
  delay(1000); //Espera um segundo para as informações aparecerem.
  //Ler a temperatura ou humidade leva cerca de 250 milisegundos!
  
  //float h = dht.readHumidity();
  //Lê a temperatura em Celsius (padrão)
  //float t = dht.readTemperature();
  // Checando se qualquer leitura falhou.
  if (isnan(DHT1.humidity) || isnan(DHT1.temperature)) {
    lcd.setCursor(0, 1);
    lcd.print("Falha ao ler");
 // if (isnan(DHT2.humidity) || isnan(DHT2.temperature)) {
 //   lcd.setCursor(0, 1);
 //   lcd.print("Falha ao ler");
    return;
  }
  lcd.setCursor(0, 0);
  lcd.clear();
  lcd.setCursor(0, 1);
  lcd.clear();

    //mostrar umidade média dos pontos:

  lcd.setCursor(0, 0);
  lcd.write(2);
  lcd.setCursor(1, 0);
  lcd.print("M=");
  lcd.setCursor(3, 0);
  lcd.print(int((DHT1.humidity+DHT2.humidity+DHT3.humidity+DHT4.humidity+DHT5.humidity)/5));
  lcd.setCursor(5, 0);
  lcd.print("%");
  delay(2500);

    //mostrar temperatura média dos pontos:

  lcd.setCursor(0, 1);
  lcd.write(1);
  lcd.setCursor(1, 1);
  lcd.print("M=");
  lcd.setCursor(3, 1);
  lcd.print(int((DHT1.temperature+DHT2.temperature+DHT3.temperature+DHT4.temperature+DHT5.temperature)/5));
  lcd.setCursor(5, 1);
  lcd.print((char)223);
  lcd.setCursor(6, 1);
  lcd.print("C");
  delay(2500);

    //mostrar ponto de orválho médio dos pontos:

  lcd.setCursor(8, 0);
  lcd.write(3);
  lcd.setCursor(9, 0);
  lcd.print("M=");
  if ((int(((DHT1.temperature+DHT2.temperature+DHT3.temperature+DHT4.temperature+DHT5.temperature)/5)-((100-((DHT1.humidity+DHT2.humidity+DHT3.humidity+DHT4.humidity+DHT5.humidity)/5))/5)))<10)
  lcd.setCursor(12, 0);
  else
  lcd.setCursor(11, 0);
  lcd.print(int(((DHT1.temperature+DHT2.temperature+DHT3.temperature+DHT4.temperature+DHT5.temperature)/5)-((100-((DHT1.humidity+DHT2.humidity+DHT3.humidity+DHT4.humidity+DHT5.humidity)/5))/5)));
  lcd.setCursor(13, 0);
  lcd.print((char)223);
  lcd.setCursor(14, 0);
  lcd.print("C");
  delay(3000);
    
  lcd.setCursor(0, 0);
  lcd.clear();
  lcd.setCursor(0, 1);
  lcd.clear();

  //sensor 1
  lcd.setCursor(0, 0);
  lcd.print("Inferior Direito");
  lcd.setCursor(0, 1);
  lcd.write(1);
  lcd.setCursor(1, 1);
  lcd.print(DHT1.temperature,0); 
  lcd.setCursor(3, 1);
  lcd.print((char)223);
  lcd.setCursor(4, 1);
  lcd.print("C");
  lcd.setCursor(6, 1);
  lcd.write(2);
  lcd.setCursor(7, 1);
  lcd.print(DHT1.humidity,0);
  lcd.setCursor(9, 1);
  lcd.print("%");
  lcd.setCursor(11, 1);
  lcd.write(3);
  if ((int(DHT1.temperature-((100-DHT1.humidity)/5)))<10)
  lcd.setCursor(13, 1);
  else
  lcd.setCursor(12, 1);
  lcd.print(int(DHT1.temperature-((100-DHT1.humidity)/5))); 
  lcd.setCursor(14, 1);
  lcd.print((char)223);
  lcd.setCursor(15, 1);
  lcd.print("C");
  delay(2500);
  lcd.setCursor(0, 0);
  lcd.clear();
  lcd.setCursor(0, 1);
  lcd.clear();
  
    
  //sensor 2
  lcd.setCursor(0, 0);
  lcd.print("Superior Direito");
  lcd.setCursor(0, 1);
  lcd.write(1);
  lcd.setCursor(1, 1);
  lcd.print(DHT2.temperature,0); 
  lcd.setCursor(3, 1);
  lcd.print((char)223);
  lcd.setCursor(4, 1);
  lcd.print("C");
  lcd.setCursor(6, 1);
  lcd.write(2);
  lcd.setCursor(7, 1);
  lcd.print(DHT2.humidity,0);
  lcd.setCursor(9, 1);
  lcd.print("%");
  lcd.setCursor(11, 1);
  lcd.write(3);
  if ((int(DHT2.temperature-((100-DHT2.humidity)/5)))<10)
  lcd.setCursor(13, 1);
  else
  lcd.setCursor(12, 1);
  lcd.print(int(DHT2.temperature-((100-DHT2.humidity)/5))); 
  lcd.setCursor(14, 1);
  lcd.print((char)223);
  lcd.setCursor(15, 1);
  lcd.print("C");
  delay(2500);
  lcd.setCursor(0, 0);
  lcd.clear();
  lcd.setCursor(0, 1);
  lcd.clear();
  
  //sensor 3
  lcd.setCursor(0, 0);
  lcd.print("SuperiorEsquerdo");
  lcd.setCursor(0, 1);
  lcd.write(1);
  lcd.setCursor(1, 1);
  lcd.print(DHT3.temperature,0); 
  lcd.setCursor(3, 1);
  lcd.print((char)223);
  lcd.setCursor(4, 1);
  lcd.print("C");
  lcd.setCursor(6, 1);
  lcd.write(2);
  lcd.setCursor(7, 1);
  lcd.print(DHT3.humidity,0);
  lcd.setCursor(9, 1);
  lcd.print("%");
  lcd.setCursor(11, 1);
  lcd.write(3);
  if ((int(DHT3.temperature-((100-DHT3.humidity)/5)))<10)
  lcd.setCursor(13, 1);
  else
  lcd.setCursor(12, 1);
  lcd.print(int(DHT3.temperature-((100-DHT3.humidity)/5))); 
  lcd.setCursor(14, 1);
  lcd.print((char)223);
  lcd.setCursor(15, 1);
  lcd.print("C");
  delay(2500);
  lcd.setCursor(0, 0);
  lcd.clear();
  lcd.setCursor(0, 1);
  lcd.clear();
  
  //sensor 4
  lcd.setCursor(0, 0);
  lcd.print("InferiorEsquerdo");
  lcd.setCursor(0, 1);
  lcd.write(1);
  lcd.setCursor(1, 1);
  lcd.print(DHT4.temperature,0); 
  lcd.setCursor(3, 1);
  lcd.print((char)223);
  lcd.setCursor(4, 1);
  lcd.print("C");
  lcd.setCursor(6, 1);
  lcd.write(2);
  lcd.setCursor(7, 1);
  lcd.print(DHT4.humidity,0);
  lcd.setCursor(9, 1);
  lcd.print("%");
  lcd.setCursor(11, 1);
  lcd.write(3);
  if ((int(DHT4.temperature-((100-DHT4.humidity)/5)))<10)
  lcd.setCursor(13, 1);
  else
  lcd.setCursor(12, 1);
  lcd.print(int(DHT4.temperature-((100-DHT4.humidity)/5))); 
  lcd.setCursor(14, 1);
  lcd.print((char)223);
  lcd.setCursor(15, 1);
  lcd.print("C");
  delay(2500);
  lcd.setCursor(0, 0);
  lcd.clear();
  lcd.setCursor(0, 1);
  lcd.clear();
  
  //sensor 5
  lcd.setCursor(0, 0);
  lcd.print("Atra's ao Centro");
  lcd.setCursor(0, 1);
  lcd.write(1);
  lcd.setCursor(1, 1);
  lcd.print(DHT5.temperature,0); 
  lcd.setCursor(3, 1);
  lcd.print((char)223);
  lcd.setCursor(4, 1);
  lcd.print("C");
  lcd.setCursor(6, 1);
  lcd.write(2);
  lcd.setCursor(7, 1);
  lcd.print(DHT5.humidity,0);
  lcd.setCursor(9, 1);
  lcd.print("%");
  lcd.setCursor(11, 1);
  lcd.write(3);
  if ((int(DHT5.temperature-((100-DHT5.humidity)/5)))<10)
  lcd.setCursor(13, 1);
  else
  lcd.setCursor(12, 1);
  lcd.print(int(DHT5.temperature-((100-DHT5.humidity)/5))); 
  lcd.setCursor(14, 1);
  lcd.print((char)223);
  lcd.setCursor(15, 1);
  lcd.print("C");
  delay(2500);
  lcd.setCursor(0, 0);
  lcd.clear();
  lcd.setCursor(0, 1);
  lcd.clear();

  //mostrar data, hora e temp na CPU/RTC:
    
  lcd.setCursor(0, 0);
  lcd.print(rtc.getTimeStr(FORMAT_SHORT));
  lcd.setCursor(0, 1);
  lcd.print(rtc.getDateStr());
  lcd.setCursor(12, 1);
  lcd.print(int(rtc.getTemp()));
  lcd.setCursor(14, 1);
  lcd.print((char)223);
  lcd.setCursor(15, 1);
  lcd.print("C");
    
  delay(2500);


                                                                        // funcionamento apenas diurnamente
  if (DHT1.humidity  > 45 
   // && ((t.hour) > 06 && (t.hour) < 19)
      ||                                                                // se a umidade do sensor 1
      DHT2.humidity  > 45 
   // && ((t.hour) > 06 && (t.hour) < 19)
      ||                                                                // ou se a umidade do sensor 2
      DHT3.humidity  > 45 
   // && ((t.hour) > 06 && (t.hour) < 19)
      ||                                                                // ou se a umidade do sensor 3
      DHT4.humidity  > 45 
   // && ((t.hour) > 06 && (t.hour) < 19)
      ||                                                                // ou se a umidade do sensor 3
      DHT5.humidity  > 45 
   // && ((t.hour) > 06 && (t.hour) < 19)
      )                                                                 //for maior que 45%, então:
  {

  digitalWrite(porta_rele1, LOW);   //Liga rele 1 
  digitalWrite(porta_rele2, HIGH);  //desliga rele 2 
  digitalWrite(porta_rele3, HIGH);  //desliga rele 3 


  ;}

  else { 
  
  digitalWrite(porta_rele1, HIGH);  //Desliga rele 1 
  digitalWrite(porta_rele2, HIGH);  //Desliga rele 2 
  digitalWrite(porta_rele3, HIGH);  //Desliga rele 3 
 
  ;}

  if ((int(rtc.getTemp()))  // controle do cooler CPU
  > 24){

  digitalWrite(porta_rele4, LOW);  //Liga rele 4 

  ;}

  else {  

  digitalWrite(porta_rele4, HIGH);  //Desliga rele 4 
  ;}

  
      
  Serial.print(rtc.getDateStr());
  Serial.print(",");
  Serial.print(rtc.getTimeStr());
  Serial.print(",");
  Serial.print(int(rtc.getTemp())); //Case do Arduino
  Serial.print(",");
  Serial.print(DHT1.temperature,0);
  Serial.print(",");
  Serial.print(DHT1.humidity,0); 
  
  Serial.print(",");
  Serial.print(DHT2.temperature,0);
  Serial.print(",");
  Serial.print(DHT2.humidity,0); 

  Serial.print(",");
  Serial.print(DHT3.temperature,0);
  Serial.print(",");
  Serial.print(DHT3.humidity,0); 

  Serial.print(",");
  Serial.print(DHT4.temperature,0);
  Serial.print(",");
  Serial.print(DHT4.humidity,0); 
  
  Serial.print(",");
  Serial.print(DHT5.temperature,0);
  Serial.print(",");
  Serial.println(DHT5.humidity,0); 

     //mostrar status do datalloger:
//    if((t.min) < 1 )   // coletar dados a cada 10 minutos
//    {
    lcd.setCursor(6, 0);
    lcd.print("recording");

    myFile = SD.open("test.txt", FILE_WRITE);
  if (myFile) 
    {

       
    myFile.print(rtc.getDateStr());
    myFile.print(",");
    myFile.print(rtc.getTimeStr());
    myFile.print(",");    
    myFile.print(int(rtc.getTemp()));
    myFile.print(",");
    myFile.print(DHT1.temperature,0);
    myFile.print(",");
    myFile.print(DHT1.humidity,0); 
  
    myFile.print(",");
    myFile.print(DHT2.temperature,0);
    myFile.print(",");
    myFile.print(DHT2.humidity,0); 

    myFile.print(",");
    myFile.print(DHT3.temperature,0);
    myFile.print(",");
    myFile.print(DHT3.humidity,0); 

    myFile.print(",");
    myFile.print(DHT4.temperature,0);
    myFile.print(",");
    myFile.print(DHT4.humidity,0); 
  
    myFile.print(",");
    myFile.print(DHT5.temperature,0);
    myFile.print(",");
    myFile.println(DHT5.humidity,0);
    
    myFile.close(); // close the file

//    }  
    }
  // if the file didn't open, print an error:
  else {
    Serial.println("error opening test.txt");
    lcd.setCursor(6, 0);
    lcd.print("monitoring");
    

    }

  
  
  delay(3000);
}  

