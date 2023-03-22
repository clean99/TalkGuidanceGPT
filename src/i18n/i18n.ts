import { Lang } from '../types/interface';

export const I18NMap = new Map<string, Map<Lang, string>>();


export const i18n = (key: string, lang: Lang) => {
	if(!I18NMap.has(key)) {
		return key;
	}
	const map = I18NMap.get(key);
	if(!map) {
		return key;
	}
	const value = map.get(lang);
	if(!value) {
		const englishFallback = map.get(Lang.English);
		if(!englishFallback) {
			return key;
		}
		return englishFallback;
	}
	return value;
};

export function install(lang: Lang, translations: Map<string, string>, I18NMap: Map<string, Map<Lang, string>>) {
	for (const [key, translation] of translations) {
		let langMap = I18NMap.get(key);
  
		if (!langMap) {
			langMap = new Map<Lang, string>();
			I18NMap.set(key, langMap);
		}
  
		langMap.set(lang, translation);
	}
}


