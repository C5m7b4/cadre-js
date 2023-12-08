import cleanup from "rollup-plugin-cleanup";
import filesize from "rollup-plugin-filesize";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default {
  input: "src/index.js",
  plugins: [cleanup(), json(), nodeResolve()],
  output: {
    file: "dist/cadre.js",
    format: "esm",
    plugins: [filesize()],
  },
};
