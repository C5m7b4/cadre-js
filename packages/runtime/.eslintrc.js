module.exports = {
  env: {
    browser: true,
    es2022: true,
    node: true,
  },
  extends: ["eslint:recommended", "import/export"],
  plugins: ["plugin:import/errors", "plugin:import/warnings"],
  overrides: [],
  parserOptions: {
    ecmaVerson: "latest",
    sourceType: "module",
  },
  rules: {},
};
