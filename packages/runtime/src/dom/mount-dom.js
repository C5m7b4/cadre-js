import { DOM_TYPES } from "../h";
import { setAttributes } from "../props/attributes";
import { addEventListeners } from "../props/events";
import { extractPropsAndEvents } from "../utils/props";
import { enqueueJob } from "../scheduler";

export function mountDom(vdom, parentEl, index, hostComponent = null) {
  switch (vdom.type) {
    case DOM_TYPES.TEXT: {
      createTextNode(vdom, parentEl, index);
      break;
    }

    case DOM_TYPES.ELEMENT: {
      createElementNode(vdom, parentEl, index, hostComponent);
      break;
    }

    case DOM_TYPES.FRAGMENT: {
      createFragmentNode(vdom, parentEl, index, hostComponent);
      break;
    }

    case DOM_TYPES.COMPONENT: {
      createComponentNode(vdom, parentEl, index, hostComponent);
      enqueueJob(() => vdom.component.onMounted());
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

function createFragmentNode(vdom, parentEl, index, hostComponent) {
  const { children } = vdom;
  vdom.el = parentEl;

  children.forEach((child, i) =>
    mountDom(child, parentEl, index ? index + i : null, hostComponent)
  );
}

function createElementNode(vdom, parentEl, index, hostComponent) {
  const { tag, children } = vdom;

  const element = document.createElement(tag);
  addProps(element, vdom, hostComponent);
  vdom.el = element;

  children.forEach((child) => mountDom(child, element, null, hostComponent));
  insert(element, parentEl, index);
}

function addProps(el, vdom, hostComponent) {
  const { props: attrs, events } = extractPropsAndEvents(vdom);

  vdom.listeners = addEventListeners(events, el, hostComponent);
  setAttributes(el, attrs);
}

function createComponentNode(vdom, parentEl, index, hostComponent) {
  const Component = vdom.tag;
  const { props, events } = extractPropsAndEvents(vdom);
  const component = new Component(props, events, hostComponent);

  component.mount(parentEl, index);
  vdom.component = component;
  vdom.el = component.firstElement;
}
