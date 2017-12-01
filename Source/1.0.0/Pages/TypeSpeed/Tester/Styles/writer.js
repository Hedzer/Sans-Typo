
//Classes
import Rule from 'JSUI/Source/1.0.0/Classes/Style/SheetRule';

//Utilities
import exports from 'Parcello/exports';

//Styles
import values from 'SansTypo/Source/1.0.0/Pages/TypeSpeed/Tester/Styles/values';

let writer = new Rule('.SansTypo.Page.Tester .Writer', {
	position: 'absolute',
	top: "50%",
	right: `${values.Summary.width}px`,
	bottom: 0,
	left: 0,
});

export default writer;

exports(writer).as('SansTypo/Source/1.0.0/Pages/TypeSpeed/Tester/Styles/writer');
