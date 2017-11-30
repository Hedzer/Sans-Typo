
//Classes
import Rule from 'JSUI/Source/1.0.0/Classes/Style/SheetRule';

//Utilities
import exports from 'Parcello/exports';

const selector = '.SansTypo.Writer';

let theme = new Rule(selector, {
	backgroundColor: 'white',
	fontFamily: '"Inconsolata", monospace',
	color: '#646464',
});

let noFocus = new Rule(`${selector}:focus`, {
    outline: 'none',
});

const out = [ theme, noFocus ]

export default out;

exports(out).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Writer/Styles/theme');
