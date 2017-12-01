
//Classes
import Rule from 'JSUI/Source/1.0.0/Classes/Style/SheetRule';

//Utilities
import exports from 'Parcello/exports';

let framing = new Rule('.SansTypo.Page.Tester', {
	position: 'absolute',
	padding: 0,
	margin: 0,
	top: '45px',
	right: 0,
	bottom: 0,
	left: 0,
});

export default framing;

exports(framing).as('SansTypo/Source/1.0.0/Pages/TypeSpeed/Tester/Styles/framing');
