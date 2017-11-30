
//Classes
import Rule from 'JSUI/Source/1.0.0/Classes/Style/SheetRule';

//Utilities
import exports from 'Parcello/exports';

let theme = new Rule('.SansTypo.Writer', {
	backgroundColor: 'white',
	fontFamily: '"Inconsolata", monospace',
	color: '#646464',
});

export default theme;

exports(theme).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Writer/Styles/theme');
