const { getOptions, stringifyRequest } = require('loader-utils');
const validateOptions = require('schema-utils');
const html2js = require('html2js-loader');

const { parse } = require('./md');

const schema = {
  type: 'object',
  properties: {
    html2js: {
      type: 'object',
      default: {},
      properties: {
        trimWhitespace: {
          type: 'boolean',
          default: false,
        },
        removeComments: {
          type: 'boolean',
          default: false,
        },
        skipEmptyTextNodes: {
          type: 'boolean',
          default: false,
        }
      }
    }
  }
};

module.exports = function (source, map, meta) {
  const _this = this;
  const callback = this.async();
  const options = getOptions(this) || {};
  // const mod = this.loadModule();

  validateOptions(schema, options, 'md2js-loader');

  parse(source, (error, html) => {
    if (error) throw error;

    const js = html2js(html, options.html2js);
    callback(null, js);
  });
};