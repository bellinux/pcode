import Switch from './js/switch.js';
import Knob from './js/knob.js';
import Protobject from './js/protobject.js';

const switchInstance = new Switch({
    onText: 'ON', 
    offText: 'OFF', 
    width: 100, 
    height: 270,
    top: 30,
    left: 200,
    fontSize: 20,
    onTurnedOn: () => console.log('Switch turned ON'),
    onTurnedOff: () => console.log('Switch turned OFF'),
    styleOff: { backgroundColor: 'grey' },
    styleOn: { backgroundColor: 'green' }
});

switchInstance.onTurnedOn(() => Protobject.send({activate: true}).to("main.js"));
switchInstance.onTurnedOff(() => Protobject.send({activate: false}).to("main.js"));

// Example configuration
const config = {
    min: 40,
    max: 100,
    size: 270,
    initialValue: 10,
    knobColor: '#333',
    valueColor: '#fff',
    style: {
        position: 'absolute',
        top: '30px',
        left: '400px',
    }
};

const knobInstance = new Knob(config);

knobInstance.onChange((value) => {
    Protobject.send({sensitivity: value}).to("main.js")
});