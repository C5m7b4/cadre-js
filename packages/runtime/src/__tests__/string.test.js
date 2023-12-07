import { isNotEmptyString, isNotBlankOrEmptyString } from '../utils/strings';
import { expect, test } from 'vitest';

test('isnotemptystring', () => {
  expect(isNotEmptyString('')).toBeFalsy();
});
test('shoudl be true when a string is present', () => {
  expect(isNotEmptyString('hello')).toBeTruthy();
});
test('should report blank values', () => {
  expect(isNotBlankOrEmptyString()).toBeFalsy();
});
test('should report that a string is present', () => {
  expect(isNotBlankOrEmptyString('hello')).toBeTruthy();
});
