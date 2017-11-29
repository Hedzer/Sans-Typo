
//Classes
import Identity from 'JSUI/Source/1.0.0/Classes/Core/Identity';
import Span from 'JSUI/Source/1.0.0/Classes/Elements/Span';

//Constants
import settings from 'SansTypo/Source/1.0.0/Constants/settings';

//Utilities
import exports from 'Parcello/exports';

const identity = new Identity({
	namespace: settings.namespace,
	class: 'Words',
	major: 1, minor: 0, patch: 0,
});

class Words extends Span {
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

export default Words;

exports(Words).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Words');
