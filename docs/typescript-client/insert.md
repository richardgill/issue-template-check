---
sidebar_position: 2
sidebar_label: Creating Data
---

# Creating Records

You can create a record like this:

````ts|json
  ```ts
  const record = await xata.db.Users.create({
    email: "keanu@example.com",
    name: "keanu@example.com"
  });
  ```
  ```json
  // POST https://tutorial-ng7s8c.us-east-1.xata.sh/db/tutorial:main/tables/users/data

  {
    "email": "keanu@example.com",
    "name": "Keanu Reeves"
  }
  ```
````

The TypeScript SDK returns the created record. The response looks like this:

````ts|json
  ```ts
  {
    "email":"keanu@example.com"
    "id":"rec_cd8rqcoavc42pi67lgd0"
    "name":"keanu@example.com"
    "bio":NULL
    "address":NULL
  }
  ```
  ```json
  {
    "id": "rec_c8hnbch26un1nl0rthkg",
    "xata": {
      "version": 0
    }
  }
  ```
````

In the above:

- `id` is the ID of the record, which Xata generates automatically. The generated records are globally unique and sortable. This means that sorting by the IDs you sort by the insertion order.
- `xata.version` is the version of the record. It is automatically incremented any time the record is updated and can be used for optimistic locking.

## Creating a Record with a given ID

If you want to specify your own ID, you can do it like this:

````ts|json
  ```ts
  const record = await xata.db.Users.create("myid", {
    email: "keanu@example.com",
    name: "keanu@example.com"
  });
  ```
  ```json
  // PUT https://tutorial-ng7s8c.xata.sh/db/tutorial:main/tables/users/data/myid?createOnly=true
  {
    "email": "keanu@example.com",
    "name": "Keanu Reeves"
  }
  ```
````

In the REST API example, note the change from `POST` to `PUT`. The `createOnly` query parameter signals Xata to return an error in case a record with the given ID already exists.

## Creating a Record with a Linked Field

In the schema that we chose, the `Posts` table has an `author` column of type `link` that links to the `Users` table. To insert a record with a linked field, use the ID of the target record in the link column. For example:

````ts|json
  ```ts
  const record = await xata.db.Posts.create({
      title: "Filming the Matrix",
      author: "rec_cd8rqcoavc42pi67lgd0"
  });
  ```
  ```json
  // POST https://tutorial-ng7s8c.us-east-1.xata.sh/db/tutorial:main/tables/Posts/data

  {
    "title": "Filming the Matrix",
    "author": "rec_cd8rqcoavc42pi67lgd0"
  }
  ```
````

## Creating a Record with Object Columns

In the Xata data model, you can have nested columns similar to JSON. For example, the following insert request contains an `address` column with two keys:

````ts|json
  ```ts
  const record = await xata.db.Users.create({
    email: "carrie@example.com",
    name: "Carrie-Anne Moss",
    address: {
        street: "123 Main St",
        zipcode: 12345
    }
  });
  ```
  ```json
  // POST https://tutorial-ng7s8c.us-east-1.xata.sh/db/tutorial:main/tables/Users/data

  {
    "email": "carrie@example.com",
    "name": "Carrie-Anne Moss",
    "address": {
      "street": "123 Main St",
      "zipcode": 12345
    }
  }
  ```
````

## Creating Records in Bulk

If you have multiple records to insert, you can send them in a single request via the [`/bulk` endpoint](/api-reference/db/%7Bdb_branch_name%7D/tables/%7Btable_name%7D/bulk#bulk-insert-records). For example:

````ts|json
  ```ts
  const users = await xata.db.Users.create([{
      email: "laurence@example.com",
      name: "Laurence Fishburne",
      team: "rec_cd8s4kbo8dsvsjilo1ug",
    }, {
      email: "hugo@example.com",
      name: "Hugo Weaving",
      team: "rec_cd8s4kbo8dsvsjilo1ug"
    }, {
      email: "joe@example.com",
      name: "Joe Pantoliano",
      team: "rec_cd8s4kbo8dsvsjilo1ug"
    }
  ]);
  ```
  ```json
  // POST https://tutorial-ng7s8c.us-east-1.xata.sh/db/tutorial:main/tables/users/bulk

  {
    "records": [
      {
        "email": "laurence@example.com",
        "name": "Laurence Fishburne",
        "team": "rec_cd8s4kbo8dsvsjilo1ug"
      },
      {
        "email": "hugo@example.com",
        "name": "Hugo Weaving",
        "team": "rec_cd8s4kbo8dsvsjilo1ug"
      },
      {
        "email": "joe@example.com",
        "name": "Joe Pantoliano",
        "team": "rec_cd8s4kbo8dsvsjilo1ug"
      }
    ]
  }
  ```
````

It is possible to provide IDs for each of the records. If records with the same IDs already exist, they will be updated.

## Next Steps

Great! We can insert data into our databases. Let's now explore how we [get data](/typescript-client/get) from a database. Alternatively, we can also look into [updating data](/typescript-client/update) or [deleting data](/typescript-client/delete). We've got guides for each of these operations.
