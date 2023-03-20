import * as $ from 'jquery'
import * as _ from 'lodash'
import listener from './dom/listener'
import { getEnabled } from './storage'

async function executeScript() {
  const { tabListener } = await listener()
  // call when extension onload
  $.when($.ready).then( () => {
    // @ts-ignore
    document.addEventListener('keydown', tabListener)
  })

  return () => {
    document.removeEventListener('keydown', tabListener)
  }
}

let removeEventListener: any

(async () => {
  if(await getEnabled() && !removeEventListener) {
    removeEventListener = await executeScript()
  }
})()

chrome.runtime.onMessage.addListener(async (message, sender, sendResponse) => {
  if (message.action === 'enable' && !removeEventListener) {
    removeEventListener = await executeScript()
  } else if (message.action === 'disable' && removeEventListener) {
    removeEventListener()
    removeEventListener = null
  }
});
