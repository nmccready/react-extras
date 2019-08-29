import util from 'util';
import { module as makeModule, plugins, resolve, node } from '@znemz/js-common-webpack-config';

const debug = require('../debug').default;

const rules = makeModule({
  webpack: {
    rules: {
      css: {
        styleLoader: {
          loader: 'style-loader',
          options: {
            insertAt: 'top',
          },
        },
      },
    },
  },
  css: {
    sourceMap: true,
  },
}).default;

const config = {
  devtool: 'cheap-module-source-map',
  node,
  mode: 'development',
  resolve,
  module: { rules },
  plugins: [plugins.NoEmitOnErrors, plugins.DEBUG, plugins.HardSource],
};

debug(() => ({
  webpack: util
    .inspect(config, false, 8)
    .replace(/\n/g, '')
    .replace(/\\'/g, ''),
}));

export default config;
