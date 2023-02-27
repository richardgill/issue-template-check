---
sidebar_position: 2
sidebar_label: Authentication
---

# Athentication

To use the Xata CLI, you'll have to **authenticate** with it to access your workspaces and databases. You can do this in two ways: scoped to a project (**project mode**), or globally (**global mode**).

### Global Mode

To authenticate globally, across your entire system, run `xata auth login`. This will give you two options:

- **Create a new API Key**. This will open your browser and, when you're logged in to Xata, allow you to create a new [API key](/getting-started/api-keys) for use with the CLI.
- **Use an existing API Key**. This will prompt for an existing key you have, which you can paste into your terminal. We recommend isolating keys per use-case, so creating a new one might be a good idea instead.

Once you supply an API key one way or another, your CLI will be configured globally: we'll store your API key in `~/.config/xata/credentials`.

From now on, when you use the Xata CLI _outside_ of a project (i.e, _globally_) for database operations, you'll have to explicitly use a flag to indicate which database you'd like to work with. You can do this using the `--db [url]` flag. If you omit this flag, you will be interactively prompted to choose a database.

Working with workspaces globally does not require any further flags.

#### Authentication Profiles

The Xata CLI support multiple authentication profiles to manage accounts accessible with different API keys.

To create a named authentication profile, provide the `--profile` parameter to the login command:

```
xata auth login --profile personal
```

This creates a new profile entry in your credentials file at `~/.config/xata/credentials`.

In case no profile parameter is specified, the login command uses the `default` profile.

Once a named login profile is created, you can use it by adding the `--profile` argument to your Xata CLI commands.

### Project Mode

To authenticate in a specific project, run `xata init --db=[databaseUrl]`. You can get your database URL from the workspace configuration page in the Web UI. Replace the `{region}` and `{database}` parts in the Workspace API base URL with your database region and name. This will create some configuration files in your project that the CLI will reference when working with Xata. Here's what happens when you initialize a project:

- If you don't have a workspace, you will be prompted to create one.
- If you have workspaces, you'll be asked to choose one, or to create a new one.

A workspace is a logical grouping of databases, usually analogous to an organization or team, so this is the first step. Once you've chosen a workspace, you will be given the option to either create a new database, or use an existing one for your project. After choosing a workspace and a database, you're ready to go: the CLI will walk you through next steps. Specifically, it will:

- Create a project configuration file in your current working directory (`.xatarc`).
- Create or update your `.env` file to store a database-scoped API key. (At the time of writing these docs it'll actually store a personal API key, but this will change soon).
- Ask you if you'd like to install the SDK and/or use the TypeScript/JavaScript code generator.

When you have a project set up, the Xata CLI will now be aware of your project's configuration, namely which workspace, database, and fallback branch you've chosen. It will know this information by reading it from a new set of files created in your current working directory: `.xatarc` and `.env`. Let's discuss these briefly.

### `.xatarc`

This file contains information about your current Xata project, specifically its database URL, and preferred output path of the generated Xata client that you can use to interact with your database if you've chosen to use it. More about this in code generation.

We recommend checking this file in to your version control system (Git, SVN, etc.) so that you can easily share your project's configuration among your team.

### `.env`

This file contains sensitive information and secrets that ought not be committed to version control. It is recommended that you add this file to `.gitignore`, so that it is not accidentally committed to version control. The Xata CLI appends secrets to this file, namely your API key and fallback branch. More on branches in the [git](#branches--git-integration) section.
