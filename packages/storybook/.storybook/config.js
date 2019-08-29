import { configure } from '@storybook/react';
import debug from '../debug';

debug.spawn('storybook:config');

const contexts = [require.context('../src', true, /\.story\.(j|t)sx?$/)];
function loadStories() {
  contexts.forEach((req) => {
    const stories = req.keys();
    if (!stories.length) {
      console.error('NO STORIES FOUND: check your context regex!');
      return;
    }
    stories.forEach((filename) => {
      debug.spawn('loadStories')(() => filename);
      req(filename);
    });
  });
}

configure(loadStories, module);
