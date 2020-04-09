import { normalizeUrl, ping } from "./network";

describe("network test", () => {
  it("normalizeUrl test", () => {
    const result = normalizeUrl("baidu.com");
    expect(result).toBe("http://baidu.com");
  });

  it("ping test", async () => {
    const result = await ping.promise.probe("127.0.0.1");
    expect(result.alive).toBe(true);
  });
});
