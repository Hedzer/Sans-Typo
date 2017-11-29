
//Classes
import Rule from 'JSUI/Source/1.0.0/Classes/Style/SheetRule';

//Utilities
import exports from 'Parcello/exports';

let selector = '.SansTypo.Reader';

let theme = new Rule(`${selector}`, {
	backgroundColor: 'white',
	// boxShadow: '0 0 5px rgba(0, 0, 0, 0.2), inset 0 0 50px rgba(0, 0, 0, 0.1)',
});

export default theme;

exports(theme).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Reader/Styles/theme');
