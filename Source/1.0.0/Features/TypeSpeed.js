
//Classes
import Identity from 'JSUI/Source/1.0.0/Classes/Core/Identity';
import Feature from 'JSUI/Source/1.0.0/Classes/Core/Feature';

//Constants
import settings from 'SansTypo/Source/1.0.0/Constants/settings';

//Pages
import Tester from 'SansTypo/Source/1.0.0/Pages/TypeSpeed/Tester';

//Utilities
import exports from 'Parcello/exports';

const identity = new Identity({
	namespace: settings.namespace,
	class: 'TypeSpeed',
	major: 1, minor: 0, patch: 0,
});

class TypeSpeed extends Feature {
	constructor() {
		super();
		this.identity = identity;
		this.construct('pages');
	}
	
	// methods
	construct_pages() {
		this.add([ Tester ]);
	}

	// defaults
	static get route() {
		return 'TypeSpeed';
	}
	static get subroutes() {
		return [ Tester ];
	}
}

export default TypeSpeed;

exports(TypeSpeed).as('SansTypo/Source/1.0.0/Features/TypeSpeed');
