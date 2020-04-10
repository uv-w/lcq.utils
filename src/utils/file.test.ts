import { open, del, mkdirp } from "./file";

describe("file test", () => {
  test("mkdirp test", async done => {
    const result = await mkdirp(`${__dirname}/mkdirp_test`);
    expect(result).toBe(`${__dirname}/mkdirp_test`);
    done();
  });

  test("del test", async done => {
    const result = del.sync(`${__dirname}/mkdirp_test`);
    expect(result).toBe(undefined);
    done();
  });

  test("open test", async done => {
    const result = await open("https://baidu.com");
    expect(String(result)).toEqual("[object Object]");
    done();
  });
});
