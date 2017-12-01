
//Classes
import Identity from 'JSUI/Source/1.0.0/Classes/Core/Identity';
import Div from 'JSUI/Source/1.0.0/Classes/Elements/Div';

//Constants
import settings from 'SansTypo/Source/1.0.0/Constants/settings';

//Styles
import framing from 'SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Stat/Styles/framing';
import theme from 'SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Stat/Styles/theme';

//Utilities
import exports from 'Parcello/exports';

const identity = new Identity({
	namespace: settings.namespace,
	class: 'Stat',
	major: 1, minor: 0, patch: 0,
});

class Stat extends Div {
	constructor() {
		super();
		this.identity = identity;
	}

	construct_structure() {
		this.add(new Div()).as('Title');
		this.add(new Div()).as('Info');
	}
	construct_style() {
		this.add(framing);
		this.add(theme);
	}

	get title() {
		return this.state('title');
	}
	set title(value) {
		this.state('title', value);
		this.Title.text(value);
	}

	get info() {
		return this.state('info');
	}
	set info(value) {
		this.state('info', value);
		this.Info.text(value);
	}
}

export default Stat;

exports(Stat).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Stat');
