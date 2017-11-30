
//Classes
import Div from 'JSUI/Source/1.0.0/Classes/Elements/Div';
import Identity from 'JSUI/Source/1.0.0/Classes/Core/Identity';
import JFunction from 'JSUI/Source/1.0.0/Classes/Core/Function';

//Constants
import settings from 'SansTypo/Source/1.0.0/Constants/settings';

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

class Writer extends Div {
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

		//allowDeletions & cursorMovement
		this.on('keydown', (e) => {
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

		this.on('mouseover', () => {
			this.element.focus();
			let position = this.element.textContent.length;
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

	get wordCount() {
		return this.words.length;
	}

	get words() {
		let text = this.element.textContent;
		if (!text || !text.length) { return []; }
		let words = text.split(' ');
		return words;
	}

	get characters() {
		let text = this.element.textContent;
		if (!text || !text.length) { return []; }
		let characters = text.split('');
		return characters;
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

	get expects() {
		return this.state('expects');
	}
	set expects(value) {
		this.state('expects', value);
	}

	// defaults
	static get allowDeletions() {
		return false;
	}
	
	static get allowCursorSet() {
		return false;
	}

	static get allowCheating() {
		return false;
	}

}

export default Writer;

exports(Writer).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Writer');
