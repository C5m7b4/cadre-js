import { removeEventListeners } from "../props/events";
import { DOM_TYPES } from "../h";

export function destroyDom(vdom) {
  const { type } = vdom;

  switch (type) {
    case DOM_TYPES.TEXT: {
      removeTextNode(vdom);
      break;
    }

    case DOM_TYPES.ELEMENT: {
      removeElementNode(vdom);
      break;
    }

    case DOM_TYPES.FRAGMENT: {
      removeFragmentNode(vdom);
      break;
    }

    default:
      throw new Error(` cant destroy dom of type ${type}`);
  }

  delete vdom.el;
}

function removeTextNode(vdom) {
  const { el } = vdom;
  el.remove();
}

function removeElementNode(vdom) {
  const { el, children, listeners } = vdom;

  el.remove();
  children.forEach(destroyDom);

  if (listeners) {
    removeEventListeners(listeners, el);
    delete vdom.listeners;
  }
}

function removeFragmentNode(vdom) {
  const { children } = vdom;
  children.forEach(destroyDom);
}
