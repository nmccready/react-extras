// The ESLint browser environment defines all browser globals as valid,
// even though most people don't know some of them exist (e.g. `name` or `status`).
// This is dangerous as it hides accidentally undefined variables.
// We blacklist the globals that we deem potentially confusing.
// To use them, explicitly reference them, e.g. `window.name` or `window.status`.
const restrictedGlobals = require('confusing-browser-globals');
const prettier = require('./.prettierrc');

// https://github.com/babel/babel/issues/8309#issuecomment-449515834
const path = require('path');

module.exports = {
  extends: [
    'airbnb',
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended',
    'prettier/react',
    'prettier/@typescript-eslint',
  ],
  plugins: ['@typescript-eslint'],
  // parser: 'babel-eslint',
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    es6: true,
    browser: true,
    jest: true,
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      alias: [['our-config', path.resolve(__dirname, './config/index.js')]],
      typescript: {},
    },
  },
  rules: {
    'max-len': ['error', { code: prettier.printWidth, ignoreUrls: true }], // KEEP THIS IN SYNC
    indent: 'off',
    '@typescript-eslint/no-var-requires': 0,
    '@typescript-eslint/no-use-before-define': 0,
    'no-unused-vars': 2,
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
    '@typescript-eslint/no-explicit-any': 0,
    '@typescript-eslint/explicit-function-return-type': 0,
    '@typescript-eslint/no-object-literal-type-assertion': 0,
    'react/jsx-no-bind': 0,
    'react/no-children-prop': 0,
    // * BEGIN TODO add to eslint rules
    'no-implicit-globals': 2,
    // 'prettier/prettier': 0,
    // https://github.com/facebook/create-react-app/blob/master/packages/eslint-config-react-app/index.js#L123
    'no-restricted-globals': ['error'].concat(restrictedGlobals, 'requestAnimationFrame'),
    // * END TODO add to eslint rules
    'no-param-reassign': 0, // TODO ['error', { props: false }],
    'no-console': ['error', { allow: ['warn', 'error'] }],
    'comma-dangle': 0,
    'arrow-parens': ['error', 'always'],
    'no-use-before-define': 0,
    'no-plusplus': 0,
    'import/prefer-default-export': 0,
    'implicit-arrow-linebreak': 0,
    'react/jsx-filename-extension': 0,
    'react/sort-comp': 0,
    'class-methods-use-this': 0,
    'react/prop-types': 0, // TODO
    'react/destructuring-assignment': 0,
    'react/no-access-state-in-setstate': 0,
    'react/no-array-index-key': 0, // TODO
    'react/forbid-prop-types': 0,
    'object-curly-newline': 0,
    'consistent-return': 0,
    'no-underscore-dangle': 0,
    'one-var': 0,
    'prefer-destructuring': ['error', { VariableDeclarator: { object: true } }],
    'import/no-named-as-default-member': 0,
    'import/no-named-as-default': 0,
    // https://github.com/benmosher/eslint-plugin-import/issues/458#issuecomment-468235671
    'import/no-extraneous-dependencies': (context) => [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
        packageDir: [context.getFilename(), __dirname],
      },
    ],
    'import/no-dynamic-require': 0,
    // TODO: explore later jsx
    'jsx-a11y/mouse-events-have-key-events': 0,
    'jsx-a11y/click-events-have-key-events': 0,
    'jsx-a11y/no-static-element-interactions': 0,
    'no-continue': 0,
    'no-multi-assign': 0,
    'global-require': 0,
    'react/forbid-foreign-prop-types': 0,
  },
  overrides: [
    {
      plugins: ['jest'],
      env: {
        jest: true,
        node: true,
      },
      files: ['packages/jest/src/**/*.js', '**/*.test.js', '**/*.spec.js'],
      settings: {
        'import/resolver': {
          jest: {
            jestConfigFile: './jest.config.js',
          },
        },
      },
    },
    {
      env: {
        mongo: true,
      },
      files: ['scripts/mongo/*'],
    },
  ],
};
