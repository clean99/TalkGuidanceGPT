import { createTextToSpeechFunction } from './sound/read';
import {  getEnabled, getLang, getRate, setEnabled, setLang, setRate } from './storage';
import { Lang, langArray } from './types/interface';
import { getTabId } from './utils/utils';

// call when extension onload
chrome.runtime.onInstalled.addListener(async () => {
	await setLang(Lang.English);
	await setRate(0.8);
	await setEnabled(true);
});

chrome.tabs.onActivated.addListener(async () => {
	const enabled = await getEnabled();
	chrome.tabs.sendMessage(await getTabId(), { action: enabled ? 'enable' : 'disable' });
});

chrome.runtime.onMessage.addListener(async function (request: any, sender: chrome.runtime.MessageSender) {
	const textToSpeech = createTextToSpeechFunction(await getLang(), await getRate());
	await textToSpeech(request.message);
});
console.log(langArray.map((lang) => lang.label));