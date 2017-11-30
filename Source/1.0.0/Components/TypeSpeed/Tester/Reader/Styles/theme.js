
//Classes
import Rule from 'JSUI/Source/1.0.0/Classes/Style/SheetRule';

//Utilities
import exports from 'Parcello/exports';

let theme = new Rule('.SansTypo.Reader', {
	backgroundColor: 'white',
	fontFamily: '"Inconsolata", monospace',
	boxShadow: '0 0 5px rgba(0, 0, 0, 0.2), 0 0 10px rgba(0, 0, 0, 0.1)',
	color: '#646464',
});

export default theme;

exports(theme).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Reader/Styles/theme');
