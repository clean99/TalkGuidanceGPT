import { Lang } from './types/interface'

// Async function to get storage with key
async function getStorage (key: string): Promise<any> {
  return await new Promise((resolve, reject) => {
    chrome.storage.sync.get(key, (result) => {
      if (chrome.runtime.lastError != null) {
        reject(chrome.runtime.lastError)
      } else {
        resolve(result[key])
      }
    })
  })
}

// Async function to set storage key
async function setStorage (key: string, value: any): Promise<void> {
  await new Promise((resolve, reject) => {
    chrome.storage.sync.set({ [key]: value }, () => {
      if (chrome.runtime.lastError != null) {
        reject(chrome.runtime.lastError)
      } else {
        resolve('')
      }
    })
  })
}

// Async function to clear storage key
async function clearStorage (key: string): Promise<void> {
  await new Promise((resolve, reject) => {
    chrome.storage.sync.remove(key, () => {
      if (chrome.runtime.lastError != null) {
        reject(chrome.runtime.lastError)
      } else {
        resolve('')
      }
    })
  })
}

async function getGPTApiKey (): Promise<string> {
  return await getStorage('gpt-api-key')
}

async function setGPTApiKey (key: string): Promise<void> {
  await setStorage('gpt-api-key', key)
}

async function getLang (): Promise<Lang> {
  return await getStorage('lang')
}

async function setLang (lang: Lang): Promise<void> {
  await setStorage('lang', lang)
}

async function setRate (rate: number): Promise<void> {
  await setStorage('rate', rate)
}

async function getRate (): Promise<number> {
  return await getStorage('rate')
}

async function setEnabled (enabled: boolean): Promise<void> {
  await setStorage('enabled', enabled)
}

async function getEnabled (): Promise<boolean> {
  return await getStorage('enabled')
}

export { getStorage, setStorage, clearStorage, getGPTApiKey, setGPTApiKey, getLang, setLang, setRate, getRate, setEnabled, getEnabled }
