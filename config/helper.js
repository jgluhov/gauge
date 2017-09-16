const path = require('path'),
  _root = path.resolve(__dirname, '..');

function root(args) {
  args = [].slice.call(arguments, 0);
  return path.join.apply(path, [_root].concat(args));
}

exports.root = root;
