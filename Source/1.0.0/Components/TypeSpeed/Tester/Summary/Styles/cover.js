
//Classes
import Rule from 'JSUI/Source/1.0.0/Classes/Style/SheetRule';

//Utilities
import exports from 'Parcello/exports';

let cover = new Rule('.SansTypo.Summary .Cover.as-Instructions', {
	paddingTop: '18vh',
});

export default cover;

exports(cover).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Summary/Styles/cover');
