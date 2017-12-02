
//Classes
import Button from 'JSUI/Source/1.0.0/Classes/Elements/Button';
import Div from 'JSUI/Source/1.0.0/Classes/Elements/Div';
import Identity from 'JSUI/Source/1.0.0/Classes/Core/Identity';
import JFunction from 'JSUI/Source/1.0.0/Classes/Core/Function';

//Constants
import settings from 'SansTypo/Source/1.0.0/Constants/settings';

//Components
import Stat from 'SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Stat';
import Cover from 'SansTypo/Source/1.0.0/Components/General/Cover';

//Styles
import framing from 'SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Summary/Styles/framing';
import cover from 'SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Summary/Styles/cover';
import theme from 'SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Summary/Styles/theme';

//TypeChecks
import isString from 'JSUI/Source/1.0.0/TypeChecks/isString';

//Utilities
import exports from 'Parcello/exports';

const identity = new Identity({
	namespace: settings.namespace,
	class: 'Summary',
	major: 1, minor: 0, patch: 0,
});

const MIN = 60;

const DEFAULTS = {
	TimeInSeconds: {
		title: 'Seconds',
		info: '0.0',
	},
	WordCount: {
		title: 'Word Count',
		info: '0',
	},
	WordsPerMinute: {
		title: 'Words Per Minute',
		info: '0.0',
	},
	LettersTyped: {
		title: 'Letters Typed',
		info: '0',
	},
	Errors: {
		title: 'Errors',
		info: '0',
	},
	ErrorRate: {
		title: 'Error Rate',
		info: '0.0%',
	},
};

class Summary extends Div {
	constructor() {
		super();
		this.identity = identity;
	}
	
	construct_structure() {
		this.add(new Stat()).as('TimeInSeconds')
			.set(DEFAULTS.TimeInSeconds);

		this.add(new Stat()).as('WordCount')
			.set(DEFAULTS.WordCount);

		this.add(new Stat()).as('WordsPerMinute')
			.set(DEFAULTS.WordsPerMinute);

		this.add(new Stat()).as('LettersTyped')
			.set(DEFAULTS.LettersTyped);

		this.add(new Stat()).as('Errors')
			.set(DEFAULTS.Errors);

		this.add(new Stat()).as('ErrorRate')
			.set(DEFAULTS.ErrorRate);

		this.add(new Cover()).as('Instructions')
			.text('Start typing sample text to begin test');

		this.add(new Button()).as('NewRound')
			.text('New Round');
	}
	construct_style() {
		this.add(framing);
		this.add(theme);
		this.add(cover);
	}
	construct_relationships() {
		let changes = [ 'elapsedSeconds', 'writtenWordCount', 'typedCount', 'errorCount', 'writtenCharCount', 'phrase' ]
			.map( (s) => { return `${s}Changed`; });

		// recalculate on any change, throttled
		let calculate = new JFunction(() => { this.calculate(); }).throttle(5);
		this.on(changes, () => { calculate.execute() });

		// on typed count change, remove cover
		this.on('typedCountChanged', () => {
			this.Instructions.fadeOut();
		});

		// general cover changed event, this will also help set focus, as it only happens once the page is fully visible.
		// since there is no "on dom inserted" and page load is async, this event can be used to simulate that.
		this.Instructions.on('animationstart', () => {
			this.trigger('coverStatusChanged');
		});

		// forward the click as the intent for a new round
		this.NewRound.on('click', () => {
			this.trigger('newRoundRequested');
		});
	}

	calculate() {
		let writtenWordCount = this.writtenWordCount;
		let seconds = this.elapsedSeconds || 0;
		let errors = this.errorCount || 0;
		let charsTyped = this.typedCount || 0;
		let writtenCharCount = this.writtenCharCount || 0;
		let errorRate = (charsTyped && errors ? (errors / charsTyped * 100).toFixed(2) : '0.00');

		let wordsPerMinute = (writtenWordCount && seconds ? writtenWordCount / seconds : 0) * MIN;
		this.TimeInSeconds.info = seconds.toFixed(1);
		this.WordCount.info = writtenWordCount;
		this.WordsPerMinute.info = wordsPerMinute.toFixed(1);
		this.LettersTyped.info = charsTyped;
		this.Errors.info = errors;
		this.ErrorRate.info = `${errorRate}%`;
	}

	get phrase() {
		return this.state('phrase');
	}
	set phrase(value) {
		if (!isString(value)) { return; }

		let changed = this.state('phrase', value);
		if (!changed) { return; }

		this.totalCharCount = value.length;
		this.totalWordCount = value.split('\s').length;
	}

	get elapsedSeconds() {
		return this.state('elapsedSeconds');
	}
	set elapsedSeconds(value) {
		this.state('elapsedSeconds', value);
	}

	get writtenWordCount() {
		return this.state('writtenWordCount');
	}
	set writtenWordCount(value) {
		this.state('writtenWordCount', value);
	}

	get totalWordCount() {
		return this.state('totalWordCount');
	}
	set totalWordCount(value) {
		this.state('totalWordCount', value);
	}

	get writtenCharCount() {
		return this.state('writtenCharCount');
	}
	set writtenCharCount(value) {
		this.state('writtenCharCount', value);
	}

	get totalCharCount() {
		return this.state('totalCharCount');
	}
	set totalCharCount(value) {
		this.state('totalCharCount', value);
	}

	get typedCount() {
		return this.state('typedCount');
	}
	set typedCount(value) {
		this.state('typedCount', value);
	}

	get errorCount() {
		return this.state('errorCount');
	}
	set errorCount(value) {
		this.state('errorCount', value);
	}


	reset() {
		this.Instructions.fadeIn();
		// reset the stats
		Object.keys(DEFAULTS).forEach((key) => {
			this[key].set(DEFAULTS[key]);
		});
	}
}

export default Summary;

exports(Summary).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Summary');
