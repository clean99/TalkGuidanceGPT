// Function to create a text-to-speech function with given language and speed
function createTextToSpeechFunction (lang: string, rate: number) {
	// Return a function that takes text as input and reads it using the specified language and speed
	return async function (text: string) {
		let finishedPromiseResolve: (value?: unknown) => void;
		const finishedPromise = new Promise((resolve) => {
			finishedPromiseResolve = resolve;
		});
		const options = {
			lang,
			rate,
			onEvent: function (event: any) {
				if (event.type === 'end' || event.type === 'interrupted' || event.type === 'cancelled') {
					finishedPromiseResolve?.();
				}
			}
		};

		chrome.tts.speak(text, options);

		// return when the text is finished being read
		return await finishedPromise;
	};
}

export {
	createTextToSpeechFunction
};
