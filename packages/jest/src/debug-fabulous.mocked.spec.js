jest.mock('./processEnv', () => ({
  processEnv: {
    DISABLE_DEBUG_MOCK: false,
  },
}));

const debugFabTest = require('debug-fabulous');
const debug = require('../../../node_modules/debug-fabulous');

describe('debug-fabulous mocked', () => {
  it('not mock', () => {
    expect(debug).not.toEqual(debugFabTest);
  });
  it('spawnable is not mock', () => {
    expect(debug.spawnable).not.toEqual(debugFabTest.spawnable);
  });
});
