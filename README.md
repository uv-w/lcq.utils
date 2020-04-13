# lcq.utils

一个工具集合

## 安装

```js
$ npm install lcq.utils --save  // yarn add lcq.utils
```

## 使用

### 常用工具

```js
import utils, { request, is, file, cli, string, network, npm } from "lcq.utils";

// is
utils.is.isElectron(); // is.isElectron()
utils.is.isWin(); // is.isWin()
utils.is.isMac(); // is.isMac()
utils.is.isLinux(); // is.isLinux()

// request
const res = await request.get("/api/v1/getUserInfo");

// file
file.open("http://baidu.com"); // 浏览器打开
file.del("/somefile"); // 删除文件
file.mkdirp('./demo')

// string
string.uuid(); // 75cb6b99-c257-41e6-b9f2-ae7ad1d31ce9
string.semver()

// network
network.normalizeUrl("baidu.com"); // => 'http://baidu.com'
await network.ping.promise.probe("127.0.0.1"); // => {alive: true, ...}
await network.getPublicNetworkIp() // => 22.33.44.55
await network.getIpV4() // => 192.168.1.2
await network.getIpV6() // =>
await network.isAt100Tal() // => true、false

// cli
cli.shell.ls("./"); // => show current dir files
console.log(cli.color.blue("this is a blue text for cli color"));

// npm
await npm.getNpmTarball("lcq.utils"); // => https://registry.npm.taobao.org/lcq.utils/download/lcq.utils-${version}.tgz
await npm.getNpmInfo("lcq.utils"); // => {name: 'lcq.utils', versions: [],....}
await npm.getLatestVersion("lcq.utils"); // => 3.0.1
...


```

### terminal 工具

- `lcq-del` 删除本地文件

```console
$ lcq-del ./somefile
```

- `lcq-serve` 在当前目录起一个静态服务

```console
$ cd someDir

$ lcq-serve

->  http://localhost:5000
```

- `lcq-open` 本地浏览器打开链接

```console
$ lcq-open https://baidu.com
```

- `lcq-uuid` 生成一个 uuid

```console
$ lcq-uuid

-> 75cb6b99-c257-41e6-b9f2-ae7ad1d31ce9
```

- `lcq-start` 在一个命令行同时运行多个命令

```package.json
"scripts": {
        // ...
        "watch-js": "...",
        "watch-less": "...",
        "start": "lcq-start \"npm:watch-js\" \"npm:watch-less\""
        // ...
}

->
```

- `lcq-shell` 跨平台的 unix 脚本执行

```console
$ lcq-shell echo hello world

-> hello world
```
