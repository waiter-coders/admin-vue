module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module',
    'no-extra-semi': true
  },
  env: {
    browser: true,
    "node": true,
    "commonjs": true,
    "es6": true,
    "amd": true
  },
  extends: 'standard',
  plugins: ['vue'],

  rules: {
    indent: ['error', 2],
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never']
  }
};
