
//Data
import quotes from 'SansTypo/Data/quotes';

//Utilities
import exports from 'Parcello/exports';

export default function getNewPhrase() { // set up to mock random latency
	return new Promise( resolve => {
		setTimeout(() => {
			let random = Math.ceil(Math.random() * quotes.length + 1) % quotes.length;
			let quote = quotes[random];
			resolve(quote);
		}, Math.random() * 200);
	})
}

exports(getNewPhrase).as('SansTypo/Source/1.0.0/Server/getNewPhrase');
