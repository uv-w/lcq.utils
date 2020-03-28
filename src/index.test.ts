import { cli, electron, file } from "./index";

test("index file test", async done => {
  const result = await file.open("https://baidu.com");
  expect(String(result)).toEqual("[object Object]");
  done();
});
