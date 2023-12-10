import { withoutNulls } from "./utils/arrays";

export const DOM_TYPES = {
  TEXT: "text",
  ELEMENT: "element",
  FRAGMENT: "fragment",
  COMPONENT: "component",
};

export function h(tag, props = {}, children = []) {
  const type =
    typeof tag === "string" ? DOM_TYPES.ELEMENT : DOM_TYPES.COMPONENT;
  return {
    tag,
    props,
    type,
    children: mapTextNodes(withoutNulls(children)),
  };
}

export function mapTextNodes(children) {
  return children.map((child) =>
    typeof child === "string" || typeof child === "number"
      ? hString(child)
      : child
  );
}

export function hString(str) {
  return { type: DOM_TYPES.TEXT, value: str };
}

export function hFragment(vNodes) {
  assert(Array.isArray(vNodes), "hFragment expects an array of vNodes");
  return {
    type: DOM_TYPES.FRAGMENT,
    children: mapTextNodes(withoutNulls(vNodes)),
  };
}

export function extractChildren(vdom) {
  if (vdom.children == null) {
    return [];
  }

  const children = [];

  for (const child of vdom.children) {
    if (child.type === DOM_TYPES.FRAGMENT) {
      children.push(...extractChildren(child, children));
    } else {
      children.push(child);
    }
  }

  return children;
}

function assert(condition, message = "Assertion faile") {
  if (!condition) {
    throw new Error(message);
  }
}
