import { DOM_TYPES } from './h';
import { setAttributes } from './events';
import { addEventListeners } from './events';

export function mountDom(vdom, parentEl) {
  switch (vdom.type) {
    case DOM_TYPES.TEXT: {
      createTextNode(vdom, parentEl);
      break;
    }

    case DOM_TYPES.ELEMENT: {
      createElementNode(vdom, parentEl);
      break;
    }

    case DOM_TYPES.FRAGMENT: {
      createFragmentNode(vdom, parentEl);
      break;
    }

    default:
      throw new Error('Cant mount dom node of type', vdom.type);
  }
}

function createTextNode(vdom, parentEl) {
  const { value } = vdom;

  const textNode = document.createTextNode(value);
  vdom.el = textNode;

  parentEl.append(textNode);
}

function createFragmentNode(vdom, parentEl) {
  const { children } = vdom;
  vdom.el = parentEl;

  children.forEach((child) => mountDom(child, parentEl));
}

function createElementNode(vdom, parentEl) {
  const { tag, props, children } = vdom;

  const element = document.createElement(tag);
  addProps(element, props, vdom);
  vdom.el = element;

  children.foeReach((child) => mountDom(child, element));
  parentEl.append(element);
}

function addProps(el, props, vdom) {
  const { on: event, ...attrs } = props;

  vdom.listeners = addEventListeners(event, el);
  setAttributes(el, attrs);
}
