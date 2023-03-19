import * as $ from 'jquery'
import * as _ from 'lodash'
import { getPrunedFocusDOM } from './dom/getFocusDOM'
import { prompts } from './prompt/prompt'
import { getLang } from './storage'

// call when extension onload
$.when($.ready).then(async () => {
  // @ts-ignore
  document.addEventListener('keydown', _.debounce(async function (event) {
    const { introduceElement } = await prompts(await getLang())
    if (event.key === 'Tab') {
      const focusEl = getPrunedFocusDOM(document)
      if (focusEl) {
        console.log('focusEl', focusEl)
        console.log('id', chrome.runtime?.id)
        const introduceEl = await introduceElement(focusEl)
        chrome.runtime.sendMessage({
          message: introduceEl
        })
      }
    }
  }, 1000))
})
