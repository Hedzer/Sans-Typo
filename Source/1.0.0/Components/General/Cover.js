
//Classes
import Identity from 'JSUI/Source/1.0.0/Classes/Core/Identity';
import Div from 'JSUI/Source/1.0.0/Classes/Elements/Div';

//Constants
import settings from 'SansTypo/Source/1.0.0/Constants/settings';

//Styles
import framing from 'SansTypo/Source/1.0.0/Components/General/Cover/Styles/framing';
import theme from 'SansTypo/Source/1.0.0/Components/General/Cover/Styles/theme';

//Utilities
import exports from 'Parcello/exports';

const identity = new Identity({
	namespace: settings.namespace,
	class: 'Cover',
	major: 1, minor: 0, patch: 0,
});

const IN = 'fadeIn';
const OUT = 'fadeOut';
const NONINTERACTIVE = 'non-interactive';
const ALL = [ IN, OUT ];

class Cover extends Div {
	constructor() {
		super();
		this.identity = identity;
	}

	construct_structure() {
		this.class('animated').add();
	}
	construct_style() {
		this.add(framing);
		this.add(theme);
	}
	construct_relationships() {
		this.fadeIn();

		this.on('animationend', () => {
			let action = (this.class(OUT).exists() ? 'add' : 'remove');
			this.class(NONINTERACTIVE)[action]();
		});
	}

	fadeIn() {
		this.class(NONINTERACTIVE).remove();
		this.class(IN).add();
		this.class(OUT).remove();
	}
	fadeOut() {
		this.class(IN).remove();
		this.class(OUT).add();
	}
}

export default Cover;

exports(Cover).as('SansTypo/Source/1.0.0/Components/General/Cover');
