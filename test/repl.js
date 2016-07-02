var repl = require('repl');
var pkgJSONInfoDict = require('./fixtures/abc.json');
var pkgJSONOps = require('pkg-json-info-dict').pkgJSONOps;
var DependencyNode = require('../lib').DependencyNode;

var replServer = repl.start({
  prompt: '> '
});

var pkgName = replServer.context.pkgName = 'a';
var pkgJSONInfo = replServer.context.pkgJSONInfo = pkgJSONInfoDict[pkgName];
var dependencyNodes = replServer.context.dependencyNodes = pkgJSONOps.reduceDependencies(pkgJSONInfo.pkgJSON, (acc, depName, ofType) => {
  acc.push(new DependencyNode(depName, ofType, (pkgJSONInfoDict[depName] || {}).pkgJSON, pkgJSONInfo.pkgJSON));
  return acc;
}, []);

replServer.context.result = dependencyNodes.map(node => node.toString());
