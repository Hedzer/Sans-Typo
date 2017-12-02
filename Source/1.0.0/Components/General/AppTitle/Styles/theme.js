
//Classes
import Rule from 'JSUI/Source/1.0.0/Classes/Style/SheetRule';

//Utilities
import exports from 'Parcello/exports';

const selector = '.SansTypo.AppTitle';

let theme = new Rule(selector, {
	backgroundColor: '#b5d6f3',
	color: '#5f9ea0',
	fontFamily: '"Lobster", cursive',
	boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 20px, rgba(0, 0, 0, 0.1) 0px 0px 200px',
	userSelect: 'none',
});

export default theme;

exports(theme).as('SansTypo/Source/1.0.0/Components/General/AppTitle/Styles/theme');
