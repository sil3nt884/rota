// eslint-disable-next-line no-undef
module.exports = {
  'root': true,
  'parser': '@typescript-eslint/parser',
  'plugins': [
    '@typescript-eslint',
  ],
  'extends': [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'google',
  ],
  'rules': {
    'max-len': 0,
  },
  'ignorePatterns': ['dist/*'],
};
