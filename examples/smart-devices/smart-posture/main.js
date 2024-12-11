import Protobject from './js/protobject.js';
import Inclination from './js/inclination.js';
import Haptic from './js/haptic.js';
import Lamp from './js/lamp.js';

Haptic.start();

Protobject.onReceived((data) => {
    console.log(data);
  	if (data.activate==true) {
     active=true;
    } else if (data.activate==false){
     active=false;
    }
  
  	if (data.sensitivity) {
      calibration=data.sensitivity;
    }
});

var active=false;
var calibration=10

Inclination.start(300); //generate events each 300 ms
Inclination.onData((data) => {
  console.log(data)
    if (data.z > calibration/10 && active==true) {
      Haptic.vibrate([200, 10]);
      lamp.setColor('red');
    } else {
      lamp.setColor('white');
    }
});

const lamp = new Lamp({
    width: '100%',
    height: '90%',
    top: '0px',
    left: '0px',
});