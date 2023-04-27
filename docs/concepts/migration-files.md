---
sidebar_position: 5
sidebar_label: Migration files
---

# Migration files

The Xata CLI stores migration files in the `.xata/migrations` folder. The folder contains a list of migration files and the `.ledger` file.

* The `xata pull my_feature` command pulls migrations from your branch and updates the `.ledger` file. 
* The `xata push my_feature` command pushes your migrations to a defined branch.

Important: The `.xata/migrations` folder should be committed to your git repository if you plan to use the `xata push`, `xata pull` command or the GitHub integration.

Each migration file holds a JSON object containing the migration's `id`, `parentID`, `checksum`, and list of operations. The following is an example: 

```
{
  "id": "mig_cf5b5o8591j35ctpb500",
  "parentID": "mig_cf5b5o8591j35ctpb4vg",
  "checksum": "a40a01b6e58676a008ad6fd07e1f678d35838ea5",
  "operations": [
    { "addTable": { "name": "user" }}
    { "addColumn": { "table": user", "name": "name", "type": "string" }
  ]
}
```

Migration files should not be modified. If modified, the checksum may become invalid. 
Xata keeps track of all migrations within a database and attempting to push a modified migration file to another branch will result in an error.

Migrations must be ordered. Ordering is guaranteed by the `parentID` and the ledger file, which is stored in `.xata/migrations/.ledger`. The ledger file is an append only file that lists all migration files in the correct order.
