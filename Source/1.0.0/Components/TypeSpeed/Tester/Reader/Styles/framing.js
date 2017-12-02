
//Classes
import Rule from 'JSUI/Source/1.0.0/Classes/Style/SheetRule';

//Utilities
import exports from 'Parcello/exports';

let framing = new Rule('.SansTypo.Reader', {
	position: 'relative',
	padding: '50px',
	margin: 0,
	fontSize: '4vmin',
	zIndex: 1,
});

export default framing;

exports(framing).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Reader/Styles/framing');
