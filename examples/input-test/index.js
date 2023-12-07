import {
  createApp,
  h,
  hFragment,
  hString,
} from "https://unpkg.com/cadre-js@0.0.13";

const state = {
  input: "",
};

const reducers = {
  "update-input": (state, payload) => ({
    ...state,
    input: payload,
  }),
  submit: (state) => {
    console.log("submit");
    return {
      ...state,
    };
  },
};

function App(state, emit) {
  return hFragment([
    h("input", {
      type: "text",
      on: {
        input: (e) => emit("update-input", e.target.value),
      },
    }),
    h(
      "button",
      {
        on: {
          click: () => emit("submit"),
        },
      },
      ["Submit"]
    ),
  ]);
}

createApp({ state, reducers, view: App }).mount(document.getElementById("app"));
