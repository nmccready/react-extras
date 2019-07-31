const debug = require('./debug').spawn('jest');

const toNotIgnore = {
  modules: [].join('|'),
};

const toExport = {
  projects: ['<rootDir>/packages/*/jest.config.js'],
  // moduleFileExtensions: ['js', 'css', 'ts'],
  transformIgnorePatterns: [
    'node_modules',
    '/<rootDir>/packages/lib',
    '/<rootDir>/(?!packages)/.*/',
  ],
  // transform: {
  //   '^.+\\.(j|t)sx?$': 'babel-jest',
  //   '.+\\.(css|styl|less|sass|scss|pcss)$':
  //     '<rootDir>/node_modules/jest-css-modules-transform',
  // },
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/packages/jest/src/assetsTransformer.js',
    '\\.(css|less|pcss)(!js)$': '<rootDir>/packages/jest/src/assetsTransformer.js',
    'our-config': '<rootDir>/config/index.js',
    // makes eslint happy even though this is auto resolution for mocks
    TestHook: '<rootDir>/packages/jest/src/TestHook.js',
    reactTest: '<rootDir>/packages/jest/src/reactTest.js',
  },
  setupFilesAfterEnv: ['<rootDir>/packages/jest/src/setup.js'],
  verbose: true,
};

if (toNotIgnore.modules.length) {
  toExport.transformIgnorePatterns.push(`/node_modules/(?!(${toNotIgnore.modules}))`);
}

debug(() => toExport.transformIgnorePatterns);

module.exports = toExport;
