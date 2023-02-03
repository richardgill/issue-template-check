---
sidebar_position: 1
sidebar_label: Installation
---

# Installation

Once you already got your account and is ready to start, there are 2 steps to go through.

1. Link your project to a Xata Database.
2. Install and generate an instance of the Client SDK.

## Link Your Project

There are multiple ways to link a project to a Xata Database.

1. Via the CLI (quickest and most ergonomic).
2. Via the VS Code Extension (for VS Code users, doesn’t affect your system).
3. Creating a `.xatarc` and a `.env` manually.

> Make sure your app has a way of reading `.env` files in the Node.js runtime.

### Xata CLI

The quickest is probably having the Xata CLI installed and initializing the connection.

```sh
npm install -g @xata.io/cli@latest
```

This will install the package globally in your system and add the `xata` command to your `$PATH`. Once this is done, from the root of your project you can initialize the link.

```sh
xata init
```

When using the CLI from your system, make sure to keep it in sync with your SDK (ideally both in their latest versions), so the generated types are compatible to the instance of the ORM (Object-Relational Mapping).

### VS Code Extension

Our VS Code Extension aims for feature parity with the [Xata Web UI](https://app.xata.io) and it leverages the Xata CLI to provide a all-in-one dashboard/integration mechanism for your projects with via VS Code.

- If you already have a `.env` it will show your Databases in the **Explorer** section.
- If you already have a `.env` and a `.xatarc` it will also show your project’s database in the **Project** section
- If any of those are missing, you’ll see "Get Started" buttons that will trigger some prompts to get you set.

![Xata VS Code Exentsion view](/docs/images/docs/quick-start/vs-code-extension.png)

The full [documentation](https://github.com/xataio/vs-code-extension) is on GitHub.

### Manually

In order to do initialize manually, it will be necessary to hop into the [Xata Web UI]to generate an [API access token](/getting-started/api-keys), and get your database URL.

With the access token, it’s possible to create the `.env` file at the root of your project.

```sh
XATA_API_KEY=<value of your access token>
```

Now, to get the database URL, go to your workspace configurations page:

![Xata Web UI, workspace configuration panel](/docs/images/docs/quick-start/database-url.png)

And now create a new `.xatarc` with your database information.

```json
{
  "databaseUrl": "<database url>"
}
```

With that, we’re off to generating our SDK instance and types!

## Installing the SDK

Now that your project is linked, it’s time to add the Xata Client to your dependencies and generate your schema types.

```sh
npm i @xata.io/client@latest
```

## TypeScript Codegen

Now go to the `.xatarc` generated in the step before, and add an output path to your SDK instance.

```json
{
  "database": "https://your-database-url",
  "codegen": {
    "output": "relative-path/xata.codegen.ts"
  }
}
```

Never tweak the generated file manually. Or your changes might be wiped by the next codegen run.

Once this is done, you can run the **codegen** task. If you have the CLI globally installed, you can hop to the terminal and run:

```shell
xata codegen
```

But if you decided against installing it globally, it is also possible to run via `npx`:

```sh
npx @xata.io/cli@latest codegen
```
