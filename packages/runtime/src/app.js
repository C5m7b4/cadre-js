import { destroyDom } from "./dom/destroy-dom";
import { Dispatcher } from "./dispatcher";
import { mountDom } from "./dom/mount-dom";
import { patchDom } from "./dom/patch-dom";

export function createApp({ state, view, reducers = {} }) {
  let parentEl = null;
  let vdom = null;
  let isMounted = false;

  const dispatcher = new Dispatcher();
  const subscriptions = [dispatcher.afterEveryCommand(renderApp)];

  function emit(eventName, payload) {
    dispatcher.dispatch(eventName, payload);
  }

  for (const actionName in reducers) {
    const reducer = reducers[actionName];

    const subs = dispatcher.subscribe(actionName, (payload) => {
      state = reducer(state, payload);
    });
    subscriptions.push(subs);
  }

  function renderApp() {
    // if (vdom) {
    //   destroyDom(vdom);
    // }
    const newVdom = view(state, emit);
    vdom = patchDom(vdom, newVdom, parentEl);

    // vdom = view(state, emit);
    // mountDom(vdom, parentEl);
  }

  return {
    mount(_parentEl) {
      if (isMounted) {
        throw new Error("The application is already mounted");
      }
      parentEl = _parentEl;
      vdom = view(state, emit);
      mountDom(vdom, parentEl);
      isMounted = true;
    },
    unmount() {
      destroyDom(vdom);
      vdom = null;
      subscriptions.forEach((unsubscribe) => unsubscribe());
      isMounted = false;
    },
  };
}
