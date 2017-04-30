const CoreObject = require('core-object');
const path = require('path');

module.exports = CoreObject.extend({
  init(dependencies, ui) {
    this._super.init && this._super.init.apply(this, arguments);

    this.addons = dependencies;
    this.ui = ui;
    this.root = process.cwd();

    this.pkg = require(path.join(this.root, 'package.json'));
  },

  name() {
    return this.pkg.name;
  }
});
