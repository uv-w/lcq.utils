import string from "./string";

describe("string test", () => {
  it("uuid test", () => {
    const uuidStr = string.uuid();
    expect(uuidStr).toHaveLength(36);
  });
});
