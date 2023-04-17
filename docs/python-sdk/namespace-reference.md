---
sidebar_position: 4
sidebar_label: Namespaces
---

# Namespace Reference

The API surface of the Python SDK is organized into namespaces, with each namespace associated with a specific set of APIs. For instance, the `databases` namespace provides access to all the available Xata endpoints for managing databases. 

The endpoints and namespaces are generated from the [OpenAPI specification](/rest-api/openapi).

> ⓘ Alternatively, you can directly instantiate a namespace, as demonstrated in this [example](python-sdk/examples#get-a-record-from-a-table).

|   |   |
|---|---|
| Authentication and API key management | `client.authentication()` |
| Branch management | `client.branch()` |
| Database operations | `client.databases()` |
| User invites management | `client.invites()` |
| Branch schema migrations and history | `client.migrations()` |
| User management | `client.users()` |
| Workspace management | `client.workspaces()` |
| Table records access operations | `client.records()` |
| APIs for searching, querying, filtering, and aggregating records | `client.data()` |
| Database table management | `client.table()` |
