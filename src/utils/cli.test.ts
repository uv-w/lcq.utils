import { ask, progress, commander, color } from "./cli";

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
test("color", () => {
  console.log(color.blue("this is a blue text for cli color"));
  // expect().toBe(false);
});
// test("color", () => {
//   expect(isElectron()).toBe(false);
// });
