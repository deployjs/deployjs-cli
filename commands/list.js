const ListCommand = require('ember-cli-deploy/lib/commands/list');
const CoreObject = require('core-object');

module.exports = CoreObject.extend({
  init(project) {
    this._super.init && this._super.init.apply(this, arguments);

    this.project = project;
  },
  run(options) {
    ListCommandObject = CoreObject.extend(ListCommand);
    listCommand = new ListCommandObject();
    listCommand.project = this.project;
    listCommand.ui = this.project.ui;

    listCommand.run(options, [ options.environment ]);
  }
});
