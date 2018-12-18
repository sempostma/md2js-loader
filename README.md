<div align="center">
  <a href="https://github.com/webpack/webpack">
    <img width="200" height="200" vspace="" hspace="25"
      src="https://worldvectorlogo.com/logos/webpack.svg">
  </a>
  <a href="https://html2js.esstudio.site">
    <img width="200" height="200" vspace="" hspace="25"
      src="https://html2js.esstudio.site/android-chrome-256x256.png">
  </a>
</div>

# md2js-loader

Exports HTML to javascript instructions. Create javascript functions from HTML templates.

[![GitHub license](https://img.shields.io/github/license/LesterGallagher/md2js-loader.svg)](https://github.com/LesterGallagher/md2js-loader/blob/master/LICENSE.txt)
[![GitHub issues](https://img.shields.io/github/issues/LesterGallagher/md2js-loader.svg)](https://github.com/LesterGallagher/md2js-loader/issues)
[![Twitter](https://img.shields.io/twitter/url/https/www.npmjs.com/package/md2js-loader.svg?style=social)](https://twitter.com/intent/tweet?text=Wow:&url=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fmd2js-loader)

## Install

```bash
npm i -D git+https://github.com/LesterGallagher/md2js-loader.git
```

## Usage

Add the md2js-loader to your webpack.config.js.

```js
{
  test: /\.(markdown|md)$/,
  use: {
    loader: 'md2js-loader',
    options: {}
  }
}
```

Now, simply import/require any markdown files. For example:

```markdown
Example
=======

- 1
- 2
- 3
- 4
```

```js
const createList = require('./templates/list.markdown');

document.body.appendChild(createList());
```

this will be converted to the following javascript:

```javascript
function createNode() {
    var container = document.createDocumentFragment();
    var e_0 = document.createElement("div");
    var e_1 = document.createElement("h1");
    e_1.setAttribute("id", "example");
    e_1.appendChild(document.createTextNode("Example"));
    e_0.appendChild(e_1);
    var e_2 = document.createElement("ul");
    var e_3 = document.createElement("li");
    e_3.appendChild(document.createTextNode("1"));
    e_2.appendChild(e_3);
    var e_4 = document.createElement("li");
    e_4.appendChild(document.createTextNode("2"));
    e_2.appendChild(e_4);
    var e_5 = document.createElement("li");
    e_5.appendChild(document.createTextNode("3"));
    e_2.appendChild(e_5);
    var e_6 = document.createElement("li");
    e_6.appendChild(document.createTextNode("4"));
    e_2.appendChild(e_6);
    e_0.appendChild(e_2);
    container.appendChild(e_0);
    return container;
}
```

The loader will optimize this code by injecting the following base code into your bundle:

```javascript
module.exports = {
    document_createDocumentFragment: () => {
        return document.createDocumentFragment();
    },
    document_createElement: name => {
        return document.createElement(name);
    },
    document_createTextNode: text => {
        return document.createTextNode(text);
    },
    appendChild: (parent, child) => {
        parent.appendChild(child);
    },
    setAttribute: (elem, key, value) => {
        elem.setAttribute(key, value);
    }
};
```

This will enable the compiler to name mangle these function calls.



