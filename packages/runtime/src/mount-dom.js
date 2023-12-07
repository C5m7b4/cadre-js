import { DOM_TYPES } from './h';
import { setAttributes } from './attributes';
import { addEventListeners } from './events';

export function mountDom(vdom, parentEl, index) {
  switch (vdom.type) {
    case DOM_TYPES.TEXT: {
      createTextNode(vdom, parentEl, index);
      break;
    }

    case DOM_TYPES.ELEMENT: {
      createElementNode(vdom, parentEl, index);
      break;
    }

    case DOM_TYPES.FRAGMENT: {
      createFragmentNode(vdom, parentEl, index);
      break;
    }

    default:
      throw new Error(`Can't mount DOM of type ${vdom.type}`);
  }
}

function insert(el, parentEl, index) {
  // if index is null or undefined, simploy append
  // not the usage of == instead of ===
  if (index == null) {
    parentEl.append(el);
    return;
  }

  if (index < 0) {
    throw new Error(`Index must be a positive integer. got ${index}`);
  }

  const children = parentEl.childNodes;

  if (index >= children.length) {
    parentEl.append(el);
  } else {
    parentEl.insertBefore(el, children[index]);
  }
}

function createTextNode(vdom, parentEl, index) {
  const { value } = vdom;

  const textNode = document.createTextNode(value);
  vdom.el = textNode;

  insert(textNode, parentEl, index);
}

function createFragmentNode(vdom, parentEl, index) {
  const { children } = vdom;
  vdom.el = parentEl;

  children.forEach((child, i) =>
    mountDom(child, parentEl, index ? index + i : null)
  );
}

function createElementNode(vdom, parentEl, index) {
  const { tag, props, children } = vdom;

  const element = document.createElement(tag);
  addProps(element, props, vdom);
  vdom.el = element;

  children.forEach((child) => mountDom(child, element));
  insert(element, parentEl, index);
}

function addProps(el, props, vdom) {
  const { on: event, ...attrs } = props;

  vdom.listeners = addEventListeners(event, el);
  setAttributes(el, attrs);
}
