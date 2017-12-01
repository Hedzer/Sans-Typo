
//Classes
import Identity from 'JSUI/Source/1.0.0/Classes/Core/Identity';
import Navigation from 'JSUI/Source/1.0.0/Classes/Core/Navigation';

//Constants
import settings from 'SansTypo/Source/1.0.0/Constants/settings';

//Styles
import framing from 'SansTypo/Source/1.0.0/Components/General/AppTitle/Styles/framing';
import theme from 'SansTypo/Source/1.0.0/Components/General/AppTitle/Styles/theme';

//Utilities
import exports from 'Parcello/exports';

const identity = new Identity({
	namespace: settings.namespace,
	class: 'AppTitle',
	major: 1, minor: 0, patch: 0,
});

class AppTitle extends Navigation {
	constructor() {
		super();
		this.identity = identity;
	}

	construct_structure() {
		this.text('Sans Typo');
	}
	construct_style() {
		this.add(framing);
		this.add(theme);
	}
}

export default AppTitle;

exports(AppTitle).as('SansTypo/Source/1.0.0/Components/General/AppTitle');
