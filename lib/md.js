const marked = require('marked');

exports.parse = (source, callback) => {
    return marked(source, callback);
};
