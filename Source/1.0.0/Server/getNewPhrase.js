
export default function getNewPhrase() { // set up to mock random latency
	return new Promise( resolve => {
		setTimeout(() => {
			resolve("this is a test quote");
		}, Math.random() * 200);
	})
}
