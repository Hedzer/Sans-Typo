
//Classes
import Identity from 'JSUI/Source/1.0.0/Classes/Core/Identity';
import Span from 'JSUI/Source/1.0.0/Classes/Elements/Span';

//Constants
import settings from 'SansTypo/Source/1.0.0/Constants/settings';

//Utilities
import exports from 'Parcello/exports';

const identity = new Identity({
	namespace: settings.namespace,
	class: 'Letter',
	major: 1, minor: 0, patch: 0,
});

class Letter extends Span {
	constructor() {
		super();
		this.identity = identity;
	}

	get isIncorrect() {
		return this.state('isIncorrect');
	}
	set isIncorrect(value) {
		value = !!value;
		let hasChanged = this.state('isIncorrect', value);
		if (hasChanged) {
			let action = value ? 'add' : 'remove';
			this.class('is-incorrect')[action]();
		}
	}
}

export default Letter;

exports(Letter).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Letter');
