const { JSDOM } = require('jsdom');

const dom = new JSDOM(`<!DOCTYPE html><div id="app"></div></html>`, {
  url: 'http://localhost:3000',
});

global.window = dom.window;
global.document = dom.window.document;
global.DocumentFragment = window.DocumentFragment;
