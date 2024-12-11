import Protobject from './js/protobject.js';
import Arduino from './js/arduino.js';
Arduino.start();


Protobject.onReceived((data) => {
  console.log("action "+ data.lock);
  if (data.lock==1){
    Arduino.contServoWrite({ pin: 5, value: -1500 });
    
    setTimeout(() => {
      Arduino.contServoWrite({ pin: 5, value: 0 });
    }, 1000);
  } else if (data.lock==0){
    Arduino.contServoWrite({ pin: 5, value: 1500 });
    setTimeout(() => {
      Arduino.contServoWrite({ pin: 5, value: 0 });
    }, 1000);
  } 
});