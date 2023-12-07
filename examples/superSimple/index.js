import {
  createApp,
  h,
  hFragment,
  hString,
} from "https://unpkg.com/cadre-js@0.0.13";

const state = {
  count: 0,
};

const reducers = {
  increment: (state) => ({
    ...state,
    count: state.count + 1,
  }),
  decrement: (state) => ({
    ...state,
    count: state.count - 1,
  }),
};

function App(state, emit) {
  return hFragment([
    h(
      "button",
      {
        class: "btn btn-primary",
        on: {
          click: () => emit("decrement"),
        },
      },
      ["-"]
    ),
    h(
      "span",
      {
        class: "counter",
      },
      [hString(state.count)]
    ),
    h(
      "button",
      {
        class: "btn btn-primary",
        on: {
          click: () => emit("increment"),
        },
      },
      ["+"]
    ),
  ]);
}

createApp({ state, reducers, view: App }).mount(document.getElementById("app"));
