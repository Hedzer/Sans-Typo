
//Classes
import Rule from 'JSUI/Source/1.0.0/Classes/Style/SheetRule';

//Utilities
import exports from 'Parcello/exports';

let framing = new Rule('.SansTypo.Summary', {
	position: 'relative',
	padding: '10px',
	textAlign: 'justify',
	textAlignLast: 'center',
	fontSize: '20px',
});

export default framing;

exports(framing).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Summary/Styles/framing');
