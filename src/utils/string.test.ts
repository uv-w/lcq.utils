import { uuid, semver } from "./string";

describe("string test", () => {
  it("uuid test", () => {
    const uuidStr = uuid();
    expect(uuidStr).toHaveLength(36);
  });

  it("semver test", () => {
    const result = semver.valid("1.2.3");
    expect(result).toBe("1.2.3");
  });
});
