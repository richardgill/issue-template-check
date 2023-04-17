---
sidebar_position: 3
sidebar_label: Branches
---

# Branches

Xata is a _branchable_ database. Developers can checkout new branches of their database schemas, make changes safely, and merge them into their main branch. This triggers a zero-downtime migration.

You can create/list/delete branches using `xata branches …` commands, please refer to `xata branches --help` for more details.

To use a specific branch, define a value for `XATA_BRANCH` in your `.env`.

If none of the above apply, the default Xata branch is used.
