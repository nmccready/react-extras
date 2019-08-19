import { JSDOM } from 'jsdom';

export function createNodeMock() {
  const dom = new JSDOM(`
    <!DOCTYPE html>
    <div id="root">
      <div class="container">
      </div>
    </div>
    `);

  const { document } = dom.window;
  const ret = document.querySelector('.container');
  return ret;
}
