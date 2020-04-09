import _normalizeUrl from "./base/normalize-url";
import _ping from "./base/ping";
import internalIp from "./base/internal-ip";
import request from "./request";

export const normalizeUrl = _normalizeUrl;
export const ping = _ping;
export const getIpV4 = internalIp.v4.sync;
export const getIpV6 = internalIp.v6.sync;

export const getPublicNetworkIp = async () => {
  const result = await request("http://pv.sohu.com/cityjson?ie=utf-8");
  let ipstr = result.match(/\d+\.\d+\.\d+\.\d+/g);
  return ipstr && ipstr.length ? ipstr[0] : "";
};

// 是否在好未来内网 https://git.100tal.com/
export const isAt100tal = async () => {
  try {
    const result = await request.get("https://git.100tal.com/", {
      timeout: 3000
    });
    return result && result.includes("集团代码库");
  } catch (error) {
    return false;
  }
};

export default {
  normalizeUrl,
  ping,
  getPublicNetworkIp,
  getIpV4,
  getIpV6,
  isAt100tal
};
