import * as $ from 'jquery';
import { ReportType } from '../types/interface';

function registerVoiceInstructions(window: Window, report: _.DebouncedFunc<(type: ReportType) => Promise<void>>) {
	// Event 1: Jump to a new page
	const onPageChange = () => {
		report(ReportType.PAGE_CHANGE);
	};
	$(window).on('beforeunload', onPageChange);

	// Event 2: Page loading success
	const onPageLoadSuccess = () => {
		report(ReportType.PAGE_LOAD);
	};
	$(window).on('load', onPageLoadSuccess);

	// Event 3: Page loading failed
	const onPageLoadFailed = () => {
		report(ReportType.PAGE_FAIL);
	};
	$(window).on('error', onPageLoadFailed);

	// Event 4: Notifications and alerts
	const onNotification = () => {
		report(ReportType.NOTIFICATION);
	};
	$(document).on('DOMNodeInserted', '.notification, .alert', onNotification);

	// Event 5: Listen to tab press
	const onTabPress = (event: KeyboardEvent) => {
		if (event.key === 'Tab') {
			report(ReportType.TAB);
		}
	};
	// @ts-ignore
	$(document).on('keydown', onTabPress);


	// Return a destroy function to remove event listeners
	return () => {
		$(window).off('beforeunload', onPageChange);
		$(window).off('load', onPageLoadSuccess);
		$(window).off('error', onPageLoadFailed);
		$(document).off('DOMNodeInserted', '.notification, .alert', onNotification);
		// @ts-ignore
		$(document).off('keydown', onTabPress);
	};
}

export { registerVoiceInstructions };