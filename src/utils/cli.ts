import { prompt } from "inquirer";
import * as _commander from "commander";
import _progress from "progress";
import * as chalk from "chalk";

export const ask = prompt;
export const progress = _progress;
export const commander = _commander;
export const color = Object.assign(chalk);

export default {
  ask,
  progress,
  commander,
  color
};
