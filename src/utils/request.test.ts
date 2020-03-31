import * as createTestServer from "create-test-server";

import request, { extend } from "./request";

describe("test fetch:", () => {
  let server;

  beforeAll(async () => {
    server = await createTestServer();
    server.get("/foo", "bar");
    server.get("/api/v1/extend", (req, res) => {
      res.send(req.query);
    });
  });

  afterAll(async () => {
    await server.close();
  });

  const prefix = api => `${server.url}/${api}`;

  it("request get test", async () => {
    const getResult = await request.get(prefix("foo"));
    expect(getResult).toEqual("bar");
  });

  it("extend test", async () => {
    const extendRequest = extend({
      timeout: 10000,
      prefix: `${server.url}/api/v1`,
      params: { id: 1 }
    });
    const getResult = await extendRequest("/extend");
    expect(getResult).toStrictEqual({ id: "1" });
  });
});
