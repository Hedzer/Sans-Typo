
//Classes
import Rule from 'JSUI/Source/1.0.0/Classes/Style/SheetRule';

//Utilities
import exports from 'Parcello/exports';

const selector = '.SansTypo.Cover';

let theme = new Rule(selector, {
	backgroundColor: 'white',
	color: '#646464',
	opacity: 0,
	userSelect: 'none',
});

export default theme;

exports(theme).as('SansTypo/Source/1.0.0/Components/General/Cover/Styles/theme');
