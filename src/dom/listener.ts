import { getPrunedFocusDOM } from "./getFocusDOM"
import { prompts } from "../prompt/prompt"
import { getLang } from "../storage"
import * as _ from 'lodash'

const listener = async () => {
    const { introduceElement } = await prompts(await getLang())

    const tabListener = _.debounce(async function (event) {
      if (event.key === 'Tab') {
        const focusEl = getPrunedFocusDOM(document)
        if (focusEl) {
          const introduceEl = await introduceElement(focusEl)
          chrome.runtime.sendMessage({
            message: introduceEl
          })
        }
      }
    }, 500)

    const clickListener = _.debounce(async function () {
        const focusEl = getPrunedFocusDOM(document)
        if (focusEl) {
          const introduceEl = await introduceElement(focusEl)
          chrome.runtime.sendMessage({
            message: introduceEl
          })
        }
    }, 500)

    return { tabListener, clickListener }
}

export default listener