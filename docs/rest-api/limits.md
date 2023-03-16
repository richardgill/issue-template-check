---
sidebar_position: 5
sidebar_label: Limits
---

# Limits

Xata applies some limits based on the plan level and the API endpoint in order to ensure reliable operation and scalability.

- [User limits](#user-limits)
- [Schema limits](#schema-limits)
- [Column limits](#column-limits)
- [Record limits](#record-limits)
- [Request limits](#request-limits)
- [Response limits](#response-limits)
- [Rate Limits](#rate-limits)

## User Limits

| Scope               | Limit |
| :------------------ | :---- |
| API keys per user   | 40    |
| Workspaces per user | 40    |

## Schema Limits

| Scope                   | Limit     |
| :---------------------- | :-------- |
| Databases per workspace | 40        |
| Branches per database   | 40        |
| Tables per branch       | 100       |
| Tables per workspace    | 1000      |
| Database name length    | 255 chars |
| Branch name length      | 255 chars |

## Column Limits

| Scope                       | Limit       |
| :-------------------------- | :---------- |
| Number of columns per table | 256         |
| id column length            | 255 chars   |
| String column length        | 2048 chars  |
| Text column size            | 200 kb      |
| Multiple type total size    | 65536 chars |

## Record Limits

| Scope       | Limit  |
| :---------- | :----- |
| Record size | 600 kb |

## Request Limits

| Scope        | Limit        |
| :----------- | :----------- |
| Request size | 20 mb        |
| Bulk insert  | 1000 records |

## Response Limits

| Scope                   | Limit        |
| :---------------------- | :----------- |
| Page size               | 200 records  |
| Offset pagination size  | 800 records  |
| Cursor pagination depth | Unrestricted |

## Rate Limits

Xata assigns capacity for request rate and concurrent connections at the branch level, in the form of billing units.

The Free plan grants a baseline of **3** billing units in each branch while additional units can be [purchased](https://xata.io/pricing).

The REST API may return HTTP response code `429` as a throttling error when the rate limiting conditions are met:

- **Request rate limit**: Total number of atomic HTTP requests submitted per second to any API endpoint under a branch
- **Concurrency limit**: Number of requests executing in parallel at any given moment within a certain Store of a branch

## Store types

Xata uses three Store types with individual concurrency limits:

- **Consistent transactional store:** 2 concurrent requests / unit.  
  Endpoints: `data`, `bulk`, `transaction`, `query`, `summarize`
- **Read replicas store:** 3 concurrent requests / unit  
  Endpoints: `query`, `summarize` with option `consistency: eventual`
- **Search & Analytics store:** 5 concurrent requests / unit.  
  Endpoints: `aggregate`, `search`, `ask`

In case the concurrency limit in a Store is exceeded, requests to it are throttled internally with a timeout of 50ms. After reaching the timeout, the API errors with HTTP response code `429`.

## Best practices

Xata's SDK clients throttle and retry `429` requests until they can be processed with the units available. Instead of throwing an application error when you have a significant amount of traffic, it degrades the speed without failing. Whenever a request needs to be throttled by the SDK, it prints an application log with the amount of extra time it took to be processed. To avoid noticeable speed impact in your application, you can increase the assigned units to your branch.

Tips & best practices useful to optimize requests for the Xata API:

- In case the client receives a `429` response code from Xata, it means the request was **not** processed so your application can safely retry it.
- Log and track errors in your application error channels or log streams in order to monitor for throttling errors, so you can make informed decisions for adjusting the units assigned to your branch.
- For writing records to Xata, use the bulk endpoint instead of the atomic (individual record insert) data endpoint. The bulk endpoint allows batching of multiple records in a single request, which favors the optimal use of both your branch's request rate limit and concurrency slots in the transactional store.
- For requests to the `query` and `summarize` endpoits, consider using the `consistency: eventual` option to use the Read Replicas Store. This makes it less likely to reach the concurrency limit of either Store type and gets the best possible performance from your Xata branch's assigned units.

Custom plans can increase or remove some limits. To discuss upgrading, contact us by [email](mailto:support@xata.io) or fill the [Contact Form](https://support.xata.io/hc/en-us/requests/new).
