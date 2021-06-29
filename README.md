# Command Line Parser (NodeJS Edition)

[`CommandLineParser.NodeJS`](https://github.com/hugoalh-studio/command-line-parser-nodejs) - A NodeJS module to parse command line with better standard.

[![GitHub Contributors](https://img.shields.io/github/contributors/hugoalh-studio/command-line-parser-nodejs?label=Contributors&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh-studio/command-line-parser-nodejs/graphs/contributors)
[![GitHub Issues](https://img.shields.io/github/issues-raw/hugoalh-studio/command-line-parser-nodejs?label=Issues&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh-studio/command-line-parser-nodejs/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr-raw/hugoalh-studio/command-line-parser-nodejs?label=Pull%20Requests&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh-studio/command-line-parser-nodejs/pulls)
[![GitHub Discussions](https://img.shields.io/github/discussions/hugoalh-studio/command-line-parser-nodejs?label=Discussions&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh-studio/command-line-parser-nodejs/discussions)
[![GitHub Stars](https://img.shields.io/github/stars/hugoalh-studio/command-line-parser-nodejs?label=Stars&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh-studio/command-line-parser-nodejs/stargazers)
[![GitHub Forks](https://img.shields.io/github/forks/hugoalh-studio/command-line-parser-nodejs?label=Forks&logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh-studio/command-line-parser-nodejs/network/members)
![GitHub Languages](https://img.shields.io/github/languages/count/hugoalh-studio/command-line-parser-nodejs?label=Languages&logo=github&logoColor=ffffff&style=flat-square)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/hugoalh-studio/command-line-parser-nodejs?label=Grade&logo=codefactor&logoColor=ffffff&style=flat-square)](https://www.codefactor.io/repository/github/hugoalh-studio/command-line-parser-nodejs)
[![LGTM Alerts](https://img.shields.io/lgtm/alerts/g/hugoalh-studio/command-line-parser-nodejs?label=Alerts&logo=lgtm&logoColor=ffffff&style=flat-square)
![LGTM Grade](https://img.shields.io/lgtm/grade/javascript/g/hugoalh-studio/command-line-parser-nodejs?label=Grade&logo=lgtm&logoColor=ffffff&style=flat-square)](https://lgtm.com/projects/g/hugoalh-studio/command-line-parser-nodejs)
[![License](https://img.shields.io/static/v1?label=License&message=MIT&color=brightgreen&style=flat-square)](./LICENSE.md)

| **Release** | **Latest** | **Pre** |
|:-:|:-:|:-:|
| [**GitHub**](https://github.com/hugoalh-studio/command-line-parser-nodejs/releases) ![GitHub Total Downloads](https://img.shields.io/github/downloads/hugoalh-studio/command-line-parser-nodejs/total?label=%20&style=flat-square) | ![GitHub Latest Release Version](https://img.shields.io/github/release/hugoalh-studio/command-line-parser-nodejs?sort=semver&label=%20&style=flat-square) (![GitHub Latest Release Date](https://img.shields.io/github/release-date/hugoalh-studio/command-line-parser-nodejs?label=%20&style=flat-square)) | ![GitHub Latest Pre-Release Version](https://img.shields.io/github/release/hugoalh-studio/command-line-parser-nodejs?include_prereleases&sort=semver&label=%20&style=flat-square) (![GitHub Latest Pre-Release Date](https://img.shields.io/github/release-date-pre/hugoalh-studio/command-line-parser-nodejs?label=%20&style=flat-square)) |
| [**NPM**](https://www.npmjs.com/package/@hugoalh/command-line-parser) ![NPM Total Downloads](https://img.shields.io/npm/dt/@hugoalh/command-line-parser?label=%20&style=flat-square) | ![NPM Latest Release Version](https://img.shields.io/npm/v/@hugoalh/command-line-parser/latest?label=%20&style=flat-square) | ![NPM Latest Pre-Release Version](https://img.shields.io/npm/v/@hugoalh/command-line-parser/pre?label=%20&style=flat-square) |

## 📝 Description

### 🌟 Feature

- Easier to remember which is flag and which is option (i.e.: key-value pair).
- Native support for CommonJS and ECMAScript.

## 📚 Documentation

### Getting Started

NodeJS (>= v14.15.0) & NPM (>= v6.14.8):

```sh
npm install @hugoalh/command-line-parser
```

### API

`(commandLine?)`

#### Description

Parse command line.

#### Argument

##### `commandLine?`

`<string[] = []>` Command line that need to parse.

#### Return

`<object>` Parse result.
- **`action`:** `<string[]>`
- **`fault`:** `<string[]>` Unparseable argument.
- **`flag`:** `<string[]>` Flag.
- **`option`:** `<object>` Key-value pair.

### Example

```js
const commandLineParser = require("@hugoalh/command-line-parser");

console.log(commandLineParser(["-test", "--message=\"Hello, world!\"", "lol", "---fail"]));
/*
{
  action: [
    "lol"
  ],
  fault: [
    "---fail"
  ],
  flag: [
    "test"
  ],
  option: {
    message: "Hello, world!"
  }
}
*/
```
