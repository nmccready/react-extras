import storybook from '@storybook/react/standalone';
import path from 'path';

storybook({
  mode: 'dev',
  https: false,
  configDir: path.join(__dirname),
  port: 9001,
});
