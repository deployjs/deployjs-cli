const CoreObject = require('core-object');

const DeployCommand = require('ember-cli-deploy/lib/commands/deploy');
const ActivateCommand = require('ember-cli-deploy/lib/commands/activate');
const ListCommand = require('ember-cli-deploy/lib/commands/list');

module.exports = CoreObject.extend({
  init() {
    this._super.init && this._super.init.apply(this, arguments);

    this.commands = {
      'deploy': DeployCommand,
      'activate': ActivateCommand,
      'list': ListCommand
    };
  },
  run(commandType, project, options) {
    if(!this.commands[commandType]) {
      throw new Error('command `' + commandType + '` not supported');
    }

    let command = new (CoreObject.extend(this.commands[commandType]))();
    command.project = project;
    command.ui = project.ui;

    command.run(options, [ options.environment ]);
  }
});
