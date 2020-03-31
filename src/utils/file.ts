import _rimraf from "./base/rimraf";
import _open from "./base/open";

export const open = _open;
export const del = _rimraf;

export default {
  del,
  open
};
