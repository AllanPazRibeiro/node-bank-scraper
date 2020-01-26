module.exports = {
  'env': {
    'es6': true,
    'node': true,
    "mocha": true
  },
  'extends': [
    'eslint:recommended',
  ],
  'globals': {
    'Atomics': 'readonly',
    'SharedArrayBuffer': 'readonly',
  },
  'parserOptions': {
    'ecmaVersion': 2018,
  },
  'rules': {
      'object-curly-spacing': [1, 'always'],
      'max-len': [1, { 'code': 140, 'comments': 140 } ]
  },
};
