// OMFG, babel and a monorepo is a nightmare
// https://github.com/facebook/jest/issues/6933#issuecomment-419904621
// https://babeljs.io/docs/en/v7-migration
// https://github.com/babel/babel/issues/8900#issuecomment-431240426
// https://github.com/babel/babel/issues/8309#issuecomment-449515834
// eslint-disable-next-line
import { env, sourceType, plugins } from './babel.internals';

export default (api) => {
  api.cache(true);
  return {
    babelrcRoots: ['.', './packages/*'],
    ignore: [/node_modules/],
    sourceType,
    env,
    plugins,
  };
};
