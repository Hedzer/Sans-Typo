
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

let seconds = new Rule(`${selector} .Stat.as-TimeInSeconds .as-Title`, {
	backgroundColor: '#f5f8fa',
});

let wpm = new Rule(`${selector} .Stat.as-WordsPerMinute .as-Title`, {
	backgroundColor: '#f6faf5',
});

let keysPressed = new Rule(`${selector} .Stat.as-KeysPressed .as-Title`, {
	backgroundColor: '#f5f5fa',
});

let errors = new Rule(`${selector} .Stat.as-Errors .as-Title`, {
	backgroundColor: '#faf5f6',
});

let errorRate = new Rule(`${selector} .Stat.as-ErrorRate .as-Title`, {
	backgroundColor: '#faf9f5',
});

let newRound = new Rule(`${selector} .Button.as-NewRound`, {
	backgroundColor: '#e8fbd5',
	borderRadius: '4px',
	color: '#646464',
	cursor: 'pointer',
	borderStyle: 'solid',
	outline: 'none',
});

let newRoundActive = new Rule(`${selector} .Button.as-NewRound:active`, {
	backgroundColor: '#dbf9be',
});

let exported = [ theme, seconds, wpm, keysPressed, errors, errorRate, newRound, newRoundActive ];

export default exported;

exports(exported).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Summary/Styles/theme');
