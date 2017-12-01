
//Classes
import Identity from 'JSUI/Source/1.0.0/Classes/Core/Identity';
import Span from 'JSUI/Source/1.0.0/Classes/Elements/Span';

//Constants
import settings from 'SansTypo/Source/1.0.0/Constants/settings';

//Styles
import framing from 'SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Letter/Styles/framing';
import theme from 'SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Letter/Styles/theme';

//Utilities
import exports from 'Parcello/exports';

const identity = new Identity({
	namespace: settings.namespace,
	class: 'Letter',
	major: 1, minor: 0, patch: 0,
});

class Letter extends Span {
	constructor(char) {
		super();
		this.identity = identity;
		this.text(char);
	}

	construct_style() {
		this.add(framing);
		this.add(theme);
	}

	get isIncorrect() {
		return this.state('isIncorrect');
	}
	set isIncorrect(value) {
		value = !!value;
		let hasChanged = this.state('isIncorrect', value);
		if (hasChanged) {
			let action = (value ? 'add' : 'remove');
			this.class('is-incorrect')[action]();
		}
	}

	get isRightEnd() {
		return this.state('isRightEndling');
	}
	set isRightEnd(value) {
		value = !!value;
		let hasChanged = this.state('isRightEnd', value);
		if (hasChanged) {
			let action = (value ? 'add' : 'remove');
			this.class('is-right-end')[action]();
		}
	}

}

export default Letter;

exports(Letter).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Letter');
