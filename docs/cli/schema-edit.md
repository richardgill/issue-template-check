---
sidebar_position: 5
sidebar_label: Schema Edit
---

# Editing Your Database Schema

You can edit the schema in the CLI with `xata schema edit` which provides an interactive menu to make schema changes. Alternatively `xata schema edit --source` will open your default editor, where you can edit the current schema or paste the desired target schema. To specify the default editor, set the executable command in the EDITOR environment variable.

You can also quickly jump to the Web UI with `xata browse` and edit the schema there.

If you edit the schema in the CLI, the code generator (which is configured and enabled by default) will be used after applying the schema changes. If you choose to edit the schema in the web UI, remember to execute `xata codegen` to update your existing client with the latest schema.

## Importing Your Database Schema

You can retrieve your database schema with the command `xata schema dump`, optionally with a `--file schema.json` to write the output schema to a file.

You can import a schema file to your project's database with the command `xata schema upload schema.json`.

Or, while initiating a new project your can directly apply a schema from a file using `xata init --schema schema.json`.
