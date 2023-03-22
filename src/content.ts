import * as _ from 'lodash';
import { registerVoiceInstructions } from './dom/domEventListener';
import { getEnabled } from './storage';
import { report } from './report';

let destroy: any;

(async () => {
	if(await getEnabled() && !destroy) {
		destroy = await registerVoiceInstructions(window, report);
	}
})();

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
	if (message.action === 'enable' && !destroy) {
		destroy = await registerVoiceInstructions(window, report);
	} else if (message.action === 'disable' && destroy) {
		destroy();
		destroy = null;
	}
});

