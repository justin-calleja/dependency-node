// var dependencyToTree = require('../lib').dependencyToTree;
var pkgJSONInfoDict = require('./fixtures/abc.json');
var pkgJSONOps = require('pkg-json-info-dict').pkgJSONOps;

// Can you build this out of parts?
// add if (depName.startsWith(NEMEA_PREFIX)) to user of defaultTreeMaker
export function treeMaker(pkgJSONInfo, dependencyPkgJSONInfo, dependencyType) {
  if (dependencyPkgJSONInfo) {
    return {
      label: ``,
      nodes: []
    };
  } else {
    return {
      label: `[${dependencyType}] ${}`,
      nodes: []
    };
  }
}

// depencency type
// dep name: dep version range
// latest dep version or unknown
// latest dep version satisfies dep version range or unknown
//
// input: depVersionRange
// latestVersoin and whether it satisfies depVersionRange or unknown

describe('dependencyToTree()', function() {
  it('abc', function () {
    // a has b, c dependencies and d, z peerDependencies where z is not in pkgJSONInfoDict
    var pkgName = 'a';
    pkgJSONOps.reduceDependencies(pkgJSONInfoDict[pkgName], (acc, depName, ofType) => {
      var pkgJSONInfo = pkgJSONInfoDict[pkgName];
      var pkgJSON = pkgJSONInfo.pkgJSON;

      var depPkgJSONInfo = pkgJSONInfoDict[depName];
      var depPkgJSON = depPkgJSONInfo.pkgJSON;
      var depVersion = pkgJSONOps.version(depPkgJSON);
      var depVersionRange = pkgJSONOps.versionRange(depName, ofType, pkgJSON);
      // acc.push(treeMaker());
      return acc;
    }, []);
    // dependencyToTree(pkgName, pkgJSONInfoDict, treeMaker);
  });
});
  return pkgJSONOps.reduceDependencies(pkgJSONInfo.pkgJSON, (acc, depName, ofType) => {
    acc.push(treeMaker(pkgJSONInfo, pkgJSONInfoDict[depName], ofType));
    return acc;
  }, []);
//////////////
    if (depName.startsWith(NEMEA_PREFIX)) {
      var depPkgJSON = pkgJSONInfoDict[depName];
      var depVersionRange = pkgJSONInfo.pkgJSON[ofType][depName];
      if (depPkgJSON) {
        var latestVersion = depPkgJSON.pkgJSON.version;
        var satisfies = semver.satisfies(latestVersion, depVersionRange);
        acc.push({
          label: `[${ofType}] ${depName}: ${depVersionRange} , ${latestVersion}   ${getSatisfiesSymbol(satisfies)}`,
          nodes: []
        });
      } else {
        acc.push({
          label: `[${ofType}] ${depName}: ${depVersionRange} , Unknown latest version - probably because ${depName} is not in npu packages dir`,
          nodes: []
        });
      }
      return acc;
    }
