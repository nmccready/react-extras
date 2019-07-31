export const presets = [
  '@babel/preset-env',
  '@babel/preset-react',
  [
    '@babel/preset-typescript',
    {
      isTSX: true,
      allExtensions: true,
    },
  ],
];

export const sourceType = 'unambiguous';

export const envPlugins = {
  development: ['@babel/plugin-proposal-class-properties', '@babel/transform-runtime'],
  production: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-transform-react-constant-elements',
    '@babel/transform-runtime',
  ],
  test: ['@babel/plugin-proposal-class-properties'],
};

export const env = {
  development: {
    presets,
    plugins: envPlugins.development,
  },
  production: {
    presets,
    plugins: envPlugins.production,
  },
  test: {
    presets,
    plugins: envPlugins.test,
  },
};

// // https://github.com/babel/babel/issues/8309#issuecomment-449515834
// export const moduleResolver = {
//   // https://github.com/tleunen/babel-plugin-module-resolver/issues/338
//   // There seem to be a bug with module-resolver with a mono-repo setup:
//   // It doesn't resolve paths correctly when using root/alias combo, so we
//   // use this function instead.
//   resolvePath(sourcePath) {
//     // This will return undefined if aliases has no key for the sourcePath,
//     // in which case module-resolver will fallback on its default behaviour.
//     return aliases[sourcePath];
//   },
// };

export const plugins = [
  // [
  //   'module-resolver',
  //   {
  //     // https://github.com/tleunen/babel-plugin-module-resolver/issues/338
  //     // There seem to be a bug with module-resolver with a mono-repo setup:
  //     // It doesn't resolve paths correctly when using root/alias combo, so we
  //     // use this function instead.
  //     resolvePath(sourcePath) {
  //       // This will return undefined if aliases has no key for the sourcePath,
  //       // in which case module-resolver will fallback on its default behaviour.
  //       return aliases[sourcePath];
  //     },
  //   },
  // ],
];
