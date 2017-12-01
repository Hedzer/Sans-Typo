
//Classes
import Identity from 'JSUI/Source/1.0.0/Classes/Core/Identity';
import JFunction from 'JSUI/Source/1.0.0/Classes/Core/Function';
import Page from 'JSUI/Source/1.0.0/Classes/Core/Page';

//Components
import Reader from 'SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Reader';
import Summary from 'SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Summary';
import Writer from 'SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Writer';

//Constants
import settings from 'SansTypo/Source/1.0.0/Constants/settings';

//Features
import SpeedGame from 'SansTypo/Source/1.0.0/Features/TypeSpeed/SpeedGame';

//Server
import getNewPhrase from 'SansTypo/Source/1.0.0/Server/getNewPhrase';

//Styles
import framing from 'SansTypo/Source/1.0.0/Pages/TypeSpeed/Tester/Styles/framing';
import theme from 'SansTypo/Source/1.0.0/Pages/TypeSpeed/Tester/Styles/theme';
import reader from 'SansTypo/Source/1.0.0/Pages/TypeSpeed/Tester/Styles/reader';
import summary from 'SansTypo/Source/1.0.0/Pages/TypeSpeed/Tester/Styles/summary';
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
		this.add(new Summary()).as('Summary');
		this.add(new Writer()).as('Writer');
	}
	//styles the elements built in the structural constructor
	construct_style() {
		this.add([
			framing,
			theme,
			reader,
			summary,
			writer,
		]);
	}
	//assigns unique relationships to the structure
	construct_relationships() {

		let game = new SpeedGame();
		this.Game = game;

		//on key pressed, begin the game
		let summary = this.Summary;
		let writer = this.Writer;
		let summarize = new JFunction(() => { this.summarize(); }).throttle(5);

		writer.on(['keypress', 'keyup'], () => {
			if (game.hasEnded) { return; }

			if (!game.isInProgress) {
				game.begin();
				return;
			}

			if (writer.text().length === this.phrase.length) {
				game.end();
				return;
			}

			summarize.execute();
		});

		game.on('begin', () => {
			writer.enabled = true;
			summarize.execute();
		});

		game.on('tick', () => {
			summarize.execute();
		});

		game.on('end', () => {
			writer.enabled = false;
			writer.grade();
			summarize.execute();
		});

		summary.on('coverStatusChanged', () => {
			writer.element.focus();
		});

		summary.on('newRoundRequested', () => {
			this.newRound();
		});

		this.newRound();

	}

	newPhrase() {
		getNewPhrase().then((phrase) => {
			this.phrase = phrase;
		});
	}
	newRound() {
		this.reset();
		this.newPhrase();
	}
	summarize() {
		let summary = this.Summary;
		let writer = this.Writer;
		let game = this.Game

		let written = writer.text();
		summary.set({
			elapsedSeconds: game.elapsedSeconds,
			writtenCharCount: written.length,
			writtenWordCount: writer.wordCount,
			typedCount: writer.typedCount,
			errorCount: writer.errorCount,
		});

	}
	reset() {
		this.Game.reset();
		this.Summary.reset();
		this.Writer.reset();
	}

	get Game() {
		return this.state('Game');
	}
	set Game(value) {
		this.state('Game', value);
	}

	get phrase() {
		return this.state('phrase');
	}
	set phrase(value) {
		this.Reader.phrase = value;
		this.Writer.phrase = value;
		this.Summary.set({
			phrase: value,
			totalCharCount: value.length,
			totalWordCount: value.split('\s').length,
		});
		this.state('phrase', value);
	}

	// defaults
	static get route() {
		return 'Tester';
	}
}

export default Tester;

exports(Tester).as('SansTypo/Source/1.0.0/Pages/TypeSpeed/Tester');
