
//Classes
import Rule from 'JSUI/Source/1.0.0/Classes/Style/SheetRule';

//Utilities
import exports from 'Parcello/exports';

let penalizer = new Rule('.SansTypo.Page.Tester .Cover.as-Penalizer', {
	backgroundImage: 'url("Assets/Images/cheating.gif")',
	backgroundRepeat: 'no-repeat',
	backgroundPosition: 'center',
    lineHeight: 'calc(100vh + 300px)',
    padding: 0,
    textTransform: 'uppercase',
});

export default penalizer;

exports(penalizer).as('SansTypo/Source/1.0.0/Pages/TypeSpeed/Tester/Styles/penalizer');
