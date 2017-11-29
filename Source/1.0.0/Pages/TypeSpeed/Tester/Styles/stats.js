
//Classes
import Rule from 'JSUI/Source/1.0.0/Classes/Style/SheetRule';

//Utilities
import exports from 'Parcello/exports';

//Styles
import values from 'SansTypo/Source/1.0.0/Pages/TypeSpeed/Tester/Styles/values';

let stats = new Rule(`.SansTypo.Page.Tester .Stats`, {
	position: 'absolute',
	padding: 0,
	margin: 0,
	top: 0,
	right: 0,
	bottom: 0,
	width: `${values.Stats.width}px`,
});

export default stats;

exports(stats).as('SansTypo/Source/1.0.0/Pages/TypeSpeed/Tester/Styles/stats');
