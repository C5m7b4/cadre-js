import { version } from "../package.json";
console.log(`Cadre Version: ${version}`);
export { createApp } from "./app";
export { lipsum } from "./utils/arrays";
export { h, hFragment, hString } from "./h";
export { defineComponent } from "./component";
