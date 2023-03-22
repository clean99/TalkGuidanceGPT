export const actionsArr = [
  'click',
  'double click',
  'type',
  'enter'
]

export interface Actions {
  actions: string[]
  elements: PrunedElement[]
}

export interface ProcessedAction {
  role?: string
  type?: string
  title?: string
  placeholder?: string
  name?: string
  alt?: string
  action: string
  payload?: string
}

export interface PrunedElement {
  role?: string
  type?: string
  placeholder?: string
  name?: string
  alt?: string
  title?: string
  ariaLabel?: string
  ariaLabelledBy?: string
  ariaDescribedBy?: string
  ariaDescription?: string
  id?: string
  class?: string
  tagName?: string
  disabled?: boolean
  checked?: boolean
  selected?: boolean
}

export enum Lang {
  English = 'en-GB',
  Chinese = 'zh-CN',
  Cantonese = 'zh-HK',
  Spain = 'es-ES',
  Portugal = 'pt-PT',
  France = 'fr-FR',
  Japan = 'ja-JP',
  India = 'hi-IN',
  Italy = 'it-IT',
  Sweden = 'sv-SE',
  Malaysia = 'ms-MY',
  Germany = 'de-DE',
  Israel = 'he-IL',
  Indonesia = 'id-ID',
  Bulgaria = 'bg-BG',
  Mexico = 'es-MX',
  Finland = 'fi-FI',
  Brazil = 'pt-BR',
  Belgium = 'nl-BE',
  Romania = 'ro-RO',
  Thailand = 'th-TH',
  Croatia = 'hr-HR',
  Slovakia = 'sk-SK',
  Ukraine = 'uk-UA',
  Vietnam = 'vi-VN',
  Arabic = 'ar-001',
  Hungary = 'hu-HU',
  Greece = 'el-GR',
  Russia = 'ru-RU',
  Catalonia = 'ca-ES',
  Norway = 'nb-NO',
  Denmark = 'da-DK',
  SouthAfrica = 'en-ZA',
  Netherlands = 'nl-NL',
  Turkey = 'tr-TR',
  SouthKorea = 'ko-KR',
  Poland = 'pl-PL',
  CzechRepublic = 'cs-CZ',
}


export const languageNames: Map<Lang, string> = new Map([
  [Lang.English, 'English'],
  [Lang.Chinese, '中文'],
  [Lang.Cantonese, '粤语'],
  [Lang.Italy, 'Italiano'],
  [Lang.Sweden, 'Svenska'],
  [Lang.Malaysia, 'Bahasa Melayu'],
  [Lang.Germany, 'Deutsch'],
  [Lang.Israel, 'עברית'],
  [Lang.Indonesia, 'Bahasa Indonesia'],
  [Lang.Bulgaria, 'Български'],
  [Lang.France, 'Français'],
  [Lang.Mexico, 'Español de México'],
  [Lang.Finland, 'Suomi'],
  [Lang.Spain, 'Español'],
  [Lang.Brazil, 'Português do Brasil'],
  [Lang.Belgium, 'Nederlands (België)'],
  [Lang.Romania, 'Română'],
  [Lang.Portugal, 'Português'],
  [Lang.Thailand, 'ภาษาไทย'],
  [Lang.Japan, '日本語'],
  [Lang.Croatia, 'Hrvatski'],
  [Lang.Slovakia, 'Slovenčina'],
  [Lang.India, 'हिन्दी'],
  [Lang.Ukraine, 'Українська'],
  [Lang.Vietnam, 'Tiếng Việt'],
  [Lang.Arabic, 'العربية'],
  [Lang.Hungary, 'Magyar'],
  [Lang.Greece, 'Ελληνικά'],
  [Lang.Russia, 'Русский'],
  [Lang.Catalonia, 'Català'],
  [Lang.Norway, 'Norsk Bokmål'],
  [Lang.Denmark, 'Dansk'],
  [Lang.SouthAfrica, 'South African English'],
  [Lang.Netherlands, 'Nederlands'],
  [Lang.Turkey, 'Türkçe'],
  [Lang.SouthKorea, '한국어'],
  [Lang.Poland, 'Polski'],
  [Lang.CzechRepublic, 'Čeština'],
]);

export const langArray = Object.keys(Lang).map((key) => {
  const value = Lang[key as keyof typeof Lang];
  return ({
  label: languageNames.get(value) ?? key,
  value,
})});

export enum ReportType {
  NOTIFICATION = 'notification',
  PAGE_CHANGE = 'page change',
  PAGE_LOAD = 'page load',
  PAGE_FAIL = 'page fail',
  TAB = 'tab',
}