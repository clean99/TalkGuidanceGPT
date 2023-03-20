import { getPrunedFocusDOM } from "./dom/getFocusDOM"
import { prompts } from "./prompt/prompt"
import { getLang } from "./storage"
import { ReportType } from "./types/interface"
import * as _ from 'lodash'

const getIntroduceElText = async (): Promise<string | null> => {
    const { introduceElement } = await prompts(await getLang())
    const focusEl = getPrunedFocusDOM(document)
    if (focusEl) {
        return await introduceElement(focusEl)
    }
    return null
}

const getTranslatedText = async (text: string): Promise<string | null> => {
    const { translator } = await prompts(await getLang())
    return await translator(text)
}

const getText = async (type: ReportType) => {
    switch(type) {
        case ReportType.PAGE_LOAD:
            return await getTranslatedText("The page has loaded successfully.")
        case ReportType.PAGE_FAIL:
            return await getTranslatedText("The page failed to load.")
        case ReportType.PAGE_CHANGE:
            return await getTranslatedText("You have navigated to a new page.")
        case ReportType.NOTIFICATION:
            return await getTranslatedText("A notification or alert has been displayed.")
        case ReportType.TAB:
            return await getIntroduceElText()
        default:
            return null
    }
}

const report = _.debounce(async (type: ReportType): Promise<void> => {
    const text = await getText(type)
    
    if(text) {
        chrome.runtime.sendMessage({
            message: text
        })
    }
}, 500)

export {
    report
}