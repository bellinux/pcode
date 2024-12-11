import NoiseSensor from './js/noiseSensor.js';
import Lamp from './js/lamp.js';
import Text from './js/text.js';

const lamp = new Lamp({
    width: '100%',
    height: '100%',
    top: '0px',
    left: '0px',
});


NoiseSensor.start(30) //generate events each 300 ms

NoiseSensor.onData((intensity) => {
  console.log(intensity)  
  if (intensity > 3){
    lamp.setColor('red');
    myText.setText('Silence please!');
  } else {
    lamp.setColor('white');
    myText.setText('');
  }
});


const myText = new Text({
    placeholder: '',
    defaultText: '',
    editable: false,
    style: {
        backgroundColor: 'transparent',
        border: '0',
      	color: "white",
        fontSize: "30px",
      	textAlign: "center"
    },
});