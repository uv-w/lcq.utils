const fs = require("fs");
const path = require("path");
const progress = require("request-progress");
const request = require("request-promise");
const zlib = require("zlib");
const tar = require("tar");

import * as npmlog from "npmlog";

const { semver } = require("./string");

const { mkdirp } = require("./file");

const envs = ["verbose", "info", "error", "warn"];
const logLevel =
  envs.indexOf(process.env.LOG_LEVEL) !== -1 ? process.env.LOG_LEVEL : "info";

// LOG_LEVEL=verbose lcq-start dev
// npmlog.verbose: 调试日志
// npmlog.info
// npmlog.error
npmlog.level = logLevel;

export const log = npmlog;

/**
 * 获取指定 npm 包版本的 tarball
 */
export function getNpmTarball(
  npm: string,
  version?: string,
  registry?: string
): Promise<string> {
  return getNpmInfo(npm, registry).then((json: any) => {
    if (!semver.valid(version)) {
      version = json["dist-tags"].latest;
    }

    if (
      semver.valid(version) &&
      json.versions &&
      json.versions[version] &&
      json.versions[version].dist
    ) {
      return json.versions[version].dist.tarball;
    }

    return Promise.reject(new Error(`${name}@${version} 尚未发布`));
  });
}

/**
 * 获取 tar 并将其解压到指定的文件夹
 */
export function getAndExtractTarball(
  destDir: string,
  tarball: string,
  progressFunc = state => {},
  formatFilename = (filename: string): string => {
    // 为了兼容
    if (filename === "_package.json") {
      return filename.replace(/^_/, "");
    } else {
      return filename.replace(/^_/, ".");
    }
  }
): Promise<string[]> {
  return new Promise((resolve, reject) => {
    const allFiles = [];
    const allWriteStream = [];
    const dirCollector = [];

    progress(
      request({
        url: tarball,
        timeout: 10000
      })
    )
      .on("progress", progressFunc)
      .on("error", reject)
      .pipe(zlib.Unzip())
      .pipe(new tar.Parse())
      .on("entry", entry => {
        if (entry.type === "Directory") {
          entry.resume();
          return;
        }
        const realPath = entry.path.replace(/^package\//, "");

        let filename = path.basename(realPath);
        filename = formatFilename(filename);

        const destPath = path.join(destDir, path.dirname(realPath), filename);
        const dirToBeCreate = path.dirname(destPath);
        if (!dirCollector.includes(dirToBeCreate)) {
          dirCollector.push(dirToBeCreate);
          mkdirp.sync(dirToBeCreate);
        }

        allFiles.push(destPath);
        allWriteStream.push(
          new Promise(streamResolve => {
            entry
              .pipe(fs.createWriteStream(destPath))
              .on("finish", () => streamResolve())
              .on("close", () => streamResolve()); // resolve when file is empty in node v8
          })
        );
      })
      .on("end", () => {
        if (progressFunc) {
          progressFunc({
            percent: 1
          });
        }

        Promise.all(allWriteStream)
          .then(() => resolve(allFiles))
          .catch(reject);
      });
  });
}

/**
 * 从 register 获取 npm 的信息
 */
export function getNpmInfo(npm: string, registry?: string): Promise<any> {
  const register = registry || getNpmRegistry(npm);
  const url = `${register}/${npm}`;

  return request.get(url).then(response => {
    let body;
    try {
      body = JSON.parse(response);
    } catch (error) {
      return Promise.reject(error);
    }

    return body;
  });
}

/**
 * 获取某个 npm 的所有版本号
 */
export function getVersions(npm: string, registry?: string): Promise<string[]> {
  return getNpmInfo(npm, registry).then((body: any) => {
    const versions = Object.keys(body.versions);
    return versions;
  });
}

/**
 * 根据指定 version 获取符合 semver 规范的最新版本号
 *
 * @param {String} baseVersion 指定的基准 version
 * @param {Array} versions
 */
export function getLatestSemverVersion(
  baseVersion: string,
  versions: string[]
): string {
  versions = versions
    .filter(version => semver.satisfies(version, `^${baseVersion}`))
    .sort((a, b) => {
      return semver.gt(b, a);
    });
  return versions[0];
}

/**
 * 根据指定 version 和包名获取符合 semver 规范的最新版本号
 *
 * @param {String} npm 包名
 * @param {String} baseVersion 指定的基准 version
 */
export function getNpmLatestSemverVersion(
  npm: string,
  baseVersion: string,
  registry?: string
): Promise<string> {
  return getVersions(npm, registry).then(versions => {
    return getLatestSemverVersion(baseVersion, versions);
  });
}

/**
 * 获取某个 npm 的最新版本号
 *
 * @param {String} npm
 */
export function getLatestVersion(npm, registry?: string): Promise<string> {
  return getNpmInfo(npm, registry).then(data => {
    if (!data["dist-tags"] || !data["dist-tags"].latest) {
      log.error("没有 latest 版本号", data);
      return Promise.reject(new Error("Error: 没有 latest 版本号"));
    }

    const latestVersion = data["dist-tags"].latest;
    return latestVersion;
  });
}

export function isAliNpm(npmName?: string): boolean {
  return /^(@alife|@ali|@alipay|@kaola)\//.test(npmName);
}

export function getNpmRegistry(npmName: string = ""): string {
  if (process.env.REGISTRY) {
    return process.env.REGISTRY;
  }

  return "https://registry.npm.taobao.org";
}

export function getUnpkgHost(npmName: string = ""): string {
  if (process.env.UNPKG) {
    return process.env.UNPKG;
  }

  return "https://unpkg.com";
}

export function getNpmClient(npmName: string = ""): string {
  if (process.env.NPM_CLIENT) {
    return process.env.NPM_CLIENT;
  }
  return "npm";
}

export default {
  getLatestVersion,
  getNpmLatestSemverVersion,
  getLatestSemverVersion,
  getNpmRegistry,
  getVersions,
  getUnpkgHost,
  getNpmClient,
  isAliNpm,
  getNpmInfo,
  getNpmTarball,
  getAndExtractTarball,
  log
};
