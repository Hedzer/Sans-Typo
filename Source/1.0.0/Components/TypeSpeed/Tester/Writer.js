
//Classes
import Div from 'JSUI/Source/1.0.0/Classes/Elements/Div';
import Identity from 'JSUI/Source/1.0.0/Classes/Core/Identity';

//Constants
import settings from 'SansTypo/Source/1.0.0/Constants/settings';

//Mixins
import Enableable from 'JSUI/Source/1.0.0/Mixins/Enableable';

//Styles
import framing from 'SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Writer/Styles/framing';
import theme from 'SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Writer/Styles/theme';

//Utilities
import exports from 'Parcello/exports';

const identity = new Identity({
	namespace: settings.namespace,
	class: 'Writer',
	major: 1, minor: 0, patch: 0,
});

const BACKSPACE = 8;
const DEL = 46;
const LEFT = 37, UP = 38, RIGHT = 39, DOWN = 40;

const DELETE_KEYS = [ BACKSPACE, DEL ];
const CURSOR_KEYS = [ LEFT, UP, RIGHT, DOWN ];
const CHEAT_EVENTS = ['mousedown', 'mouseup', 'paste', 'drag', 'dragstart', 'dragend', 'dragover', 'dragenter', 'dragleave', 'drop'];

class Writer extends Div.implements(Enableable) {
	constructor() {
		super();
		this.identity = identity;
	}
	
	construct_structure() {
		this.attribute('contentEditable', true);
	}
	construct_style() {
		this.add(framing);
		this.add(theme);
	}
	construct_relationships() {

		this.on('keypress', (e) => {
			if (!this.enabled) { return e.preventDefault(); }

			// check typed vs errors
			let code = (e.which || e.keyCode || e.charCode);
			let expected = this.getExpectedNext();
			this.typedCount++;
			if (expected !== code) { this.errorCount++; }
		});

		//allowDeletions & cursorMovement
		this.on('keydown', (e) => {
			if (!this.enabled) { return e.preventDefault(); }

			//check for deletions & caret moves
			let code = (e.which || e.keyCode || e.charCode);
			let deletionsAllowed = this.allowDeletions || !DELETE_KEYS.includes(code);
			let cursorMovingAllowed = this.allowCursorSet || !CURSOR_KEYS.includes(code);
			if (deletionsAllowed && cursorMovingAllowed) { return; }

			e.preventDefault();
		});

		//allow clicking for cursor position
		this.on(CHEAT_EVENTS, (e) => {
			this.trigger('cheating', e);
			if (this.allowCheating) { return; }

			e.preventDefault();
		});

		this.on('mouseover', (e) => {
			if (!this.enabled) { return; }

			this.element.focus();
			let position = this.text().length;
			this.setCursor(position);
		});
	}

	setCursor(index) {
		let range = document.createRange();
		let selection = window.getSelection();
		let textNode = this.element.firstChild;
		if (!textNode) { return; }

		range.setStart(textNode, index);
		range.setEnd(textNode, index);
		range.collapse(true);
		selection.removeAllRanges();
		selection.addRange(range);
	}
	reset() {
		this.text('');
		this.typedCount = 0;
		this.errorCount = 0;
		this.enabled = true;
	}
	//override, contentEditable messes with things
	text(text) {
		if (!arguments.length) {
			return this.element.textContent;
		}

		this.element.textContent = text;
	}

	getExpectedNext() {
		let text = this.text();
		let phrase = this.phrase;
		if (text.length >= phrase.length) { return false; }
		return phrase.charCodeAt(text.length);
	}

	get phrase() {
		return this.state('phrase');
	}
	set phrase(value) {
		this.state('phrase', value);
	}

	get wordCount() {
		return this.words.length;
	}

	get words() {
		let text = this.text();
		if (!text || !text.length) { return []; }
		let words = text.split(' ');
		return words;
	}

	get characters() {
		let text = this.text();
		if (!text || !text.length) { return []; }
		let characters = text.split('');
		return characters;
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

	get allowDeletions() {
		return this.state('allowDeletions');
	}
	set allowDeletions(value) {
		this.state('allowDeletions', !!value);
	}

	get allowCursorSet() {
		return this.state('allowCursorSet');
	}
	set allowCursorSet(value) {
		this.state('allowCursorSet', !!value);
	}

	get allowCheating() {
		return this.state('allowCheating');
	}
	set allowCheating(value) {
		this.state('allowCheating', !!value);
	}

	// defaults
	static get allowDeletions() {
		return true;
	}
	
	static get allowCursorSet() {
		return false;
	}

	static get allowCheating() {
		return false;
	}

	static get typedCount() {
		return 0;
	}

	static get errorCount() {
		return 0;
	}

}

export default Writer;

exports(Writer).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Writer');
