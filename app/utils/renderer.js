// @flow
const { Parser } = require('htmlparser2');
const {
  elementOpen,
  elementClose,
  text,
  patch,
} = require('incremental-dom');

const idomParser = new Parser({
  onopentag: (name, attrs) => {
    const listStatics = Object.keys(attrs)
      .reduce((statics, k) => statics.concat([k, attrs[k]]), []);
    elementOpen(name, null, null, ...listStatics);
  },
  ontext: text,
  onclosetag: elementClose,
});

function html2idom(html/*: string*/) {
  idomParser.write(html);
  idomParser.end();
}

function render(el/*: HTMLElement*/, html/*: string*/) {
  patch(el, () => html2idom(html));
}

function renderer(el/*: HTMLElement*/)/*: (html: string) => void */ {
  return html => render(el, html);
}

module.exports = {
  idomParser,
  html2idom,
  render,
  renderer,
};
