#include "GParser.h"

#define WORK_OK 8
#define WORK_WARNING 9
#define WORK_ERROR 10
#define PUMP_ONE 12
#define PUMP_TWO 11
#define GUARD_SENSOR A0
#define INDICATE_GUARD_SENSOR 3
#define INDICATE_SENSOR_LEVEL1 4
#define SENSOR_LEVEL2 A1
#define INDICATE_SENSOR_LEVEL2 5
#define SENSOR_LEVEL3 A2
#define INDICATE_SENSOR_LEVEL3 6
#define SENSOR_LEVEL4 A3
#define INDICATE_SENSOR_LEVEL4 7
#define interval 3000
#define period 100
// таймер периода опроса прибора
unsigned long timer;
unsigned long last_press;
// была ли кнопка нажата
boolean btnSensor[] = {false, false, false, false};
// состояние кнопки сейчас
boolean btnSensorNow[] = {false, false, false, false};
//состояние датчиков
boolean indicate[] = {true, false, false, false, false};
int mode = 0;
int pumpOne = 0;
int pumpTwo = 0;

const int inputPins[] = {
  GUARD_SENSOR, 
  SENSOR_LEVEL2, 
  SENSOR_LEVEL3, 
  SENSOR_LEVEL4
  };
const int outputPins[] = {
  WORK_OK, 
  WORK_WARNING, 
  WORK_ERROR, 
  PUMP_ONE, 
  PUMP_TWO, 
  INDICATE_GUARD_SENSOR, 
  INDICATE_SENSOR_LEVEL1, 
  INDICATE_SENSOR_LEVEL2, 
  INDICATE_SENSOR_LEVEL3, 
  INDICATE_SENSOR_LEVEL4
  };
const int sensorPins[] = {
    INDICATE_SENSOR_LEVEL1,
    INDICATE_SENSOR_LEVEL2,
    INDICATE_SENSOR_LEVEL3,
    INDICATE_SENSOR_LEVEL4,
    INDICATE_GUARD_SENSOR,
    PUMP_ONE,
    PUMP_TWO,
    WORK_OK,
    WORK_WARNING,
    WORK_ERROR
};

int lastStates[sizeof(sensorPins) / sizeof(sensorPins[0])] = {-1}; // Инициализация массива

void setup() {
  for (int i = 0; i < sizeof(inputPins) / sizeof(inputPins[0]); i++) {
    pinMode(inputPins[i], INPUT_PULLUP);
  }  
  for (int i = 0; i < sizeof(outputPins) / sizeof(outputPins[0]); i++) {
    pinMode(outputPins[i], OUTPUT);
  }  
  Serial.begin(9600);
  Serial.setTimeout(1000);
}

void loop() {
  if (millis() - last_press > period) {
    last_press = millis();
    buttons(btnSensor[0], btnSensorNow[0], SENSOR_LEVEL2, INDICATE_SENSOR_LEVEL2, indicate[1]);
    buttons(btnSensor[1], btnSensorNow[1], SENSOR_LEVEL3, INDICATE_SENSOR_LEVEL3, indicate[2]);
    buttons(btnSensor[2], btnSensorNow[2], SENSOR_LEVEL4, INDICATE_SENSOR_LEVEL4, indicate[3]);
    buttons(btnSensor[3], btnSensorNow[3], GUARD_SENSOR, INDICATE_GUARD_SENSOR, indicate[4]); 
  }
  if (millis() - timer > interval) {
    work (indicate, mode, pumpOne, pumpTwo); 
    setSerial();
    timer = millis();
  }
  parsing();    
}
// функция обработки нажатия кнопки
void buttons (boolean &btn, boolean &btnNow, int btnPin, int ledPin, boolean &indicate) {
  btn = !digitalRead(btnPin);  

  if(btn && !btnNow) {
    btnNow = true;
    indicate = !indicate;
    digitalWrite(ledPin, indicate);
  }
  if (!btn && btnNow) {
    btnNow = false;
  }
}
//отработка состояний устройства
void work(boolean indicate[], int &mode, int pumpOne, int pumpTwo) {
  if (mode == 0) {
    if (indicate[0] && !indicate[1] && !indicate[2] && !indicate[3] && !indicate[4]) {
      digitalWrite(INDICATE_SENSOR_LEVEL1, HIGH);
      digitalWrite(WORK_OK, HIGH);
      digitalWrite(WORK_WARNING, LOW);
      digitalWrite(WORK_ERROR, LOW);
      digitalWrite(PUMP_ONE, LOW);
      digitalWrite(PUMP_TWO, LOW);      
    }else if (indicate[0] && indicate[1] && !indicate[2] && !indicate[3] && !indicate[4]) {
      digitalWrite(WORK_OK, HIGH);
      digitalWrite(WORK_WARNING, LOW);
      digitalWrite(WORK_ERROR, LOW);
      digitalWrite(PUMP_ONE, HIGH);
      digitalWrite(PUMP_TWO, LOW);
    } else if (indicate[0] && indicate[1] && indicate[2] && !indicate[3] && !indicate[4]) {
      digitalWrite(WORK_OK, HIGH);
      digitalWrite(WORK_WARNING, LOW);      
      digitalWrite(WORK_ERROR, LOW);
      digitalWrite(PUMP_ONE, HIGH);
      digitalWrite(PUMP_TWO, HIGH);
    } else if (indicate[0] && indicate[1] && indicate[2] && indicate[3] && !indicate[4]) {
      digitalWrite(WORK_OK, LOW);
      digitalWrite(WORK_WARNING, HIGH);
      digitalWrite(WORK_ERROR, LOW);
      digitalWrite(PUMP_ONE, HIGH);
      digitalWrite(PUMP_TWO, HIGH);
    } else if (indicate[4]) {
      digitalWrite(WORK_OK, LOW);
      digitalWrite(WORK_WARNING, LOW);
      digitalWrite(WORK_ERROR, HIGH);
      digitalWrite(PUMP_ONE, LOW);
      digitalWrite(PUMP_TWO, LOW);
    }
  }
  if (mode == 1) {
    digitalWrite(WORK_OK, HIGH);
    digitalWrite(WORK_WARNING, HIGH);
    digitalWrite(WORK_ERROR, HIGH);
    digitalWrite(PUMP_ONE, pumpOne);
    digitalWrite(PUMP_TWO, pumpTwo);
  }   
}
// чтение данных из serialport
void parsing() {
  if (Serial.available()) {
    char str[30];
    int amount = Serial.readBytesUntil(';', str, 30);
    str[amount] = NULL;
    GParser data(str, ',');
    int ints[1];
    int am = data.parseInts(ints);   
    switch (ints[0]) {
      case 0: mode = ints[1]; break; //pump 1
      case 1: pumpOne = ints[1]; break; //pump2
      case 2: pumpTwo = ints[1]; break;     
    }
  }
}
//отправка данных в сериал порт
void setSerial() {
    bool changed = false; // Установить флаг изменения
    String dataToSend = "";
    for (int i = 0; i < sizeof(sensorPins) / sizeof(sensorPins[0]); i++) {
        int currentState = digitalRead(sensorPins[i]);
        if (currentState != lastStates[i]) {
            changed = true; 
            lastStates[i] = currentState; // Обновление предыдущего состояния
        }
        dataToSend += String(currentState) + " "; 
    }
    if (changed) {
        Serial.println(dataToSend);
    }
}



