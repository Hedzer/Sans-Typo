
//Data
import quotes from 'SansTypo/Data/quotes';

export default function getNewPhrase() { // set up to mock random latency
	return new Promise( resolve => {
		setTimeout(() => {
			let random = Math.ceil(Math.random() * quotes.length + 1) % quotes.length;
			let quote = quotes[random];
			resolve(quote);
		}, Math.random() * 200);
	})
}
