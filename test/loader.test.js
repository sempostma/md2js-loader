const compiler = require('./compiler.js');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');
const marked = require('marked');

test('Loads HTML and outputs JavaScript', async () => {
  const { stats, result } = await compiler('./example.js');

  const { document, Node } = new JSDOM().window; /* expose for eval */
  marked.parse(fs.readFileSync(path.resolve(__dirname, './example.md')).toString(), (err, refHTML) => {
    const ref = document.createElement('div');
    ref.innerHTML = refHTML;
    const rootOfOutputs = document.createElement('div');

    const test = {};
    eval(result); /* sets test output */
    const { output /* fragment */ } = test;
    rootOfOutputs.appendChild(output);

    expect(rootOfOutputs.children.length).toBe(ref.children.length);
  });
});


test('Test loading of inline SVG', async () => {
  const { stats, result } = await compiler('./svg.js');

  const { document, Node } = new JSDOM().window; /* expose for eval */
  const refHTML = fs.readFileSync(path.resolve(__dirname, './svg.md')).toString();
  const refParent = document.createElement('div');
  refParent.innerHTML = refHTML;
  const ref = refParent.firstChild;

  const test = {};
  eval(result); /* sets test output */
  const { output } = test;

  expect(output.tagName).toBe(ref.tagName);
});



