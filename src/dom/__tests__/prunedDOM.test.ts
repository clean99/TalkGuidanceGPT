// Import necessary libraries and dependencies
import { PrunedElement } from '../../types/interface';
import * as $ from 'jquery';
import { addAria, addContent, addRole, addSelector, addState } from '../prunedDOM';

// Test cases for addRole function
describe('addRole', () => {
  test('should add role and type to the result object when both are present', () => {
    const $el = $('<div role="button" type="submit"></div>');
    const res: PrunedElement = {};

    addRole($el, res);

    expect(res.role).toBe('button');
    expect(res.type).toBe('submit');
  });

  test('should add role to the result object when only role is present', () => {
    const $el = $('<div role="button"></div>');
    const res: PrunedElement = {};

    addRole($el, res);

    expect(res.role).toBe('button');
    expect(res.type).toBeUndefined();
  });

  test('should add type to the result object when only type is present', () => {
    const $el = $('<div type="submit"></div>');
    const res: PrunedElement = {};

    addRole($el, res);

    expect(res.role).toBeUndefined();
    expect(res.type).toBe('submit');
  });

  test('should not add role or type to the result object when both are absent', () => {
    const $el = $('<div></div>');
    const res: PrunedElement = {};

    addRole($el, res);

    expect(res.role).toBeUndefined();
    expect(res.type).toBeUndefined();
  });

  test('should handle whitespace in role and type attributes', () => {
    const $el = $('<div role=" button " type=" submit "></div>');
    const res: PrunedElement = {};

    addRole($el, res);

    expect(res.role).toBe('button');
    expect(res.type).toBe('submit');
  });
});

// Test cases for addContent function
describe('addContent', () => {
  test('should add all attributes to the result object when all are present', () => {
    const $el = $('<div placeholder="test placeholder" alt="test alt" title="test title">test name</div>');
    const res: PrunedElement = {};

    addContent($el, res);

    expect(res.placeholder).toBe('test placeholder');
    expect(res.name).toBe('test name');
    expect(res.alt).toBe('test alt');
    expect(res.title).toBe('test title');
  });

  test('should add only present attributes to the result object', () => {
    const $el = $('<div placeholder="test placeholder" alt="test alt">test name</div>');
    const res: PrunedElement = {};

    addContent($el, res);

    expect(res.placeholder).toBe('test placeholder');
    expect(res.name).toBe('test name');
    expect(res.alt).toBe('test alt');
    expect(res.title).toBeUndefined();
  });

  test('should not add any attributes to the result object when all are absent', () => {
    const $el = $('<div></div>');
    const res: PrunedElement = {};

    addContent($el, res);

    expect(res.placeholder).toBeUndefined();
    expect(res.name).toBeUndefined();
    expect(res.alt).toBeUndefined();
    expect(res.title).toBeUndefined();
  });

  test('should handle whitespace in attributes', () => {
    const $el = $('<div placeholder=" test placeholder " alt=" test alt " title=" test title "> test name </div>');
    const res: PrunedElement = {};

    addContent($el, res);

    expect(res.placeholder).toBe('test placeholder');
    expect(res.name).toBe('test name');
    expect(res.alt).toBe('test alt');
    expect(res.title).toBe('test title');
  });

  test('should handle empty attributes', () => {
    const $el = $('<div placeholder="" alt="" title="">test name</div>');
    const res: PrunedElement = {};

    addContent($el, res);

    expect(res.placeholder).toBeUndefined();
    expect(res.name).toBe('test name');
    expect(res.alt).toBeUndefined();
    expect(res.title).toBeUndefined();
  });
});

// Test cases for addAria function
describe('addAria', () => {
  test('should add all aria attributes to the result object when all are present', () => {
    const $el = $('<div aria-label="test label" aria-labelledby="test labelledby" aria-describedby="test describedby" aria-description="test description"></div>');
    const res: PrunedElement = {};

    addAria($el, res);

    expect(res.ariaLabel).toBe('test label');
    expect(res.ariaLabelledBy).toBe('test labelledby');
    expect(res.ariaDescribedBy).toBe('test describedby');
    expect(res.ariaDescription).toBe('test description');
  });

  test('should add only present aria attributes to the result object', () => {
    const $el = $('<div aria-label="test label" aria-labelledby="test labelledby"></div>');
    const res: PrunedElement = {};

    addAria($el, res);

    expect(res.ariaLabel).toBe('test label');
    expect(res.ariaLabelledBy).toBe('test labelledby');
    expect(res.ariaDescribedBy).toBeUndefined();
    expect(res.ariaDescription).toBeUndefined();
  });

  test('should not add any aria attributes to the result object when all are absent', () => {
    const $el = $('<div></div>');
    const res: PrunedElement = {};

    addAria($el, res);

    expect(res.ariaLabel).toBeUndefined();
    expect(res.ariaLabelledBy).toBeUndefined();
    expect(res.ariaDescribedBy).toBeUndefined();
    expect(res.ariaDescription).toBeUndefined();
  });

  test('should handle whitespace in aria attributes', () => {
    const $el = $('<div aria-label=" test label " aria-labelledby=" test labelledby " aria-describedby=" test describedby " aria-description=" test description "></div>');
    const res: PrunedElement = {};

    addAria($el, res);

    expect(res.ariaLabel).toBe('test label');
    expect(res.ariaLabelledBy).toBe('test labelledby');
    expect(res.ariaDescribedBy).toBe('test describedby');
    expect(res.ariaDescription).toBe('test description');
  });
});
// Test cases for addSelector function
describe('addSelector', () => {
  test('should add class, id, and tagName to the result object when all are present', () => {
    const el = document.createElement('div');
    el.id = 'test-id';
    const res: PrunedElement = {};

    addSelector(el, res);

    expect(res.id).toBe('test-id');
    expect(res.tagName).toBe('div');
  });

  test('should add only class and tagName to the result object when id is absent', () => {
    const el = document.createElement('div');
    const res: PrunedElement = {};

    addSelector(el, res);

    expect(res.id).toBeUndefined();
    expect(res.tagName).toBe('div');
  });

  test('should add only id and tagName to the result object when class is absent', () => {
    const el = document.createElement('div');
    el.id = 'test-id';
    const res: PrunedElement = {};

    addSelector(el, res);

    expect(res.id).toBe('test-id');
    expect(res.tagName).toBe('div');
  });

  test('should add only tagName to the result object when both class and id are absent', () => {
    const el = document.createElement('div');
    const res: PrunedElement = {};

    addSelector(el, res);

    expect(res.id).toBeUndefined();
    expect(res.tagName).toBe('div');
  });

  test('should handle whitespace in class and id attributes', () => {
    const el = document.createElement('div');
    el.id = ' test-id ';
    const res: PrunedElement = {};

    addSelector(el, res);

    expect(res.id).toBe('test-id');
    expect(res.tagName).toBe('div');
  });
});

// Test cases for addState function
describe('addState', () => {
  test('should add disabled, checked, and selected states to the result object when all are present', () => {
    const el = document.createElement('input');
    el.disabled = true;
    el.checked = true;
    // @ts-ignore
    el.selected = true;
    const res: PrunedElement = {};

    addState(el, res);

    expect(res.disabled).toBe(true);
    expect(res.checked).toBe(true);
    expect(res.selected).toBe(true);
  });

  test('should add only disabled state to the result object when others are absent', () => {
    const el = document.createElement('input');
    el.disabled = true;
    const res: PrunedElement = {};

    addState(el, res);

    expect(res.disabled).toBe(true);
    expect(res.checked).toBeUndefined();
    expect(res.selected).toBeUndefined();
  });

  test('should add only checked state to the result object when others are absent', () => {
    const el = document.createElement('input');
    el.checked = true;
    const res: PrunedElement = {};

    addState(el, res);

    expect(res.disabled).toBeUndefined();
    expect(res.checked).toBe(true);
    expect(res.selected).toBeUndefined();
  });

  test('should add only selected state to the result object when others are absent', () => {
    const el = document.createElement('input');
    // @ts-ignore
    el.selected = true;
    const res: PrunedElement = {};

    addState(el, res);

    expect(res.disabled).toBeUndefined();
    expect(res.checked).toBeUndefined();
    expect(res.selected).toBe(true);
  });

  test('should not add any state to the result object when all are absent', () => {
    const el = document.createElement('input');
    const res: PrunedElement = {};

    addState(el, res);

    expect(res.disabled).toBeUndefined();
    expect(res.checked).toBeUndefined();
    expect(res.selected).toBeUndefined();
  });
});