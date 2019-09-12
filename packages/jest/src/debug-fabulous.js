import { processEnv } from './processEnv';
/* Purpose is to execute all lazy levels of debug in order to gain code coverage */
if (processEnv.DISABLE_DEBUG_MOCK) {
  jest.unmock('debug-fabulous');
  module.exports = require('debug-fabulous');
} else {
  const debug = jest.fn((cb) => {
    if (typeof cb === 'function') return cb();
  });
  debug.spawn = jest.fn().mockReturnValue(debug);

  module.exports = {
    spawnable: jest.fn(() => debug),
  };
}
