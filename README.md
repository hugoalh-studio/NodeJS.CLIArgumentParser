# \[NodeJS\] CLI Argument Parser

[`hugoalh-studio/NodeJS.CLIArgumentParser`](https://github.com/hugoalh-studio/NodeJS.CLIArgumentParser)

[![GitHub Contributors](https://img.shields.io/github/contributors/hugoalh-studio/NodeJS.CLIArgumentParser?logo=github&logoColor=ffffff&style=flat-square)](https://github.com/hugoalh-studio/NodeJS.CLIArgumentParser/graphs/contributors)
[![License](https://img.shields.io/github/license/hugoalh-studio/NodeJS.CLIArgumentParser?logo=github&logoColor=ffffff&style=flat-square)](./LICENSE.md)
![GitHub Language Count](https://img.shields.io/github/languages/count/hugoalh-studio/NodeJS.CLIArgumentParser?logo=github&logoColor=ffffff&style=flat-square)
![GitHub Top Langauge](https://img.shields.io/github/languages/top/hugoalh-studio/NodeJS.CLIArgumentParser?logo=github&logoColor=ffffff&style=flat-square)
![GitHub Repo Size](https://img.shields.io/github/repo-size/hugoalh-studio/NodeJS.CLIArgumentParser?logo=github&logoColor=ffffff&style=flat-square)
![GitHub Code Size](https://img.shields.io/github/languages/code-size/hugoalh-studio/NodeJS.CLIArgumentParser?logo=github&logoColor=ffffff&style=flat-square)
![GitHub Watchers](https://img.shields.io/github/watchers/hugoalh-studio/NodeJS.CLIArgumentParser?logo=github&logoColor=ffffff&style=flat-square)
![GitHub Stars](https://img.shields.io/github/stars/hugoalh-studio/NodeJS.CLIArgumentParser?logo=github&logoColor=ffffff&style=flat-square)
![GitHub Forks](https://img.shields.io/github/forks/hugoalh-studio/NodeJS.CLIArgumentParser?logo=github&logoColor=ffffff&style=flat-square)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/hugoalh-studio/NodeJS.CLIArgumentParser?logo=codefactor&logoColor=ffffff&style=flat-square)](https://www.codefactor.io/repository/github/hugoalh-studio/nodejs.cliargumentparser)
[![LGTM Alerts](https://img.shields.io/lgtm/alerts/g/hugoalh-studio/NodeJS.CLIArgumentParser.svg?label=%20&logo=lgtm&logoColor=ffffff&style=flat-square)](https://lgtm.com/projects/g/hugoalh-studio/NodeJS.CLIArgumentParser/alerts)
[![LGTM Grade](https://img.shields.io/lgtm/grade/javascript/g/hugoalh-studio/NodeJS.CLIArgumentParser.svg?logo=lgtm&logoColor=ffffff&style=flat-square)](https://lgtm.com/projects/g/hugoalh-studio/NodeJS.CLIArgumentParser/context:javascript)

| **[Release](https://github.com/hugoalh-studio/NodeJS.CLIArgumentParser/releases)** ![](https://img.shields.io/github/downloads/hugoalh-studio/NodeJS.CLIArgumentParser/total?style=flat-square&color=000000&label=%20) | **[Issue](https://github.com/hugoalh-studio/NodeJS.CLIArgumentParser/issues?q=is%3Aissue)** | **[Pull Request](https://github.com/hugoalh-studio/NodeJS.CLIArgumentParser/pulls?q=is%3Apr)** |
|:----|:----|:----|
| **Latest:** ![](https://img.shields.io/github/release/hugoalh-studio/NodeJS.CLIArgumentParser?sort=semver&style=flat-square&color=000000&label=%20) (![](https://img.shields.io/github/release-date/hugoalh-studio/NodeJS.CLIArgumentParser?style=flat-square&color=000000&label=%20))<br />**Pre:** ![](https://img.shields.io/github/release/hugoalh-studio/NodeJS.CLIArgumentParser?include_prereleases&sort=semver&style=flat-square&color=000000&label=%20) (![](https://img.shields.io/github/release-date-pre/hugoalh-studio/NodeJS.CLIArgumentParser?style=flat-square&color=000000&label=%20))<br />[![NPM](https://img.shields.io/npm/v/@hugoalh/cli-argument-parser?logo=npm&logoColor=ffffff&style=flat-square)](https://www.npmjs.com/package/@hugoalh/cli-argument-parser) | **Open:** ![](https://img.shields.io/github/issues-raw/hugoalh-studio/NodeJS.CLIArgumentParser?style=flat-square&color=000000&label=%20)<br />**Closed:** ![](https://img.shields.io/github/issues-closed-raw/hugoalh-studio/NodeJS.CLIArgumentParser?style=flat-square&color=000000&label=%20) | **Open:** ![](https://img.shields.io/github/issues-pr-raw/hugoalh-studio/NodeJS.CLIArgumentParser?style=flat-square&color=000000&label=%20)<br />**Closed:** ![](https://img.shields.io/github/issues-pr-closed-raw/hugoalh-studio/NodeJS.CLIArgumentParser?style=flat-square&color=000000&label=%20) |

## 📜 Description

A module/library and CLI tool to parse CLI argument with hugoalh Studio standard.

[Click here to view the official documentation online.](https://github.com/hugoalh-studio/NodeJS.CLIArgumentParser/wiki)

## 📄 Documentation (Excerpt)

### Getting Started

#### For Module/Library

NodeJS (v10+) & NPM (v6+):

```powershell
> npm install @hugoalh/cli-argument-parser
```

#### For CLI Tool

NodeJS (v10+) & NPM (v6+):

```powershell
> npm install @hugoalh/cli-argument-parser -g
```

### API

- `parse(cliArgument?)`
- ```powershell
  > cli-argument-parser {...cli-argument}
  ```

### Example

```javascript
const cliArgumentParser = require("@hugoalh/cli-argument-parser");

console.log(cliArgumentParser.parse(["--message:=\"Hello, world!\""]));
/*
{
  flag: [],
  line: [],
  pair: {
    message: "Hello, world!"
  },
  unparseable: []
}
*/
```
