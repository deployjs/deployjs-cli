# DeployJS
[![Build Status](https://travis-ci.org/deploy-js/deployjs.svg?branch=master)](https://travis-ci.org/deploy-js/deployjs)

Deploy JS applications with a single command. Based on [ember-cli-deploy](https://github.com/ember-cli-deploy/ember-cli-deploy).

# How to use
1. `npm install -g deploy-js`
2. cherry-pick your plugins fitting to your deployment situation (S3, Azure) from http://ember-cli-deploy.com/plugins/
3. on your project use `npm install deployjs-angular-build` for your Angular 2+ environment, `npm install deployjs-grunt-build` for your grunt-based asset compilation or `npm install deployjs-react-build` to get your React app build and deployed.
4. create `config/deploy.js` containing your deployment configuration, as described in http://ember-cli-deploy.com/docs/v1.0.x/configuration/
5. run `deployjs deploy` to deploy your latest project, `deployjs list` to view all active deployment and `deployjs activate --revision <hash>` to activate a revision.
