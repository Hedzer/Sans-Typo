
//Classes
import Rule from 'JSUI/Source/1.0.0/Classes/Style/SheetRule';

//Utilities
import exports from 'Parcello/exports';

let selector = '.SansTypo.Letter';
let incorrect = `${selector}.is-incorrect`;

let theme = new Rule(incorrect, {
	backgroundColor: '#ffcccc',
	borderRadius: '0px',
});

let leftHighlight = new Rule(`${selector}:not(.is-incorrect) + ${incorrect}`, {
	borderBottomLeftRadius: '2px',
	borderTopLeftRadius: '2px',
});

let rightHighlight = new Rule(`${incorrect}.is-right-end`, {
	borderBottomRightRadius: '2px',
	borderTopRightRadius: '2px',
});


let exported = [ theme, leftHighlight, rightHighlight ];

export default exported;

exports(exported).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Letter/Styles/theme');
