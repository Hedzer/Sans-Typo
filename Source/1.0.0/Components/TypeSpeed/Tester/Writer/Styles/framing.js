
//Classes
import Rule from 'JSUI/Source/1.0.0/Classes/Style/SheetRule';

//Utilities
import exports from 'Parcello/exports';

const selector = '.SansTypo.Writer';

let framing = new Rule(selector, {
	position: 'relative',
	padding: '50px',
	margin: 0,
	textAlign: 'justify',
	textAlignLast: 'center',
	fontSize: '32px',
	zIndex: 0,
});

let empty = new Rule(`${selector}:empty`, {
	paddingLeft:"calc(50% - 100px)",
});

export default [ framing, empty ];

exports(framing).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Writer/Styles/framing');
