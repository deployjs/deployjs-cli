const CommandFactory = require('../../../commands/command-factory');
const expect = require('../../helpers/expect');

describe('CommandFactory', function() {

  describe('running a command', function() {

    it('runs a registered command with the specified project and UI', function() {
      let commandRan = false;

      let mockProject = {
        name: 'project',
        ui: 'ui'
      };

      let mockCommand = {
        run: function(options, args) {
          if(this.project.name === 'project'
            && this.ui === 'ui'
            && options.environment === 'production'
            && args[0] === 'production') {
            commandRan = true;
          }
        }
      };

      let mockOptions = {
        environment: 'production'
      }

      let commandFactory = new CommandFactory();
      commandFactory.commands = {
        'go': mockCommand
      };

      commandFactory.run('go', mockProject, mockOptions);

      expect(commandRan).to.be.true;
    });

    it('throws if no registered command exists', function() {
      let commandFactory = new CommandFactory();
      let runFn = commandFactory.run.bind(commandFactory, 'go');

      expect(runFn).to.throw(/command `go` not supported/)
    });
  });
});
