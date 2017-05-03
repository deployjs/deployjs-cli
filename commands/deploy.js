const DeployCommand = require('ember-cli-deploy/lib/commands/deploy');
const CoreObject = require('core-object');

module.exports = CoreObject.extend({
  init(project) {
    this._super.init && this._super.init.apply(this, arguments);

    this.project = project;
  },
  run(options) {
    deployCommand = new (CoreObject.extend(DeployCommand))();
    deployCommand.project = this.project;
    deployCommand.ui = this.project.ui;

    deployCommand.run(options, [ options.environment ]);
  }
});
