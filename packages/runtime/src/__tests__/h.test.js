import { h, hString, hFragment, DOM_TYPES } from '../h';
import { test, expect } from 'vitest';

test('create a string node', () => {
  const node = hString('test');
  expect(node).toEqual({
    type: 'text',
    value: 'test',
  });
});

test('create an element node', () => {
  const node = h('div', {}, [hString('test')]);
  expect(node).toEqual({
    tag: 'div',
    props: {},
    children: [
      {
        type: 'text',
        value: 'test',
      },
    ],
    type: 'element',
  });
});

test('filter null children', () => {
  const node = h('div', {}, [hString('test')]);
  expect(node).toEqual({
    tag: 'div',
    props: {},
    children: [
      {
        type: 'text',
        value: 'test',
      },
    ],
    type: 'element',
  });
});

test('should render a fragment', () => {
  const node = hFragment([h('div', { class: 'foo' }, [])]);

  expect(node).toEqual({
    type: DOM_TYPES.FRAGMENT,
    children: [
      {
        tag: 'div',
        type: 'element',
        props: {
          class: 'foo',
        },
        children: [],
      },
    ],
  });
});
