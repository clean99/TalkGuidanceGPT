import { createTextToSpeechFunction } from './sound/read'
import { getLang, getRate, setGPTApiKey, setLang, setRate } from './storage'
import { Lang } from './types/interface'
import { getTabId, getTabUrl } from './utils/utils'

async function insertScript (): Promise<void> {
  const tabId = await getTabId()
  // url not chrome://
  const url = await getTabUrl()
  console.log('tabId', tabId)
  console.log('url', url)
  if (!url || url.startsWith('chrome://')) {
    // Skip actions that require access to chrome:// URLs
    return
  }

  chrome.scripting.executeScript({
    target: { tabId: tabId ?? 0 },
    files: ['/content.js']
  })
}

// insertScript when switch to a new tab
chrome.tabs.onActivated.addListener(insertScript)
// insertScript when refresh a tab
chrome.tabs.onUpdated.addListener(insertScript)

// call when extension onload
chrome.runtime.onInstalled.addListener(async () => {
  await setLang(Lang.China)
  await setRate(0.8)
  await setGPTApiKey('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')
})

chrome.runtime.onMessage.addListener(async function (request: any, sender: chrome.runtime.MessageSender) {
  console.log(request.message, sender.tab?.id)
  const textToSpeech = createTextToSpeechFunction(await getLang(), await getRate())
  await textToSpeech(request.message)
  chrome.tabs.sendMessage(sender.tab?.id ?? 0, {
    message: 'READ_DOM_SUCCESS'
  })
})
