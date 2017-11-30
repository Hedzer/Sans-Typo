
//Classes
import Rule from 'JSUI/Source/1.0.0/Classes/Style/SheetRule';

//Utilities
import exports from 'Parcello/exports';

const selector = '.SansTypo.Summary';

let theme = new Rule(selector, {
	backgroundColor: 'white',
	boxShadow: '0 0 5px rgba(0, 0, 0, 0.2), 0 0 10px rgba(0, 0, 0, 0.1)',
	zIndex: 2,
});

export default theme;

exports(theme).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Summary/Styles/theme');
