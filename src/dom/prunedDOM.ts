import { PrunedElement } from '../types/interface';
import { pruneSpace } from '../utils/utils';
import * as $ from 'jquery';

const addRole = ($el: JQuery<HTMLElement>, res: PrunedElement): void => {
	const prunedRole = pruneSpace($el.attr('role') ?? '');
	const prunedType = pruneSpace($el.attr('type') ?? '');

	if (prunedRole) {
		res.role = prunedRole;
	}

	if (prunedType) {
		res.type = prunedType;
	}
};

const addContent = ($el: JQuery<HTMLElement>, res: PrunedElement): void => {
	const prunedPlaceholder = pruneSpace($el.attr('placeholder') ?? '');
	const prunedName = pruneSpace($el.text().trim() || $el[0].innerText || '');
	const prunedAlt = pruneSpace($el.attr('alt') ?? '');
	const prunedTitle = pruneSpace($el.attr('title') ?? '');

	if (prunedPlaceholder) {
		res.placeholder = prunedPlaceholder;
	}

	if (prunedName) {
		res.name = prunedName;
	}

	if (prunedAlt) {
		res.alt = prunedAlt;
	}

	if (prunedTitle) {
		res.title = prunedTitle;
	}
};

const addAria = ($el: JQuery<HTMLElement>, res: PrunedElement): void => {
	const prunedAriaLabel = pruneSpace($el.attr('aria-label') ?? ''); // Use jQuery's attr method to get the aria-label attribute
	const prunedAriaLabelledBy = pruneSpace($el.attr('aria-labelledby') ?? ''); // Use jQuery's attr method to get the aria-labelledby attribute
	const prunedAriaDescribedBy = pruneSpace($el.attr('aria-describedby') ?? ''); // Use jQuery's attr method to get the aria-describedby attribute
	const prunedAriaDescription = pruneSpace($el.attr('aria-description') ?? ''); // Use jQuery's attr method to get the aria-description attribute

	if (prunedAriaLabel) {
		res.ariaLabel = prunedAriaLabel;
	}

	if (prunedAriaLabelledBy) {
		res.ariaLabelledBy = prunedAriaLabelledBy;
	}

	if (prunedAriaDescribedBy) {
		res.ariaDescribedBy = prunedAriaDescribedBy;
	}

	if (prunedAriaDescription) {
		res.ariaDescription = prunedAriaDescription;
	}
};

const addSelector = (el: HTMLElement, res: PrunedElement): void => {
	const $el = $(el); // Cache the jQuery object for better performance
	const prunedId = pruneSpace($el.attr('id') ?? ''); // Use jQuery's attr method to get the id attribute
	const tagName = el.tagName.toLowerCase() || el.nodeName.toLowerCase();

	if (prunedId) {
		res.id = prunedId;
	}

	res.tagName = tagName;
};

const addState = (el: HTMLElement, res: PrunedElement): void => {
	const $el = $(el); // Cache the jQuery object for better performance
	const disabled = $el.prop('disabled'); // Use jQuery's prop method to get the disabled state
	const checked = $el.prop('checked'); // Use jQuery's prop method to get the checked state
	const selected = $el.prop('selected'); // Use jQuery's prop method to get the selected state

	if (disabled) {
		res.disabled = disabled;
	}

	if (checked) {
		res.checked = checked;
	}

	if (selected) {
		res.selected = selected;
	}
};

const mapDOM = (_: number, el: HTMLElement): PrunedElement => {
	const res: PrunedElement = {};
	const $el = $(el); // Cache the jQuery object for better performance
  
	addRole($el, res);
	addContent($el, res);
	addAria($el, res);
	addSelector(el, res);
	addState(el, res);

	return res;
};


export { mapDOM, addRole, addContent, addSelector, addAria, addState };
