
//Classes
import Rule from 'JSUI/Source/1.0.0/Classes/Style/SheetRule';

//Utilities
import exports from 'Parcello/exports';

//Styles
import values from 'SansTypo/Source/1.0.0/Pages/TypeSpeed/Tester/Styles/values';

let reader = new Rule('.SansTypo.Page.Tester .Reader', {
	position: 'absolute',
	top: 0,
	right: `${values.Summary.width}px`,
	bottom: "50%",
	left: 0,
});

export default reader;

exports(reader).as('SansTypo/Source/1.0.0/Pages/TypeSpeed/Tester/Styles/reader');
