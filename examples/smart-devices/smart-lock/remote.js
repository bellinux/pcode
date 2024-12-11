import Button from './js/button.js';
import Protobject from './js/protobject.js';
import Text from './js/text.js';

const myText = new Text({
    defaultText: 'Master Key',
    editable: false,
    style: {
        backgroundColor: 'transparent',
        border: 0,
        textAlign: "center",
      	fontSize: "45px",
      	top:"1px"
    },
});


const LockButton = new Button({
    text: 'Lock',
    style: {
        backgroundColor: 'red',
        color: 'white',
        padding: '10px 10px',
        width:"100%",
        height:"300px",
      top:"80px",fontSize:"40px",
      
    }
});

LockButton.onPressed(() => {
  let code = prompt("Please enter the code", "");
  Protobject.send({ lock: 1, code: code }).to('code.js')
});


const UnlockButton = new Button({
    text: 'Unlock',
    style: {
        backgroundColor: 'green',
        color: 'white',
        padding: '10px 10px',
        width:"100%",
        height:"300px",
        top:"380px",fontSize:"40px",

    }
});

UnlockButton.onPressed(() => Protobject.send({ lock: 0 }).to('code.js'));















