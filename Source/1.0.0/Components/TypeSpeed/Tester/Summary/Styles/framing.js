
//Classes
import Rule from 'JSUI/Source/1.0.0/Classes/Style/SheetRule';

//Utilities
import exports from 'Parcello/exports';

let selector = '.SansTypo.Summary';

let framing = new Rule(selector, {
	position: 'relative',
	boxSizing: 'border-box',
	padding: '10px',
	textAlign: 'justify',
	textAlignLast: 'center',
	fontSize: '20px',
	overflow: 'hidden',
});

let newRound = new Rule(`${selector} .Button.as-NewRound`, {
	display: 'inline-block',
	width: '100%',
	padding: '5px',
	fontSize: '2vh',
	margin: '10px 0px',
});

let exported = [ framing, newRound ];

export default exported;

exports(exported).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Summary/Styles/framing');
