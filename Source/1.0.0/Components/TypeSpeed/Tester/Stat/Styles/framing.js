
//Classes
import Rule from 'JSUI/Source/1.0.0/Classes/Style/SheetRule';

//Utilities
import exports from 'Parcello/exports';

let selector = '.SansTypo.Stat';

let framing = new Rule(selector, {
	display: 'inline-block',
	boxSizing: 'border-box',
	width: '100%',
	margin: '10px 0',
	overflow: 'hidden',
});

let title = new Rule(`${selector} .as-Title`, {
	display: 'inline-block',
	padding: '5px',
	width: '100%',
	fontSize: '2vh',
});

let info = new Rule(`${selector} .as-Info`, {
	display: 'inline-block',
	padding: '5px',
	width: '100%',
	fontSize: '3vh',
});

let exported = [ framing, title, info ];

export default exported;

exports(exported).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Stat/Styles/framing');
