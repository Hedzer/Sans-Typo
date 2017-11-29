
//Classes
import Div from 'JSUI/Source/1.0.0/Classes/Elements/Div';
import Identity from 'JSUI/Source/1.0.0/Classes/Core/Identity';

//Constants
import settings from 'SansTypo/Source/1.0.0/Constants/settings';

const identity = new Identity({
	namespace: settings.namespace,
	class: 'Stats',
	major: 1, minor: 0, patch: 0,
});

class Stats extends Div {
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

export default Stats;

exports(Stats).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Stats');