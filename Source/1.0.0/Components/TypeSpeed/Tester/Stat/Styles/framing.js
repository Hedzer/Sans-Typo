
//Classes
import Rule from 'JSUI/Source/1.0.0/Classes/Style/SheetRule';

//Utilities
import exports from 'Parcello/exports';

let selector = '.SansTypo.Stat';

let framing = new Rule(selector, {
	display: 'inline-block',
	boxSizing: 'border-box',
	width: '100%',
	margin: '1vh 0',
	overflow: 'hidden',
});

let title = new Rule(`${selector} .as-Title`, {
	display: 'block',
	boxSizing: 'border-box',
	width: '100%',
	height: '3.5vh',
	fontSize: '2vh',
	lineHeight: '3.5vh',
});

let info = new Rule(`${selector} .as-Info`, {
	display: 'block',
	boxSizing: 'border-box',
	width: '100%',
	height: '6vh',
	fontSize: '4vh',
	lineHeight: '6vh'
});

let exported = [ framing, title, info ];

export default exported;

exports(exported).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Stat/Styles/framing');
