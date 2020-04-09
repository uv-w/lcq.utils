import _inquirer from "./base/inquirer";
import _commander from "./base/commander";
import _progress from "./base/progress";
import _chalk from "./base/chalk";
import shelljs from "./base/shelljs";

export const ask = _inquirer;
export const progress = _progress;
export const commander = _commander;
export const color = Object.assign(_chalk);
export const shell = shelljs;

export default {
  ask,
  progress,
  commander,
  color,
  shell
};
