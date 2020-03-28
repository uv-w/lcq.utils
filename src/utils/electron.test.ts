import { isWin, isLinux, isMac, isElectron } from "./electron";

test("isWin", () => {
  expect(isWin()).toBe(false);
});
test("isMac", () => {
  expect(isMac()).toBe(true);
});
test("isLinux", () => {
  expect(isLinux()).toBe(false);
});
test("isElectron", () => {
  expect(isElectron()).toBe(false);
});
