import { ask, progress, commander, color, shell } from "./cli";

// test("ask", async () => {
//   const questions = [
//     {
//       type: "list",
//       name: "type",
//       message: "which item do you want to choose?",
//       choices: ["aa", "bb", "cc"]
//     }
//   ];

//   var answers = await ask(questions);
//   console.log({ answers });
// });
// const bar = progress("process [:bar]", { total: 5 });
// test("progress", done => {
//   expect.assertions(1);
//   const timer = setInterval(() => {
//     console.log({ bar });
//     bar.tick();
//     if (bar.complete) {
//       clearInterval(timer);
//       done();
//     }
//   }, 100);
// });

describe("cli test", () => {
  it("color test", () => {
    console.log(color.blue("this is a blue text for cli color"));
  });

  it("shell test", async () => {
    const result = shell.ls(__dirname);
    expect(result).toEqual(expect.arrayContaining(["cli.test.ts"]));
  });
});
