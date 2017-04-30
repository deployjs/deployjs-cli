const exec = require('child_process').exec;
const path = require('path');
const Promise = require('promise');

let _flattenNestedDependencies = function(dependencies) {
  let result = dependencies;

  Object.keys(dependencies).map(function(packageName) {
    return dependencies[packageName];
  }).forEach(function(pkg) {
    if(pkg && pkg.dependencies) {
      Object.assign(result, _flattenNestedDependencies(pkg.dependencies));
    }
  });

  return result;
};

let _filterDependencies = function(dependencies) {
  return Object.keys(dependencies).filter(function(packageName) {
    let keywords = dependencies[packageName].keywords;

    if(keywords &&
      (keywords.indexOf('deployjs-plugin') !== -1 || keywords.indexOf('ember-cli-deploy-plugin') !== -1)) {
      return true;
    }
    return false;
  }).map(function(packageName) {
    // push the ember-cli-deploy-plugin onto the package for discovery
    dependencies[packageName].keywords.push('ember-cli-deploy-plugin');
    return dependencies[packageName];
  });
}

let _loadDependencies = function(dependencies) {
  return Object.keys(dependencies).map(function(packageName) {
    return dependencies[packageName];
  }).map(function(dependency) {
    let loadedDependency;

    if(dependency.main) {
      loadedDependency = require(path.join(dependency.path, dependency.main));
    } else {
      loadedDependency = require(dependency.path);
    }
    
    loadedDependency.pkg = dependency;
    return loadedDependency;
  });
}

module.exports = {
  list: function() {
    return new Promise(function(resolve, error) {
      exec('npm ls --depth=10 --json --long', {maxBuffer: 1024 * 1024 * 32}, function(err, stdout, stderr) {
        let dependencies = JSON.parse(stdout).dependencies;
        let flattenedDependencies = _flattenNestedDependencies(dependencies);
        let filteredDependencies = _filterDependencies(flattenedDependencies);
        let loadedDependencies = _loadDependencies(filteredDependencies);

        resolve(loadedDependencies);
      });
    });
  }
};
