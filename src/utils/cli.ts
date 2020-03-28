import { prompt } from "inquirer";
import * as _commander from "commander";
import _color from "./color";

export const ask = prompt;
export const progress = require("progress");
export const commander = _commander;
export const color = Object.assign(_color);
