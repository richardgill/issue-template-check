---
sidebar_position: 2
sidebar_label: Create schema from code
---

## Create schema from code

The Xata CLI allows you to create a database schema programatically by using `xata init` with the `--schema` parameter and a properly formatted JSON file. For example. Given the JSON file below, we could create `Posts`, `Users` and `Teams` tables into a new database.

```
xata init --schema /path/to/json_file.json
```

```json
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
