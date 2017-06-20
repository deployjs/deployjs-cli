#!/usr/bin/env node

const UI = require('console-ui');
const cli = require('cli');

const Project = require('../models/project');
const CommandFactory = require('../commands/command-factory');

const discovery = require('../tasks/discover');

const pkg = require('./package.json');

let options = cli.parse({
  environment: [ 'e', 'A configured deployment environment, i.e. "staging", "production".', 'string', 'production'],
  verbose: ['v', 'Toggle verbosity', 'bool', false],
  revision: ['r', '("activate" only) revision to activate', 'string', false],
  activate: ['a', '("deploy" only) directly activate the deployed revision', 'bool', false]
}, ['deploy', 'list', 'activate']);

let ui = new UI({
  inputStream: process.stdin,
  outputStream: process.stdout,
  writeLevel: 'INFO'
});

ui.write('DeployJS CLI v' + pkg.version);

let commandFactory = new CommandFactory();

discovery.list().then(function(dependencies) {
  let project = new Project(dependencies, ui);

  return commandFactory.run(cli.command, project, options);
}).then(function() {
  ui.write('DeployJS done!');
}).catch(function(error) {
  console.log((error && error.message) ? '[ERROR] -- ' + error.message : error);

  process.exitCode = 1;
});
