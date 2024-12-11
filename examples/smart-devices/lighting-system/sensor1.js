import PresenceSensor from './js/presenceSensor.js';
import Protobject from './js/protobject.js';

PresenceSensor.setBaselineAndStartMonitoring(200, 0);
PresenceSensor.showPreview({ top: 50, left: 50, width: 640, height: 480 });

let LValue=0;
let OldLValue=0;

PresenceSensor.onData((similarity) => {
  if (similarity < 0.80) {
    LValue=1;
  } else {
    LValue=0; 
  }
  
  if (LValue != OldLValue)  Protobject.send({ lightOne: LValue }).to('actuator.js');
  OldLValue=LValue;
}); 