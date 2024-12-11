import Protobject from './js/protobject.js';
import Arduino from './js/arduino.js';
Arduino.start();

Protobject.onReceived((data) => {
    if (data.lightOne == true){
     console.log("turn on one") 
      Arduino.servoWrite({ pin: 5, value: 600 }); 
     
    } else if (data.lightOne == false){
     console.log("turn off one") 
     Arduino.servoWrite({ pin: 5, value: 400 }); 
    }
  
  
    if (data.lightTwo == true){
     console.log("turn on two") 
      Arduino.servoWrite({ pin: 6, value: 110 }); 
     
    } else if (data.lightTwo == false){
     console.log("turn off two") 
     Arduino.servoWrite({ pin: 6, value: -10 }); 
    }
   
});