module.exports = {
  root: true,
  parser: "babel-eslint",
  parserOptions: {
    sourceType: "module",
    "no-extra-semi": true
  },
  env: {
    browser: true,
    node: true,
    commonjs: true,
    es6: true,
    amd: true
  },
  extends: "standard",
  plugins: ["html", "standard", "promise", "vue"],

  rules: {
    indent: ["error", 2],
    "linebreak-style": ["error", "unix"],
    quotes: ["error", "single"],
    semi: ["error", "never"],
    // allow paren-less arrow functions
    "arrow-parens": 0,
    // allow async-await
    "generator-star-spacing": 0,
    // allow debugger during development
    "no-debugger": process.env.NODE_ENV === "production" ? 2 : 0
  }
};
