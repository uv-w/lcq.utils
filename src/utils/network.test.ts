import {
  normalizeUrl,
  ping,
  getPublicNetworkIp,
  getIpV4,
  getIpV6,
  isAt100tal
} from "./network";

describe("network test", () => {
  it("normalizeUrl test", () => {
    const result = normalizeUrl("baidu.com");
    expect(result).toBe("http://baidu.com");
  });

  it("ping test", async () => {
    const result = await ping.promise.probe("127.0.0.1");
    expect(result.alive).toBe(true);
  });

  it("getPublicNetworkIp test", async () => {
    const ip = await getPublicNetworkIp();
    console.log({ ip });
  });

  it("getIpV4 test", async () => {
    console.log({ getIpV4: getIpV4() });
  });

  it("getIpV6 test", async () => {
    console.log({ getIpV6: getIpV6() });
  });

  it("isAt100tal test", async () => {
    const _isAt100tal = await isAt100tal();
    console.log({ isAt100tal: _isAt100tal });
  });
});
