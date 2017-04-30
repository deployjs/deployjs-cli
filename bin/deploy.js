#!/usr/bin/env node

const Project = require('../models/project');
const UI = require('console-ui');

const cli = require('cli');
const discovery = require('../tasks/discover');
const commands = require('../commands');

let options = cli.parse({
  environment: [ 'e', 'A configured deployment environment, i.e. "staging", "production".', 'environment', 'production'],
  verbose: ['v', 'Toggle verbosity', 'bool', false]
}, ['deploy', 'list', 'activate']);

let ui = new UI({
  inputStream: process.stdin,
  outputStream: process.stdout,
  writeLevel: 'INFO'
});

discovery.list().then(function(dependencies) {
  let project = new Project(dependencies, ui);

  let command = new commands[cli.command](project);
  command.run(options);
}).catch(function(error) {
  console.log('[ERROR]');
  console.log(error);
});
