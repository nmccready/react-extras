jest.mock('./processEnv', () => ({
  processEnv: {
    DISABLE_DEBUG_MOCK: true,
  },
}));

const debugFabTest = require('debug-fabulous');
const debug = require('../../../node_modules/debug-fabulous');

describe('debug-fabulous real', () => {
  it('not mock', () => {
    expect(debug).toEqual(debugFabTest);
  });
  it('spawnable is not mock', () => {
    expect(debug.spawnable).toEqual(debugFabTest.spawnable);
  });
});
