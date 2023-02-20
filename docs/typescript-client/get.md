---
sidebar_position: 3
sidebar_label: Getting Data
keywords: get, get data, get record, get records, getting record
---

# Querying Records

The general form of a query is:

````ts|json
  ```ts
  import { getXataClient } from "./xata";

  const client = getXataClient();
  const data = await client
    .db[table]
    .select([...])
    .filter({ ... })
    .sort({ ... })
    .page({ ... })
    .getMany();
  ```
  ```json
  // POST https://{your-workspace-slug}.{region}.xata.sh/db/{db_branch_name}/tables/{table_name}/query

  {
    "columns": [...],
    "filter": {
      ...
    },
    "sort": {
      ...
    },
    "page": {
    }
  }
  ```
````

For the REST API example, note that a POST request is used, even though the data is not modified, in order to be able to use a body for the request ([GET requests with a body are non-standard](https://www.rfc-editor.org/rfc/rfc2616#section-4.3)).

All the requests are optional, so the simplest query request looks like this:

````ts|json
  ```ts
  const teams = await xata.db.Teams.getMany()
  ```
  ```json
  // POST https://tutorial-ng7s8c.us-east-1.xata.sh/db/tutorial:main/tables/Teams/query
  ```
````

The response looks like this:

````ts|json
  ```ts
  [
    {
      "createdAt": "2022-10-20T23:49:10.573Z",
      "id": "rec_cd8s4kbo8dsvsjilo1ug",
      "name": "Matrix",
      "owner": {
        "id": "myid"
      }
    }
  ]
  ```
  ```json
  {
    "records": [
      {
        "id": "rec_c8hng2h26un90p8sr7k0",
        "name": "Matrix",
        "owner": {
          "id": "myid"
        },
        "createdAt": "2022-10-20T23:49:10.573Z",
        "xata": {
          "version": 0
        }
      }
    ],
    "meta": {
      "page": {
        "cursor": "jMq7DcIwEIDhnjH-2sWRAsItAT2KkOU8bAgB3Zkqyu6IDei_",
        "more": false
      }
    }
  }
  ```
````

For the REST API example, note that the `id` and `xata.version` are included in the returned records. We will discuss the `meta.page` object when we talk about [paginating](#paginating-results) through the records.

## The TypeScript SDK functions for querying

The TypeScript SDK provides three methods for querying multiple records:

- `getPaginated()`: returns a page of records in the query results. Note that the response type is different from `getMany()` and `getAll()`.

```ts
const page = await xata.db.Posts.getPaginated({
  pagination: { size: 100, offset: 0 }
})

const firstPageRecords = page.records // Items 1...100

const hasNextPage = page.hasNextPage()
const nextPage = await page.nextPage()
const nextPageRecords = nextPage.records // Items 101...200

const hasAnotherNextPage = page.hasNextPage()
// Request different page size for this next call for items 101...110
const anotherPageWithDifferentSize = await page.nextPage(10)
const differentSizedPage = anotherPageWithDifferentSize.records
```

- `getAll()`: returns all the records in the query results. Warning: this is dangerous on large tables (more than 10,000 records), as it will potentially load a lot of data into memory and create a lot of requests to the server.
- `getMany()`: returns the requested number of records for the query in a single response. The default is 20 records, but you can change it by modifying the pagination size.

```ts
const page = await xata.db.Posts.getMany({
  pagination: { size: 100 }
})
```

Both the `getAll()` and `getMany()` will produce multiple requests to the server if the query should return more than the maximum page size, combining all results in a single response. It's important to be aware of this because it can cause multiple round-trips to the server, which can affect the latency.
The `getPaginated()` call always performs a single request, therefore it performs a single round-trip.

Unless you have a specific reason to prefer another method, we generally recommend `getMany()`, as the best balance between usability and performant defaults, and it is the method that we use in our examples.

## Getting a Record by ID

You can retrieve a recorded with a given ID using a request like this:

````ts|json
  ```ts
  const user = await xata.db.Users.read("myid");
  ```
  ```json
  // GET https://tutorial-ng7s8c.us-east-1.xata.sh/db/tutorial:main/tables/Users/data/myid
  ```
````

## Columns Selection

By default, the Query API returns all columns of the queried table. For link columns, only the ID column of the linked records is included in the response. You can use column selection to both reduce the number of columns returned, and to include columns from linked tables.

For example, if you are only interested in the name and the city of the user, you can make a request like this:

````ts|json
  ```ts
  const users = await xata.db.Users
    .select(["name", "address.city"])
    .getMany();
  ```
  ```json
  // POST https://tutorial-ng7s8c.us-east-1.xata.sh/db/tutorial:main/tables/Users/query

  {
    "columns": ["name", "address.city"]
  }
  ```
````

A sample response will look like this:

```json
{
  "address": {
    "city": "New York"
  },
  "id": "myid",
  "name": "Keanu Reave",
  "xata": {
    "version": 1
  }
}
```

It's worth noting that the special columns [id](/concepts/data-model#id) and [xata.version](/concepts/data-model#xata-version) are always returned, even if they are not explicitly requested.

You can select all the sub-columns of an object type by using the wildcard `*` character. For example, if you want to select all the columns of the `address` object, you can use `address.*`:

````ts|json
  ```ts
  const users = await xata.db.Users
    .select(["name", "address.*"])
    .getMany();
  ```
  ```json
  // POST https://tutorial-ng7s8c.us-east-1.xata.sh/db/tutorial:main/tables/Users/query

  {
    "columns": ["name", "address.*"]
  }
  ```
````

### Selecting Columns from the Linked Tables

The same syntax can be used to select columns from a linked table, therefore adding new columns to the response. For example, to query all the columns
of the Teams table and also add all the columns of the owner user, you can use:

````ts|json
  ```ts
  const teams = await xata.db.Teams
    .select(["*", "owner.*"])
    .getMany();
  ```
  ```json
  // POST https://tutorial-ng7s8c.us-east-1.xata.sh/db/tutorial:main/tables/Teams/query

  {
    "columns": ["*", "owner.*"]
  }
  ```
````

You can do this transitively as well, for example:

````ts|json
  ```ts
  const users = await xata.db.Posts.select([
    "title",
    "author.*",
    "author.team.*",
  ]).getMany();
  ```
  ```json
  // POST https://tutorial-ng7s8c.us-east-1.xata.sh/db/tutorial:main/tables/Posts/query

  {
    "columns": ["title", "author.*", "author.team.*"]
  }
  ```
````

In this example, the `author` is a link column from `Posts` to `Users` and `team` is a link column from `Users` to `Teams`.

## Filtering Records

This section contains a few examples of how to use filtering. To find all supported operators and examples for them, see the [Filtering](/typescript-client/filtering) section of the API Guide.

To filter the results, use the `filter` function/parameter. For example:

````ts|json
  ```ts
  const users = await xata.db.Users
    .filter({ email: "keanu@example.com" })
    .getMany();
  ```
  ```json
  // POST https://tutorial-ng7s8c.us-east-1.xata.sh/db/tutorial:main/tables/Users/query

  {
    "filter": {
      "email": "keanu@example.com"
    }
  }
  ```
````

Will return only the records with the given email address.

To refer to nested columns, you can use either the dot notation:

````ts|json
  ```ts
  const users = await xata.db.Users
    .filter({ "address.zipcode": 12345 })
    .getMany();
  ```
  ```json
  // POST https://tutorial-ng7s8c.us-east-1.xata.sh/db/tutorial:main/tables/Users/query

  {
    "filter": {
      "address.zipcode": 12345
    }
  }
  ```
````

Or the equivalent nested object:

````ts|json
  ```ts
  const users = await xata.db.Users
    .filter({ address: { zipcode: 12345 } })
    .getMany();
  ```
  ```json
  // POST https://tutorial-ng7s8c.us-east-1.xata.sh/db/tutorial:main/tables/Users/query

  {
    "filter": {
      "address": {
        "zipcode": 12345
      }
    }
  }
  ```
````

You can also refer to a linked column in filters, for example:

````ts|json
  ```ts
  const users = await xata.db.Users
    .filter({ "team.name": "Matrix" })
    .getMany();
  ```
  ```json
  // POST https://tutorial-ng7s8c.us-east-1.xata.sh/db/tutorial:main/tables/Users/query

  {
    "filter": {
      "team.name": "Matrix"
    }
  }
  ```
````

Note that in the above, `name` is a column in the `Teams` table, and we can refer to it even when querying the `Users` table.

To give a more complex filtering example, consider the following:

````ts|json
  ```ts
  const users = await xata.db.Users
    .filter({
      "address.zipcode": { $gt: 100 },
      $any: [
        { name: { $contains: "Keanu" } },
        { name: { $contains: "Carrie" } },
      ]
    })
    .getMany();
  ```
  ```json
  // POST https://tutorial-ng7s8c.us-east-1.xata.sh/db/tutorial:main/tables/Users/query

  {
    "filter": {
      "address.zipcode": {
        "$gt": 100
      },
      "$any": [
        {
          "name": { "$contains": "Keanu" }
        },
        {
          "name": { "$contains": "Carrie" }
        }
      ]
    }
  }
  ```
````

Translating the above filter in English: filter all users with a zipcode greater than 100, and the full name contains either "Keanu" or "Carrie".

The example above demonstrates several operators:

- `$gt`: which can be applied to number columns, and means "greater than".
- `$contains`: which can be applied to string columns, and does a substring match.
- `$any`: which can be used to create OR conditions. The record matches if any of the conditions enclosed are true.

To see the rest of the operators available, check out the [Filtering](/typescript-client/filtering) guide.

## Sorting the Results

To sort the results, use the `sort` function/parameter. For example:

````ts|json
  ```ts
  const users = await xata.db.Users
    .sort("name", "asc")
    .getMany();
  ```
  ```json
  // POST https://tutorial-ng7s8c.us-east-1.xata.sh/db/tutorial:main/tables/Users/query

  {
    "sort": {
      "name": "asc"
    }
  }
  ```
````

To sort descending, use `desc` instead of `asc`:

````ts|json
  ```ts
  const users = await xata.db.Users
    .sort("name", "desc")
    .getMany();
  ```
  ```json
  // POST https://tutorial-ng7s8c.us-east-1.xata.sh/db/tutorial:main/tables/Users/query

  {
    "sort": {
      "name": "desc"
    }
  }
  ```
````

It is also possible to have secondary sort criteria. For example:

````ts|json
  ```ts
  const users = await xata.db.Users
    .sort("address.city", "desc")
    .sort("name", "asc")
    .getMany();
  ```
  ```json
  // POST https://tutorial-ng7s8c.us-east-1.xata.sh/db/tutorial:main/tables/Users/query

  {
    "sort": [
      {
        "address.city": "desc"
      },
      {
        "name": "asc"
      }
    ]
  }
  ```
````

## Paginating Results

This section doesn't apply to the TypeScript SDK, because it is offering a higher-level abstraction over the pagination mechanism. See the
[query functions](/typescript-client/get#the-typescript-sdk-functions-for-querying) section. Only REST API examples are provided in this section.

Xata offers two types of pagination:

- offset-based, using `offset` and `limit` parameters
- cursor-based, using `after` and `before` parameters

### Offset-based Pagination

The offset-page pagination is limited to querying up to 1000 records and is recommended only for usecases where you don't expect the number of records to grow beyond that. In most cases, you should use the cursor-based pagination.

An example of offset based pagination:

```json
// POST https://tutorial-ng7s8c.us-east-1.xata.sh/db/tutorial:main/tables/Users/query

{
  "page": {
    "offset": 10,
    "size": 10
  }
}
```

### Cursor-based Pagination

When running a query, you can specify a particular page size. For example:

```json
// POST https://tutorial-ng7s8c.us-east-1.xata.sh/db/tutorial:main/tables/Users/query

{
  "page": {
    "size": 2
  }
}
```

Returns only the first two records:

```json
{
  "records": [
    {
      "address": {
        "street": "123 Main St",
        "zipcode": 12345
      },
      "email": "keanu@example.com",
      "full_name": "Keanu Reeves",
      "id": "rec_c8hnbch26un1nl0rthkg",
      "team": {
        "id": "rec_c8hng2h26un90p8sr7k0"
      },
      "xata": {
        "version": 2
      }
    },
    {
      "address": null,
      "email": "laurence@example.com",
      "full_name": "Laurence Fishburne",
      "id": "rec_c8hnnh126unff00ifhhg",
      "team": {
        "id": "rec_c8hng2h26un90p8sr7k0"
      },
      "xata": {
        "version": 0
      }
    }
  ],
  "meta": {
    "page": {
      "cursor": "VMoxDsIwDAXQnWP8OUPSASFfAnZUoZDWtSEEyTFT1bujion9PdKK_",
      "more": true
    }
  }
}
```

In this case, notice that the `meta.page` objects contains `"more": true`. This is an indication that there are more records available. The `"cursor"` key is a pointer to the current page. To retrieve the next page of results, you can make a request like this:

```json
// POST https://tutorial-ng7s8c.us-east-1.xata.sh/db/tutorial:main/tables/Users/query

{
  "page": {
    "size": 2,
    "after": "VMoxDsIwDAXQnWP8OUPSASFfAnZUoZDWtSEEyTFT1bujion9PdKK_"
  }
}
```

You can continue like this until `"more"` is returned as `false`.

You can find more infromation about pagination in the [API reference](/api-reference/db/db_branch_name/tables/table_name/query#pagination).

## Next Steps

Now that we can get retrieve data from a database, we might be interested in [creating more data](/typescript-client/insert), [updating data](/typescript-client/update) or [deleting data](/typescript-client/delete). We've got guides for each of these operations.

## Using the Replica Store

By specifying the option `consistency: eventual` the query request will be serviced by the Replica Store which has a small, typically insignificant, propagation delay compared to the Primary Store as outlined in the [Data Model](/concepts/data-model) guide.

The default value for the consistency option is `strong`, which retrieves data from the Primary Store and guarantees that the response is up to date with the latest state of the record content.

It is recommended to use the Replica Store for queries wherever possible, in order to get the best possible performance out of your branch's assigned units.

````ts|json
  ```ts
  const page = await xata.db.Users.getPaginated({
    consistency: "eventual"
  })
  ```
  ```json
  //POST https://tutorial-ng7s8c.us-east-1.xata.sh/db/tutorial:main/tables/Users/query

  {
    "columns": ["*"],
    "consistency": "eventual"
  }
  ```
```
````
