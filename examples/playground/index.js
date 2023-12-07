import { h, hFragment, hString } from 'https://unpkg.com/cadre-js@0.0.6';

console.log('ready to start coding');

const node = hFragment([h('div', { class: 'foo' }, [])]);

console.log(node);

const children = [h('div', { class: 'foo' }, [])];
const frag = hFragment(children);

console.log(frag);

const arr1 = ['A', 'A', 'B', 'C'];
const arr2 = ['C', 'K', 'A', 'B'];
