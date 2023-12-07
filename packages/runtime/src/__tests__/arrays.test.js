import { lipsum, arraysDiff } from '../utils/arrays';
import { expect, test } from 'vitest';

test.skip('should generate two lipsums', () => {
  expect(lipsum(2)).toEqual({
    type: 'fragment',
    children: [
      {
        type: 'element',
        tag: 'p',
        props: {},
        children: [
          `Lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.`,
        ],
      },
      {
        type: 'element',
        tag: 'p',
        props: {},
        children: [
          `Lorem ipsum dolor sit
        amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
        dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
        laboris nisi ut aliquip ex ea commodo consequat.`,
        ],
      },
    ],
  });
});

test('array item added', () => {
  const oldArray = [1, 2, 3];
  const newArray = [1, 2, 3, 4];
  const { added } = arraysDiff(oldArray, newArray);
  expect(added).toEqual([4]);
});

test('array item removed', () => {
  const oldArray = [1, 2, 3, 4];
  const newArray = [1, 2, 3];
  const { removed } = arraysDiff(oldArray, newArray);
  expect(removed).toEqual([4]);
});
