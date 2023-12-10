import { destroyDom } from "./dom/destroy-dom";
import { mountDom } from "./dom/mount-dom";
import { h } from "./h";

export function createApp(RootComponent, props = {}) {
  let parentEl = null;
  let isMounted = false;
  let vdom = null;

  function reset() {
    parentEl = null;
    isMounted = false;
    vdom = null;
  }

  return {
    mount(_parentEl) {
      if (isMounted) {
        throw new Error("The application is already mounted");
      }
      parentEl = _parentEl;
      vdom = h(RootComponent, props);
      mountDom(vdom, parentEl);
      isMounted = true;
    },

    unmount() {
      if (!isMounted) {
        throw new Error("The application is not mounted");
      }

      destroyDom(vdom);
      reset();
    },
  };
}
