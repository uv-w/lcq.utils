// const { createCanvas, loadImage } = require("canvas");
import { uuid, semver, qrcode } from "./string";

describe("string test", () => {
  it("uuid test", () => {
    const uuidStr = uuid();
    expect(uuidStr).toHaveLength(36);
  });

  it("semver test", () => {
    const result = semver.valid("1.2.3");
    expect(result).toBe("1.2.3");
  });

  it("qrcode test", async () => {
    // const canvasEl = createCanvas(200, 200);
    // const ctx = canvasEl.getContext("2d");
    qrcode
      .toCanvas("some text")
      .then(canvasEl => {})
      .catch(error => {
        expect(error.message).toBe("You need to specify a canvas element");
      });
  });
});
