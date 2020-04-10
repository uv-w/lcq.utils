import _rimraf from "./base/rimraf";
import _open from "./base/open";
import _mkdirp from "./base/mkdirp";

export const open = _open;
export const del = _rimraf;
export const mkdirp = _mkdirp;

export default {
  del,
  open,
  mkdirp
};
