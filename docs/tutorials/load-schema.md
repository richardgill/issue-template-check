---
sidebar_position: 2
sidebar_label: Push a Schema
---

# API Guide

## Loading the Schema

The examples in this guide are using the following [schema](/concepts/schema):

```json {"truncate": true}
{
  "tables": [
    {
      "name": "Posts",
      "columns": [
        {
          "name": "title",
          "type": "string"
        },
        {
          "name": "labels",
          "type": "multiple"
        },
        {
          "name": "slug",
          "type": "string"
        },
        {
          "name": "text",
          "type": "text"
        },
        {
          "name": "author",
          "type": "link",
          "link": {
            "table": "Users"
          }
        },
        {
          "name": "createdAt",
          "type": "datetime"
        },
        {
          "name": "views",
          "type": "int"
        }
      ]
    },
    {
      "name": "Users",
      "columns": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "email",
          "type": "email"
        },
        {
          "name": "bio",
          "type": "text"
        },
        {
          "name": "address",
          "type": "object",
          "columns": [
            {
              "name": "street",
              "type": "string"
            },
            {
              "name": "city",
              "type": "string"
            },
            {
              "name": "zipcode",
              "type": "int"
            }
          ]
        },
        {
          "name": "team",
          "type": "link",
          "link": {
            "table": "Teams"
          }
        }
      ]
    },
    {
      "name": "Teams",
      "columns": [
        {
          "name": "name",
          "type": "string"
        },
        {
          "name": "createdAt",
          "type": "datetime"
        },
        {
          "name": "owner",
          "type": "link",
          "link": {
            "table": "Users"
          }
        }
      ]
    }
  ]
}
```

To create a database with this schema, install the [Xata CLI](/cli/installation), create a `tutorial` folder:

```sh
$ mkdir tutorial
$ cd tutorial
```

Then save the JSON above in a file called `schema.json` and run:

```sh
$ xata init --schema=schema.json
```

When prompted, choose to create a new database and name it `tutorial`. You can accept the defaults for the rest of the questions.

## Running the Examples

This guide contains examples using the TypeScript/Javascript SDK as well as examples using the REST API directly, which can be used with any programming language.

If you want to try out the TypeScript/Javascript SDK examples, you can use the built-in Playground.

If you want to try out the REST API examples, you can either use a visual HTTP client like [Postman](https://www.postman.com/), [Insomnia](https://insomnia.rest/), or
a CLI client like [`curl`](https://curl.se/). In this case, you will need to send `Authorization` and `Content-Type` headers like this:

```sh
curl --request POST \
  --url https://tutorial-ng7s8c.us-east-1.xata.sh/db/tutorial:main/tables/Posts/query \
  --header 'Authorization: Bearer <XATA_API_KEY>' \
  --header 'Content-Type: application/json' \
  --data '{"columns":["*","author.*"],"page":{"size":15}}'
```

The URL of your database is based on the Workspace API base URL, which you can get from the Configuration page of your Workspace. Replace the `{region}` and `{database}` sections with the actual region and name of your database, followed by a colon with the branch and the relevant URI endpoint. You can consult the API Reference section in the documentation for details about the URI endpoint and request body where applicable.

Tip: You can click the `Get Code Snippet` in the UI and then select `curl` to see the correct URL to use.
