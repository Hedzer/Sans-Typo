
//Classes
import Rule from 'JSUI/Source/1.0.0/Classes/Style/SheetRule';

//Utilities
import exports from 'Parcello/exports';

const selector = '.SansTypo.Writer';

let framing = new Rule(selector, {
	position: 'relative',
	padding: '50px',
	margin: 0,
	fontSize: '4vmin',
	zIndex: 0,
});

let empty = new Rule(`${selector}:empty`, {
	paddingLeft:"calc(50% - 100px)",
});

let exported = [ framing, empty ];

export default exported;

exports(exported).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Writer/Styles/framing');
