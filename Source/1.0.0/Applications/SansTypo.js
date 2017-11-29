
//Classes
import Application from 'JSUI/Source/1.0.0/Classes/Core/Application';
import Identity from 'JSUI/Source/1.0.0/Classes/Core/Identity';
import Tester from 'SansTypo/Source/1.0.0/Pages/TypeSpeed/Tester';

//Constants
import settings from 'SansTypo/Source/1.0.0/Constants/settings';

//Roles
import Guest from 'SansTypo/Source/1.0.0/Roles/Guest';

//Utilities
import exports from 'Parcello/exports';

const identity = new Identity({
	namespace: settings.namespace,
	class: 'SansTypo',
	major: 1, minor: 0, patch: 0,
});

class SansTypo extends Application {
	constructor() {
		super();
		this.identity = identity;
		this.construct('roles');
	}

	// methods
	construct_roles() {
		this.add([ Guest ]);
	}

	// defaults
	static get route() {
		return 'SansTypo';
	}
	static get subroutes() {
		return [ Guest ];
	}
	static get Page() {
		return Tester;
	}
}

export default SansTypo;

exports(SansTypo).as('SansTypo/Source/1.0.0/Applications/SansTypo');
