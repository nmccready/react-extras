import debugFab from 'debug-fabulous';
import pkg from './package.json';

// module.exports error storybook hell
// https://github.com/storybooks/storybook/issues/5117
const debug = debugFab.spawnable(pkg.name);
export default debug;
