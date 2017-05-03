const ActivateCommand = require('ember-cli-deploy/lib/commands/activate');
const CoreObject = require('core-object');

module.exports = CoreObject.extend({
  init(project) {
    this._super.init && this._super.init.apply(this, arguments);

    this.project = project;
  },
  run(options) {
    activateCommand = new (CoreObject.extend(ActivateCommand))();
    activateCommand.project = this.project;
    activateCommand.ui = this.project.ui;

    activateCommand.run(options, [ options.environment ]);
  }
});
