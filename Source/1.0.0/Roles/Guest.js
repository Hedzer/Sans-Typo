
//Classes
import Identity from 'JSUI/Source/1.0.0/Classes/Core/Identity';
import Role from 'JSUI/Source/1.0.0/Classes/Core/Role';

//Constants
import settings from 'SansTypo/Source/1.0.0/Constants/settings';

//Features
import TypeSpeed from 'SansTypo/Source/1.0.0/Features/TypeSpeed';

//Utilities
import exports from 'Parcello/exports';

const identity = new Identity({
	namespace: settings.namespace,
	class: 'Guest',
	major: 1, minor: 0, patch: 0,
});

class Guest extends Role {
	constructor() {
		super();
		this.identity = identity;
		this.construct('features');
	}

	// methods
	construct_features() {
		this.add([ TypeSpeed ]);
	}
	

	// defaults
	static get route() {
		return 'Guest';
	}
	static get subroutes() {
		return [ TypeSpeed ];
	}
}

export default Guest;

exports(Guest).as('SansTypo/Source/1.0.0/Roles/Guest');
