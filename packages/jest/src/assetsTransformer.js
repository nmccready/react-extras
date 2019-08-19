//---------------------------------------------------------------------
// This is a fix for jest handling static assets like imported images
// when running tests. It's configured in jest section of package.json
//
// See:
// https://github.com/facebook/jest/issues/2663#issuecomment-317109798
//---------------------------------------------------------------------
import path from 'path';

export const assetTransformer = {
  process(src, filename /* , config, options */) {
    return `module.exports = ${JSON.stringify(path.basename(filename))}`;
  },
};

export default assetTransformer;
