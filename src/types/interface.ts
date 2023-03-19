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
  // TODO: support img
  role?: string
  type?: string
  placeholder?: string
  name?: string
  alt?: string
  title?: string
}

export enum Lang {
  UnitedKingdom = 'en-GB',
  China = 'zh-CN',
  HongKong = 'zh-HK',
  UnitedStates = 'en-US',
  Italy = 'it-IT',
  Sweden = 'sv-SE',
  Canada = 'fr-CA',
  Malaysia = 'ms-MY',
  Germany = 'de-DE',
  Israel = 'he-IL',
  Indonesia = 'id-ID',
  Bulgaria = 'bg-BG',
  France = 'fr-FR',
  Mexico = 'es-MX',
  Finland = 'fi-FI',
  Spain = 'es-ES',
  Brazil = 'pt-BR',
  Belgium = 'nl-BE',
  Romania = 'ro-RO',
  Portugal = 'pt-PT',
  Thailand = 'th-TH',
  Australia = 'en-AU',
  Japan = 'ja-JP',
  Croatia = 'hr-HR',
  Slovakia = 'sk-SK',
  India = 'hi-IN',
  Ukraine = 'uk-UA',
  Vietnam = 'vi-VN',
  Arabic = 'ar-001',
  Hungary = 'hu-HU',
  Taiwan = 'zh-TW',
  Greece = 'el-GR',
  Russia = 'ru-RU',
  Ireland = 'en-IE',
  Catalonia = 'ca-ES',
  Norway = 'nb-NO',
  IndiaEnglish = 'en-IN',
  Denmark = 'da-DK',
  SouthAfrica = 'en-ZA',
  Netherlands = 'nl-NL',
  Turkey = 'tr-TR',
  SouthKorea = 'ko-KR',
  Poland = 'pl-PL',
  CzechRepublic = 'cs-CZ',
  UnitedStatesSpanish = 'es-US',
}

export const langArray = Object.keys(Lang).map((key) => ({
  label: key,
  value: Lang[key as keyof typeof Lang],
}));

