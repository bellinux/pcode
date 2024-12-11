import Button from './js/button.js';
import Text from './js/text.js';
import Protobject from './js/protobject.js';

const bOne = new Button({
    text: '1',
    style: {backgroundColor: '#333',color: 'white',padding: '10px 20px',
        top:"100px", left:"0px", width: "100px", height: "100px", fontSize:"40px",
    }
});

const bTwo = new Button({
    text: '2',
    style: {backgroundColor: '#333',color: 'white',padding: '10px 20px',
        top:"100px", left:"100px", width: "100px", height: "100px", fontSize:"40px",
    }
});

const bThree = new Button({
    text: '3',
    style: {backgroundColor: '#333',color: 'white',padding: '10px 20px',
        top:"100px", left:"200px", width: "100px", height: "100px", fontSize:"40px",
    }
});

const bFour = new Button({
    text: '4',
    style: {backgroundColor: '#333',color: 'white',padding: '10px 20px',
        top:"200px", left:"0px", width: "100px", height: "100px", fontSize:"40px",
    }
});

const bFive = new Button({
    text: '5',
    style: {backgroundColor: '#333',color: 'white',padding: '10px 20px',
        top:"200px", left:"100px", width: "100px", height: "100px", fontSize:"40px",
    }
});

const bSix = new Button({
    text: '6',
    style: {backgroundColor: '#333',color: 'white',padding: '10px 20px',
        top:"200px", left:"200px", width: "100px", height: "100px", fontSize:"40px",
    }
});


const bSeven = new Button({
    text: '7',
    style: {backgroundColor: '#333',color: 'white',padding: '10px 20px',
        top:"300px", left:"0px", width: "100px", height: "100px", fontSize:"40px",
    }
});

const bEight = new Button({
    text: '8',
    style: {backgroundColor: '#333',color: 'white',padding: '10px 20px',
        top:"300px", left:"100px", width: "100px", height: "100px", fontSize:"40px",
    }
});

const bNine = new Button({
    text: '9',
    style: {backgroundColor: '#333',color: 'white',padding: '10px 20px',
        top:"300px", left:"200px", width: "100px", height: "100px", fontSize:"40px",
    }
});

const bCancel = new Button({
    text: 'C',
    style: {backgroundColor: '#333',color: 'white',padding: '10px 20px',
        top:"0px", left:"200px", width: "100px", height: "100px", fontSize:"40px",
    }
});

const bAction = new Button({
    text: 'Lock',
    style: {backgroundColor: 'green',color: 'white',padding: '10px 20px',
        top:"400px", left:"0px", width: "300px", height: "100px", fontSize:"40px",
    }
});

bOne.onPressed(() => 	{passcode.setText(passcode.getText() + "1") });
bTwo.onPressed(() => 	{passcode.setText(passcode.getText() + "2") });
bThree.onPressed(() => 	{passcode.setText(passcode.getText() + "3") });
bFour.onPressed(() => 	{passcode.setText(passcode.getText() + "4") });
bFive.onPressed(() => 	{passcode.setText(passcode.getText() + "5") });
bSix.onPressed(() => 	{passcode.setText(passcode.getText() + "6") });
bSeven.onPressed(() => 	{passcode.setText(passcode.getText() + "7") });
bEight.onPressed(() => 	{passcode.setText(passcode.getText() + "8") });
bNine.onPressed(() => 	{passcode.setText(passcode.getText() + "9") });

bCancel.onPressed(() => {passcode.setText("") });

let LockedState = 0
let codeNumber=1234;

bAction.onPressed(() => {
	if (LockedState==0){
      codeNumber=passcode.getText()
      if (codeNumber=="") { 
        passcode.setText("NoCode")
        setTimeout(function(){passcode.setText("")}, 1000)
        return;
      }
      passcode.setText("")
      bAction.setText("Unlock")
      bAction.setStyle({backgroundColor: 'red' });
      LockedState=1
      action(LockedState)
    } else if (LockedState==1){
      if (passcode.getText()==codeNumber){
        LockedState=0
        bAction.setText("Lock")
        passcode.setText("")
        bAction.setStyle({backgroundColor: 'green' });
        action(LockedState)
      } else {
        passcode.setText("CodeErr")
        setTimeout(function(){passcode.setText("")}, 1000)
      }
      
    }
});

const passcode = new Text({
    placeholder: '',
    defaultText: '',
    editable: false,
    style: {
        backgroundColor: 'lightyellow',
        border: '1px solid black',
      	height: "75px",
      	width: "175px",
        textAlign: "center",
      fontSize:"40px",
    },
});


Protobject.onReceived((data) => {
    if (data.lock==1) {
      LockedState = 1
      codeNumber=data.code
      passcode.setText("")
      bAction.setText("Unlock")
      bAction.setStyle({backgroundColor: 'red' });
    } else if (data.lock==0) {
      LockedState = 0
      passcode.setText("")
      bAction.setText("Lock")
      bAction.setStyle({backgroundColor: 'green' });
    }
  	action(LockedState)
});


function action(lock){
    Protobject.send({ lock: lock }).to('control.js')
}
















