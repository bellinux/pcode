import Switch from './js/switch.js';
import Text from './js/text.js';
import Protobject from './js/protobject.js';
import NotePlayer from './js/notePlayer.js';
const options = {
    A1: "https://tonejs.github.io/audio/casio/A1.mp3",
};
const player = new NotePlayer(options);


const message = new Text({
  	placeholder: "",
    editable: false,
    style: {
        backgroundColor: 'transparent',
      	color: "#000",
      fontSize:"35px",
      border: 0,
      textAlign: "center"
    },
});


const code = new Text({
  	placeholder: "Insert deactivation code",
    editable: true,
    style: {
        backgroundColor: 'transparent',
      	color: "#000",
       	top: "60px",
      fontSize:"55px",
       textAlign: "center",
      	border: "1px solid #222",
      	display: "none"
    },
});


code.onInput((text) => {
    if (text == "1234"){
      Protobject.send({ armed: false}).to('sensor.js');
      message.setText("Disarmed")
      code.setText("");
      code.setStyle({display: "none"})
       switchInstance.setStyleContainer({visibility: "visible"})
    }
});

const switchInstance = new Switch({
    onText: 'ON', 
    offText: 'OFF', 
    width: 320, 
    height: 560,
    top: 150,
    left: 30,
    fontSize: 20,
    styleOff: { backgroundColor: 'grey' },
    styleOn: { backgroundColor: 'green' }
});

let soundInterval;

message.setText("Disarmed")
switchInstance.onTurnedOn(() => {
	message.setText("The alarm will be activated in 20 seconds.")
  	
    soundInterval = setInterval(function () {
      player.play("A5");
      setTimeout(function () {
        player.stop();
      }, 100);
    }, 1000);
  
  	setTimeout(function(){ 
    	message.setText("Armed")
      	clearInterval(soundInterval)
      	Protobject.send({ armed: true}).to('sensor.js');
    }, 20000);
});


switchInstance.onTurnedOff(() => {
  code.setStyle({display: "block"})
  switchInstance.setStyleContainer({visibility: "hidden"})
});
                           
                           
Protobject.onReceived((data) => {
    message.setText(data.timer)
    soundInterval = setTimeout(function () {
      player.play("A5");
      setTimeout(function () {
        player.stop();
      }, 100);
    }, 1000);
  	
});       
                           
                           
                           
                           
                           
                           
                           
                           
                           
                           
                           
                           
                           