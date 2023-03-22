---
sidebar_position: 2
sidebar_label: Examples
---

# Examples

The following examples assume the `client` variable is an instance of `XataClient` with the correct credentials. Please refer to the [Configuration](/python-sdk/overview#configuration) page to learn more about initializing the SDK.

Each endpoint returns an instance of [`requests.Response`](https://requests.readthedocs.io/en/latest/api/#requests.Response). If your query reaches the threshold of concurrent connections, the server will respond with a `429` status code and the SDK will throw a [`RateLimitingException`](https://github.com/xataio/xata-py/blob/main/xata/errors.py#L25).

You can refer to the [API Reference](https://xata-py.readthedocs.io/en/latest/api.html) for the relevant parameters to each method.

## At a glance

Below are the parameters passed to the methods in the following examples:

- `insertRecord`: table name (string), record (dictionary)
- `insertRecordWithID`: table name (string), record id (string), record (dictionary)
- `updateRecordWithID`: table name (string), record id (string), record (dictionary)
- `upsertRecordWithID`: table name (string), record id (string), record (dictionary)
- `getRecord`: table name (string), record id (string)
- `deleteRecord`: table name (string), record id (string)
- `deleteRecord`: table name (string), record id (string)
- `bulkInsertTableRecords`: table name (string), records (dictionary with records array)
- `users().getUser()`

## Insert or update new Record

```python
from xata.client import XataClient

client = XataClient(db_name="my_db")

record = {
    "name": "Peter Parker",
    "job": "Spiderman",
}

# Insert record to table "Avengers" and let Xata generate a record Id
resp = client.records().insertRecord("Avengers", record)
assert resp.status_code == 201
print("Record Id: %s" % resp.json()["id"])

# Insert record to table "Avengers" with your own record Id "spidey-1"
resp = client.records().insertRecordWithID("Avengers", "spidey-1", record)
assert resp.status_code == 201

# Update the record with Id "spidey-1" in table "Avengers"
record["job"] = "your friendly neighborhood spider man"
resp = client.records().updateRecordWithID("Avengers", "spidey-1", record)
assert resp.status_code == 200

# Upsert: Update or Insert a record
record = {
    "name": "Bruce Banner",
    "job": "Hulk",
}
resp = client.records().upsertRecordWithID("Avengers", "hulk-1", record)
# On insert status code = 201
assert resp.status_code == 201

record["job"] = "the incredible hulk"
resp = client.records().upsertRecordWithID("Avengers", "spidey-1", record)
# On update status code = 200
assert resp.status_code == 200
```

## Get a Record from a Table

```python
from xata.client import XataClient

client = XataClient(api_key="REDACTED_API_KEY", db_name="my_db", branch_name="feature-042")

resp = client.records().getRecord("Avengers", "spidey-1")
assert resp.status_code == 200
print("Record: %s" % resp.json())

# If the record with the Id does not exist, the status code will be 404
resp = client.records().getRecord("Avengers", "bruce-wayne-7")
assert resp.status_code == 404
```

## Delete a Record from a Table

```python
from xata.client import XataClient

client = XataClient(api_key="REDACTED_API_KEY", db_name="my_db", branch_name="feature-042")

resp = client.records().deleteRecord("Avengers", "spidey-1")
assert resp.status_code == 204
```

## Insert Records in bulk

```python
from xata.client import XataClient

client = XataClient(api_key="REDACTED_API_KEY", db_name="my_db", branch_name="feature-042")

avengers = [
    {"name": "Peter Parker", "job": "Spiderman"},
    {"name": "Bruce Banner", "job": "Hulk"},
    {"name": "Steve Rodgers Parker", "job": "Captain America"},
    {"name": "Tony Stark", "job": "Iron Man"},
]
resp = client.records().bulkInsertTableRecords("Avengers", {"records": avengers})
assert resp.status_code == 200
```

## Get the current User

```python
from xata.client import XataClient

client = XataClient(api_key="REDACTED_API_KEY", workspace_id="REDACTED_WS_ID")
resp = client.users().getUser()

print("Status code: %s" % resp.status_code)
print("Response body: %s" % resp.json())
```
