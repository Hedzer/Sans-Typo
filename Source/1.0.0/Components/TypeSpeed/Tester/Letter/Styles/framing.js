
//Classes
import Rule from 'JSUI/Source/1.0.0/Classes/Style/SheetRule';

//Utilities
import exports from 'Parcello/exports';

let framing = new Rule('.SansTypo.Letter', {
	color: 'inherit',
	fontSize: 'inherit',
	fontFamily: 'inherit',
});

export default framing;

exports(framing).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Letter/Styles/theme');
