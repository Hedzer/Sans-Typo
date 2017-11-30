
//Classes
import Rule from 'JSUI/Source/1.0.0/Classes/Style/SheetRule';

//Utilities
import exports from 'Parcello/exports';

let framing = new Rule('.SansTypo.Reader', {
	position: 'relative',
	padding: '50px',
	margin: 0,
	textAlign: 'justify',
	textAlignLast: 'center',
	fontSize: '32px',
	zIndex: 1,
});

export default framing;

exports(framing).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Reader/Styles/framing');
