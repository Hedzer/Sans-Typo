
//Classes
import Identity from 'JSUI/Source/1.0.0/Classes/Core/Identity';
import Span from 'JSUI/Source/1.0.0/Classes/Elements/Span';

//Constants
import settings from 'SansTypo/Source/1.0.0/Constants/settings';

//Components
import Letter from 'SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Word';

//Utilities
import exports from 'Parcello/exports';

const identity = new Identity({
	namespace: settings.namespace,
	class: 'Word',
	major: 1, minor: 0, patch: 0,
});

class Word extends Span {
	constructor() {
		super();
		this.identity = identity;
	}
	revise(correctWord) {
		let text = this.text()
		let length = (correctWord.length > text.length ? text.length : correctWord.length);
		let letters = [];
		for (let i = 0; i < length; i++) {
			let letter = new Letter();
			letter.text(text.charAt(i));
			letter.isIncorrect = (text.charAt(i) !== correctWord.charAt(i));
			letters.push(letter);
		}
		this.element.innerHTML = '';
		this.add(letters);
	}
}

export default Word;

exports(Word).as('SansTypo/Source/1.0.0/Components/TypeSpeed/Tester/Word');
