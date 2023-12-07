import { expect, test } from 'vitest';
import { objectsDiff } from '../utils/objects';

test('same object, no change', () => {
  const oldObj = { class: 'foo' };
  const newObj = { class: 'foo' };
  const { added, updated, removed } = objectsDiff(oldObj, newObj);
  expect(added).toEqual([]);
  expect(removed).toEqual([]);
  expect(updated).toEqual([]);
});

test('add key', () => {
  const oldObj = {};
  const newObj = { class: 'foo' };
  const { added, updated, removed } = objectsDiff(oldObj, newObj);
  expect(added).toEqual(['class']);
  expect(removed).toEqual([]);
  expect(updated).toEqual([]);
});

test('remove key', () => {
  const oldObj = { class: 'foo' };
  const newObj = {};
  const { added, updated, removed } = objectsDiff(oldObj, newObj);
  expect(added).toEqual([]);
  expect(removed).toEqual(['class']);
  expect(updated).toEqual([]);
});

test('update key', () => {
  const oldObj = { class: 'foo' };
  const newObj = { class: 'bar' };
  const { added, updated, removed } = objectsDiff(oldObj, newObj);
  expect(added).toEqual([]);
  expect(removed).toEqual([]);
  expect(updated).toEqual(['class']);
});
