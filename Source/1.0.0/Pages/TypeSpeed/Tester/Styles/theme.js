
//Classes
import Rule from 'JSUI/Source/1.0.0/Classes/Style/SheetRule';

//Utilities
import exports from 'Parcello/exports';

let penalizer = new Rule('.SansTypo.Page.Tester .Cover.as-Penalizer', {
	backgroundImage: 'url("Assets/Images/cheating.gif")',
	backgroundRepeat: 'no-repeat',
	backgroundPosition: 'center',
});

export default penalizer;

exports(penalizer).as('SansTypo/Source/1.0.0/Pages/TypeSpeed/Tester/Styles/theme');
