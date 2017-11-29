
//Classes
import Identity from 'JSUI/Source/1.0.0/Classes/Core/Identity';
import Page from 'JSUI/Source/1.0.0/Classes/Core/Page';

//Components
import Reader from 'SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Reader';
import Stats from 'SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Stats';
import Writer from 'SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Writer';

//Constants
import settings from 'SansTypo/Source/1.0.0/Constants/settings';

//Server
import getNewPhrase from 'SansTypo/Source/1.0.0/Server/getNewPhrase';

//Styles
import framing from 'SansTypo/Source/1.0.0/Pages/TypeSpeed/Tester/Styles/framing';
import theme from 'SansTypo/Source/1.0.0/Pages/TypeSpeed/Tester/Styles/theme';
import reader from 'SansTypo/Source/1.0.0/Pages/TypeSpeed/Tester/Styles/reader';
import stats from 'SansTypo/Source/1.0.0/Pages/TypeSpeed/Tester/Styles/stats';
import writer from 'SansTypo/Source/1.0.0/Pages/TypeSpeed/Tester/Styles/writer';

//Utilities
import exports from 'Parcello/exports';

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

	//builds the structural elements in the page
	construct_structure() {
		this.add(new Reader()).as('Reader');
		this.add(new Stats()).as('Stats');
		this.add(new Writer()).as('Writer');
	}
	//styles the elements built in the structural constructor
	construct_style() {
		this.add([
			framing,
			theme,
			reader,
			stats,
			writer,
		]);
	}
	//assigns unique relationships to the structure
	construct_relationships() {
		this.getNewPhrase();
	}

	getNewPhrase() {
		getNewPhrase().then((phrase) => {
			this.Reader.text(phrase);
		});
	}

	// defaults
	static get route() {
		return 'Tester';
	}
}

export default Tester;

exports(Tester).as('SansTypo/Source/1.0.0/Pages/TypeSpeed/Tester');
