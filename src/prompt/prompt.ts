import { getStorage } from '../storage';
import { ChatCompletionRequestMessageRoleEnum, Configuration, OpenAIApi } from 'openai';
import { Actions, Lang, ProcessedAction, PrunedElement } from '../types/interface';
import { getLangFullName, getCodeBlock } from '../utils/utils';

let controller: AbortController | null = null;

const promptFactory = async (): Promise<(text: string) => Promise<string>> => {
	const configuration = new Configuration({
		apiKey: await getStorage('gpt-api-key')
	});
	const openai = new OpenAIApi(configuration);
	return async (message: string) => {
		if(controller) {
			controller.abort();
		}
		controller = new AbortController();
		const response = await openai.createChatCompletion({
			model: 'gpt-3.5-turbo-0301',
			messages: [
				{
					content: message,
					role: ChatCompletionRequestMessageRoleEnum.User
				}
			],
			temperature: 0.8
		}, {
			signal: controller.signal
		});
		return response?.data?.choices?.[0]?.message?.content ?? '';
	};
};

const prompts = async (lang: Lang): Promise<{
  promptSpeak: (text: string, actionLists: Actions) => Promise<ProcessedAction | null>
  promptRead: (prunedDom: PrunedElement[]) => Promise<string>
  introduceElement: (prunedDom: PrunedElement) => Promise<string>
  translator: (text: string) => Promise<string>
}> => {
	const prompt = await promptFactory();
	//   const promptKit = await gptPromptKitFactory(await getStorage('gpt-api-key'));
	const langName = getLangFullName(lang);
	const translate = (from: string, to: string) => {
		return async (text: string) => {
			return await prompt(`A ${from} phrase is provided: ${text}
                The masterful ${from} translator flawlessly translates the phrase into ${to}:`);
		};
	};

	const translator = lang !== Lang.English
		? translate(getLangFullName(Lang.English), langName)
		: (text: string) => Promise.resolve(text);

	/**
     *
     * @param text users input
     * @param actionLists a list of possible actions and elements in the page
     * @returns a processed action
     */
	const promptSpeak = async (text: string, actionLists: Actions): Promise<ProcessedAction | null> => {
		const translatedText = await translator(text);
		const response = await prompt(`
        You are given the text and you need to convert it into a command with a payload.\n
        Given a list of actions and roles, you are only allowed to combine them to a output using this format:\n
        \`\`\`\n
        {
            "role": <role of the element>,
            "type": <type of the element>,
            "placeholder": <placeholder of the element>,
            "name": <name of the element>,
            "action": <action to operate the element(required)>,
            "payload": <payload>
        }
        \`\`\`\n
        actions list: ${JSON.stringify(actionLists.actions)}\n
        elements: ${JSON.stringify(actionLists.elements)}\n
        Begin.\n
        ${translatedText}
        `);

		const codeBlock = getCodeBlock(response);
		return codeBlock !== null ? JSON.parse(codeBlock) : JSON.parse(response);
	};

	const promptRead = async (prunedDom: PrunedElement[]): Promise<string> => await prompt(`
        You are only allowed to use ${langName} to reply me. You must make sure the reply text
        doesn't content any other language.\n
        You are given a list of DOM, read them in a coherent and natural language way, \n
        If the list is too long, read the most important, most informative elements that user may want to know.\n
        Total words should be less than 300.\n
        Use this format:\n
        \`\`\`
        This page has those elements:\n
        <A text that describe the DOM list one by one in fully ${langName}>
        \`\`\`
        Begin.\n
        ${JSON.stringify(prunedDom)}
    `);

	const introduceElement = async (prunedDom: PrunedElement): Promise<string> => {
		const response = await prompt(`
    Help a visually impaired user by describing this web element in ${langName}. Use everyday language and avoid technical terms. Keep the description concise and easy to understand. Element: ${JSON.stringify(prunedDom)}
    Begin.
  `);

		return response;
	};

	return { promptSpeak, promptRead, introduceElement, translator };
};

export { promptFactory, prompts };
