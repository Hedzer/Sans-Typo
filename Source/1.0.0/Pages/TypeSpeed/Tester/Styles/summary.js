
//Classes
import Rule from 'JSUI/Source/1.0.0/Classes/Style/SheetRule';

//Utilities
import exports from 'Parcello/exports';

//Styles
import values from 'SansTypo/Source/1.0.0/Pages/TypeSpeed/Tester/Styles/values';

let summary = new Rule(`.SansTypo.Page.Tester .Summary`, {
	position: 'absolute',
	padding: 0,
	margin: 0,
	top: 0,
	right: 0,
	bottom: 0,
	width: `${values.Summary.width}px`,
});

export default summary;

exports(summary).as('SansTypo/Source/1.0.0/Pages/TypeSpeed/Tester/Styles/summary');
