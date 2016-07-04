var repl = require('repl');
var pkgJSONInfoDict = require('./fixtures/abc.json');
var dependents = require('./fixtures/dependents.json');
var pkgJSONOps = require('pkg-json-info-dict').pkgJSONOps;
var DependencyNode = require('../lib').DependencyNode;
var dependentsOps = require('pkg-dependents').dependentsOps;

var replServer = repl.start({
  prompt: '> '
});

var pkgName = replServer.context.pkgName = 'a';
var pkgJSONInfo = replServer.context.pkgJSONInfo = pkgJSONInfoDict[pkgName];
var dependencyNodes = replServer.context.dependencyNodes = pkgJSONOps.reduceDependencies(pkgJSONInfo.pkgJSON, (acc, depName, ofType) => {
  acc.push(new DependencyNode(depName, ofType, (pkgJSONInfoDict[depName] || {}).pkgJSON, pkgJSONInfo.pkgJSON));
  return acc;
}, []);

replServer.context.dependencyNodesAsStr = dependencyNodes.map(node => node.toString());

var pkgName2 = 'd';
replServer.context.reducedDependents = dependentsOps.reduceDependents(dependents, (acc, dependentName, ofDependentType, ofDependencyType) => {
  var dependentPkgJSON = dependents[ofDependentType][dependentName];
  var depNode = new DependencyNode(pkgName2, ofDependencyType, pkgJSONInfoDict[pkgName2].pkgJSON, dependentPkgJSON.pkgJSON);
  acc.push({
    label: `${dependentName}`,
    nodes: [depNode.toString()]
  });
  return acc;
}, []);
