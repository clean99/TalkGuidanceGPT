import { fireEvent } from '@testing-library/dom';
import * as $ from 'jquery';
import { ReportType } from '../../types/interface';
import { registerVoiceInstructions } from '../domEventListener';

describe('registerVoiceInstructions', () => {
	let report: jest.Mock;
	let window: Window;

	beforeEach(() => {
		report = jest.fn();
		window = global.window;
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	it('should report when navigating to a new page', async () => {
		// @ts-ignore
		const destroy = registerVoiceInstructions(window, report);

		// Create a custom beforeunload event and dispatch it
		const beforeUnloadEvent = new Event('beforeunload');
		window.dispatchEvent(beforeUnloadEvent);

		expect(report).toHaveBeenCalledWith(ReportType.PAGE_CHANGE);
		destroy();
	});
    
	it('should report when the page has loaded successfully', async () => {
		// @ts-ignore
		const destroy = registerVoiceInstructions(window, report);
		fireEvent.load(window);
		expect(report).toHaveBeenCalledWith(ReportType.PAGE_LOAD);
		destroy();
	});

	it('should report when the page failed to load', async () => {
		// @ts-ignore
		const destroy = registerVoiceInstructions(window, report);
		fireEvent.error(window);
		expect(report).toHaveBeenCalledWith(ReportType.PAGE_FAIL);
		destroy();
	});

	it('should report when the Tab key is pressed', async () => {
		// @ts-ignore
		const destroy = registerVoiceInstructions(window, report);

		// Create a custom keydown event with the Tab key and dispatch it
		const tabKeyEvent = new KeyboardEvent('keydown', { key: 'Tab' });
		document.dispatchEvent(tabKeyEvent);

		expect(report).toHaveBeenCalledWith(ReportType.TAB);
		destroy();
	});

	it('should remove event listeners when destroy is called', () => {
		// @ts-ignore
		const destroy = registerVoiceInstructions(window, report);
		destroy();
		const beforeUnloadEvent = new Event('beforeunload');
		window.dispatchEvent(beforeUnloadEvent);
		fireEvent.load(window);
		fireEvent.error(window);
		fireEvent.keyDown(document, { key: 'Tab' });
		fireEvent.keyPress(document, { key: 'Tab' });
		const notification = $('<div class=\'notification\'></div>');
		$('body').append(notification);
		expect(report).not.toHaveBeenCalled();
	});
});