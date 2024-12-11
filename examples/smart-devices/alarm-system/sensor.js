import CameraMovement from './js/cameraMovement.js';
import Protobject from './js/protobject.js';
import NotePlayer from './js/notePlayer.js';

const alarm = new NotePlayer("https://cdn.freesound.org/previews/284/284581_4094595-lq.mp3");

let armed=false;
CameraMovement.start(30, 1); 
CameraMovement.showPreview({ top: 50, left: 50, width: 640, height: 480 });

Protobject.onReceived((data) => {
    armed=data.armed;
  	countDown=10;
  	activated=false
  	if (armed==false){
     clearInterval(interval); 
      alarm.stop();
    }
});

let countDown=10;
let activated=false;

let interval;
CameraMovement.onData((data) => {
  	if (data.magnitude > 5 && armed && activated==false){
      activated=true;
     console.log("countdown")
      interval = setInterval(function(){ 
        countDown--;
        Protobject.send({ timer: countDown }).to('control.js');
        if (countDown==0 && armed){
          console.log("play alarm")
          alarm.play();
        }
      }, 1000);
      
    }
});