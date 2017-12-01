
//Classes
import Rule from 'JSUI/Source/1.0.0/Classes/Style/SheetRule';

//Utilities
import exports from 'Parcello/exports';

const selector = '.SansTypo.Stat';

let theme = new Rule(selector, {
	backgroundColor: 'white',
	color: '#646464',
	border: 'solid 1px #dcdcdc',
	borderRadius: '4px',
	userSelect: 'none',
});

let info = new Rule(`${selector} .as-Title`, {
	borderBottom: 'solid 1px #cccccc',
});

export default [ theme, info ];

exports(theme).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Summary/Styles/theme');
