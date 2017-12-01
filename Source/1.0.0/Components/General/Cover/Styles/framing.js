
//Classes
import Rule from 'JSUI/Source/1.0.0/Classes/Style/SheetRule';

//Utilities
import exports from 'Parcello/exports';

const selector = '.SansTypo.Cover';

let framing = new Rule(selector, {
	position: 'absolute',
	top: 0,
	right: 0,
	bottom: 0,
	left: 0,
	padding: '5%',
	margin: 0,
	textAlign: 'center',
	textAlignLast: 'center',
	fontSize: '3vh',
	zIndex: 1000,
});

let nonInteractive = new Rule(`${selector}.non-interactive`, {
	display: 'none',
	pointerEvents: 'none',
});


let exported = [ framing, nonInteractive ];

export default exported;

exports(exported).as('SansTypo/Source/1.0.0/Components/General/Cover/Styles/framing');
