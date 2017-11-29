
//Classes
import Identity from 'JSUI/Source/1.0.0/Classes/Core/Identity';
import Page from 'JSUI/Source/1.0.0/Classes/Core/Page';

//Constants
import settings from 'SansTypo/Source/1.0.0/Constants/settings';

const identity = new Identity({
	namespace: settings.namespace,
	class: 'Tester',
	major: 1, minor: 0, patch: 0,
});

class Tester extends Page {
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

exports(Tester).as('SansTypo/Source/1.0.0/Pages/TypeSpeed/Tester');
