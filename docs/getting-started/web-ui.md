---
sidebar_position: 3
sidebar_label: Web UI
---

# Manage Data Through Xata Web UI

If you haven't already, [create your Xata account](https://app.xata.io/signin). You will be able to login at [app.xata.io](https://app.xata.io). From here, you can create a **workspace**. Workspaces are like [GitHub organizations](https://docs.github.com/en/organizations), and are intended to represent your organization and securely segment your data. Inside workspaces, you can have multiple databases.

The following steps should get you up to speed with Xata.

## 1. Create a Database

What you’ll see after you login for the first time to Xata is an “Add a database” button. You can use this to create your first database.

![Create database](/images/docs/getting-started/create-database.png)

You will need to select a name and a region. If you are unsure about the region, leave the default of `us-east-1`. If you are building an application for European countries regulations might require you to keep your data in Europe, in that case you can choose `eu-west-1`.

Once your database is created, we’ll need to create one or more **tables**.

## 2. Create Tables

Xata is schemaful and models data with tables, columns, and rows. This structure is called a **[schema](/concepts/schema)**.

The fastest way to get started is to use **Start with sample data** or import a CSV file.

If you want to create your own schema, click **Start from Scratch** and fill out a table name to start with.

We can now define the schema for this table using the “+” icon on the table header. All tables have a required column: the `id` column, which provides a unique identity to each row in the table. For more information about this column, learn more about the [data model](/concepts/data-model#id). It can contain any value that is unique across all rows of data.

![Adding a column](/images/docs/getting-started/add-columns.png)

When adding columns, we note that each column has multiple types to choose from. The data types are defined in the [data model](/concepts/data-model) section of the docs.

As you add more tables, you can view and overview and also edit the schema in the **Schema** page in the UI.

![Schema editor](/images/docs/getting-started/schema-editor.png)

A common use case for relationships between tables is a parent → child type structure. As an example, if we’re building a database for your pets, you might have a `Pets` table, a `Breeds` table, and a `Toys` table. You can use Link columns, like in the screenshot, to represent what breed each pet has, and what is their favorite toy.

## 3. Work with Your Data

From here, we generally recommend adding a little bit of seed data to your database that you can query to ensure everything’s working as expected. You can do this in the UI from the table pages.

The most convenient way to explore the API is by playing with the data in the UI (e.g. setting filters, sorting, selecting columns, etc.) and then clicking the **Get Code Snippet** button. This will bring up a drawer that shows the equivalent API call that you can use to replicate the same query in your own code.

![Get code snippet](/images/docs/getting-started/get-code-snippet.png)

In the **Get code snippet** drawer you will also find information about how to initialize the CLI and SDK on your computer as well as API calls in multiple languages to query, insert, update, and delete data.

You can copy these code snippets into the [SDK Playground](/getting-started/clients#ui-playground) to get familiar with it.

## Next Steps

So far, we’ve created a database, defined a schema, entered data, and consumed it from a client. Next, let’s explore Xata’s [API](/typescript-client/overview) to learn how to work with the data, either via the Xata [Command Line Interface (CLI)](/cli/installation) or from your favorite programming language.
