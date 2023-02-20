---
sidebar_position: 3
sidebar_label: Namespaces
---

# Namespace Reference

The API surface of the SDK is organized in namespaces. Each namespace holds a set of APIs, e.g. `databases` provides all available Xata endpoints to manage your databases. The endpoints and namespaces are generated from the [OpenAPI specification](/rest-api/openapi).

## Authentication

Authentication and API Key management.

```python
client.authentication()
```

## Branch

Branch management.

```python
client.branch()
```

## Databases

Workspace databases management.

```python
client.databases()
```

## Invites

Manage user invites.

```python
client.invites()
```

## Migrations

Branch schema migrations and history.

```python
client.migrations()
```

## Users

User management.

```python
client.users()
```

## Workspaces

Workspace management.

```python
client.workspaces()
```

## Records

Access the table records operations.

```python
client.records()
```

## Search And Filter

APIs for searching, querying, filtering, and aggregating records.

```python
client.search_and_filter()
```

## Table

Table management.

```python
client.table()
```
