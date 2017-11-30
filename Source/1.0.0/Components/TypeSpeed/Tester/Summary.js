
//Classes
import Div from 'JSUI/Source/1.0.0/Classes/Elements/Div';
import Identity from 'JSUI/Source/1.0.0/Classes/Core/Identity';

//Constants
import settings from 'SansTypo/Source/1.0.0/Constants/settings';

//Styles
import framing from 'SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Summary/Styles/framing';
import theme from 'SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Summary/Styles/theme';

//Utilities
import exports from 'Parcello/exports';

const identity = new Identity({
	namespace: settings.namespace,
	class: 'Summary',
	major: 1, minor: 0, patch: 0,
});

class Summary extends Div {
	constructor() {
		super();
		this.identity = identity;
	}
	
	construct_structure() {

	}
	construct_style() {
		this.add(framing);
		this.add(theme);
	}
	construct_relationships() {

	}
}

export default Summary;

exports(Summary).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Summary');
