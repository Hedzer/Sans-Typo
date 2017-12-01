
//Classes
import Rule from 'JSUI/Source/1.0.0/Classes/Style/SheetRule';

//Utilities
import exports from 'Parcello/exports';

const selector = '.SansTypo.AppTitle';

let framing = new Rule(selector, {
	position: 'absolute',
	top: 0,
	right: 0,
	left: 0,
	height: '45px',
	padding: 0,
	margin: 0,
	textAlign: 'center',
	fontSize: '37px',
	lineHeight: '41px',
	zIndex: 100,
});

export default framing;

exports(framing).as('SansTypo/Source/1.0.0/Components/General/AppTitle/Styles/framing');
