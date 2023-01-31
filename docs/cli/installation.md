---
sidebar_position: 1
sidebar_label: Installation
---

# Installation

Our CLI is distributed as an **[NPM package](https://www.npmjs.com/package/@xata.io/cli)** and can be installed using any Node package manager if you've got [Node.js](https://nodejs.org/).

![Installing the Xata CLI](/screenshots/CliInstall.gif)

To install the Xata CLI globally, run the following command:

```sh
npm install -g @xata.io/cli@latest
```

> If you are installing the Xata CLI on Windows using Powershell you may need to wrap this part of the install command in quotes: `'@xata.io/cli'`

This will install the Xata CLI. We recommend installing it globally because it becomes much more convenient to work with: you can invoke a `xata` command from anywhere.

## Not Installing

If by any chance it is inconvenient or not desired to have the Xata CLI installed globally on your system, you can add it as a project dependency or execute the binary directly from your package manager.

- `npx`, `pnpm dlx`, or `yarn`

```sh
npx @xata.io/cli@latest <command>
```

- as a project dependency

```sh
npm run xata <command>
```
