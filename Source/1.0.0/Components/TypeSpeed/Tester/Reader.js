
//Classes
import Div from 'JSUI/Source/1.0.0/Classes/Elements/Div';
import Identity from 'JSUI/Source/1.0.0/Classes/Core/Identity';

//Constants
import settings from 'SansTypo/Source/1.0.0/Constants/settings';

//Utilities
import exports from 'Parcello/exports';

const identity = new Identity({
	namespace: settings.namespace,
	class: 'Reader',
	major: 1, minor: 0, patch: 0,
});

class Reader extends Div {
	constructor() {
		super();
		this.identity = identity;
	}
	
	construct_structure() {

	}
	construct_style() {

	}
	construct_relationships() {

	}
}

export default Reader;

exports(Reader).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Reader');
