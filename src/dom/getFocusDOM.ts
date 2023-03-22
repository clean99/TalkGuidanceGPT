import { PrunedElement } from '../types/interface';
import { mapDOM } from './prunedDOM';

// Function to get the focused DOM element
function getFocusDOM (document: Document): HTMLElement | null {
	// @ts-ignore
	if (document.activeElement === document.body) return null;
	// @ts-ignore
	return document.activeElement as HTMLElement;
}

function getPrunedFocusDOM (document: Document): PrunedElement | null {
	const focusDOM = getFocusDOM(document);
	if (!focusDOM) return null;
	return mapDOM(0, focusDOM);
}

export { getFocusDOM, getPrunedFocusDOM };
