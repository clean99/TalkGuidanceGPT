import { Lang } from '../types/interface'

export async function getTabId (): Promise<number> {
  let resolve: (value: number) => void;

  const promise = new Promise<number>((res) => {
    resolve = res
  })

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    resolve(tabs[0].id ?? 0)
  })

  return await promise
}

export async function getTabUrl (): Promise<string> {
  let resolve: (value: string) => void;

  const promise = new Promise<string>((res) => {
    resolve = res
  })

  chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
    resolve(tabs[0].url ?? '')
  })

  return await promise
}

export function pruneSpace (name: string): string {
  return name.replace(/\s+/g, ' ').trim()
}

/**
 * A function that takes a string input and returns the normalized string.
 * @param text
 * @returns {string}
 */
export const getCodeBlock = (text: string): string | null =>
  /```[\s\S]*?\n([\s\S]*?)\n```/.exec(text)?.[1].trim() ?? null

export function getLangFullName (lang: Lang): string {
  switch (lang) {
    case Lang.HongKong:
      return 'Cantonese'
    case Lang.China:
      return 'Chinese (Simplified)'
    case Lang.UnitedKingdom:
      return 'English (United Kingdom)'
    case Lang.UnitedStates:
      return 'English (United States)'
    case Lang.Italy:
      return 'Italian (Italy)'
    case Lang.Sweden:
      return 'Swedish (Sweden)'
    case Lang.Canada:
      return 'French (Canada)'
    case Lang.Malaysia:
      return 'Malay (Malaysia)'
    case Lang.Germany:
      return 'German (Germany)'
    case Lang.Israel:
      return 'Hebrew (Israel)'
    case Lang.Indonesia:
      return 'Indonesian (Indonesia)'
    case Lang.Bulgaria:
      return 'Bulgarian (Bulgaria)'
    case Lang.France:
      return 'French (France)'
    case Lang.Mexico:
      return 'Spanish (Mexico)'
    case Lang.Finland:
      return 'Finnish (Finland)'
    case Lang.Spain:
      return 'Spanish (Spain)'
    case Lang.Brazil:
      return 'Portuguese (Brazil)'
    case Lang.Belgium:
      return 'Dutch (Belgium)'
    case Lang.Romania:
      return 'Romanian (Romania)'
    case Lang.Portugal:
      return 'Portuguese (Portugal)'
    case Lang.Thailand:
      return 'Thai (Thailand)'
    case Lang.Australia:
      return 'English (Australia)'
    case Lang.Japan:
      return 'Japanese (Japan)'
    case Lang.Croatia:
      return 'Croatian'
    case Lang.Slovakia:
      return 'Slovak (Slovakia)'
    case Lang.India:
      return 'Hindi (India)'
    case Lang.Ukraine:
      return 'Ukrainian (Ukraine)'
    case Lang.Vietnam:
      return 'Vietnamese (Vietnam)'
    case Lang.Arabic:
      return 'Arabic'
    case Lang.Hungary:
      return 'Hungarian (Hungary)'
    case Lang.Taiwan:
      return 'Chinese (Taiwan)'
    case Lang.Greece:
      return 'Greek (Greece)'
    case Lang.Russia:
      return 'Russian (Russia)'
    case Lang.Ireland:
      return 'English (Ireland)'
    case Lang.Catalonia:
      return 'Catalan (Spain)'
    case Lang.Norway:
      return 'Norwegian Bokmål (Norway)'
    case Lang.IndiaEnglish:
      return 'English (India)'
    case Lang.Denmark:
      return 'Danish (Denmark)'
    case Lang.SouthAfrica:
      return 'English (South Africa)'
    case Lang.Netherlands:
      return 'Dutch (Netherlands)'
    case Lang.Turkey:
      return 'Turkish (Turkey)'
    case Lang.SouthKorea:
      return 'Korean (South Korea)'
    case Lang.Poland:
      return 'Polish (Poland)'
    case Lang.CzechRepublic:
      return 'Czech (Czech Republic)'
    case Lang.UnitedStatesSpanish:
      return 'Spanish (United States)'
    default:
      return 'English'
  }
}
