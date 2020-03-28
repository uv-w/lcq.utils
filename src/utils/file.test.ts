import { open, del } from "./file";

test("file open test", async done => {
  const result = await open("https://baidu.com");
  expect(String(result)).toEqual("[object Object]");
  done();
});
