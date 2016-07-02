import { PkgJSON, DependencyType, NameVersionRangeDict } from 'pkg-json-info-dict/lib';
import { satisfies } from 'semver';

export class DependencyNode {
  constructor(
    private _name: string,
    private _type: DependencyType,
    private _pkgJSON: PkgJSON,
    private _dependentPkgJSON: PkgJSON
  ) {}

  get name(): string {
    return this._name;
  }
  get type(): DependencyType {
    return this._type;
  }
  get pkgJSON(): PkgJSON {
    return this._pkgJSON;
  }
  get dependentPkgJSON(): PkgJSON {
    return this._dependentPkgJSON;
  }

  getVersion(): string {
    return this.pkgJSON ? this.pkgJSON.version : null;
  }

  getVersionRange(): string {
    if (this.dependentPkgJSON) {
      var nvrDict: NameVersionRangeDict = this.dependentPkgJSON[this.type];
      if (nvrDict) {
        var versionRange = nvrDict[this.name];
        return versionRange || null;
      }
    }
    return null;
  }

  getDependentName(): string {
    return this.dependentPkgJSON ? this.dependentPkgJSON.name : null;
  }

  versionIsInRange(): boolean {
    return satisfies(this.getVersion(), this.getVersionRange());
  }

  versionIsInRangeAsStr(): string {
    return this.versionIsInRange() ? '✔' : '✗';
  }

  toString() {
    var version = this.getVersion();
    if (version) {
      return `[${this.type}] ${this.name}: ${this.getVersionRange()} , ${this.getVersion()}   ${this.versionIsInRangeAsStr()}`;
    } else {
      return `[${this.type}] ${this.name}: ${this.getVersionRange()} , Unknown current version`;
    }
  }

}
