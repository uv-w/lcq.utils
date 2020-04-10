import {
  getLatestVersion,
  getNpmLatestSemverVersion,
  getLatestSemverVersion,
  getNpmRegistry,
  getUnpkgHost,
  getNpmClient,
  isAliNpm,
  getVersions,
  getNpmInfo,
  getNpmTarball,
  getAndExtractTarball,
  log
} from "./npm";

// const utilsVersion: string = require("../../package.json").version;
describe("npm test", () => {
  it("getNpmTarball test", async done => {
    const result = await getNpmTarball("lcq.utils");
    const version = await getLatestVersion("lcq.utils");
    expect(result).toMatch(
      `https://registry.npm.taobao.org/lcq.utils/download/lcq.utils-${version}.tgz`
    );
    done();
  });

  it("getNpmInfo test", async done => {
    const result = await getNpmInfo("lcq.utils");
    expect(result.name).toBe("lcq.utils");
    done();
  });

  it("getVersions test", async done => {
    const result = await getVersions("lcq.utils");
    expect(result).toEqual(expect.arrayContaining(["3.0.0"]));
    done();
  });

  it("getLatestSemverVersion test", async done => {
    const result = await getLatestSemverVersion("3.0.3", [
      "3.0.0",
      "3.0.9",
      "3.1.0",
      "3.3.2"
    ]);
    expect(result).toBe("3.0.9");
    done();
  });

  it("getLatestVersion test", async done => {
    const result = await getLatestVersion("lcq.utils");
    expect(result).toMatch(/^\d+\.\d+\.\d+/);
    done();
  });

  it("getNpmLatestSemverVersion test", async done => {
    const version = await getLatestVersion("lcq.utils");
    const result = await getNpmLatestSemverVersion("lcq.utils", version);
    expect(result).toBe(version);
    done();
  });
});
