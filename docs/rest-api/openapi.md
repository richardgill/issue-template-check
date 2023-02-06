---
sidebar_position: 4
sidebar_label: OpenAPI Specification
---

# OpenAPI

To provide an easy way to use your favorite tools for exploring the Xata API, you can use the [OpenAPI](https://www.openapis.org/) specification:

Core API:
[`https://xata.io/api/openapi?scope=core`](https://xata.io/api/openapi?scope=core)

The base url is `https://api.xata.io` and this give you to access to the core API.

Workspace API:
[`https://xata.io/api/openapi?scope=workspace`](https://xata.io/api/openapi?scope=workspace)

The base url is `https://{workspaceId}.{regionId}.xata.sh` and this give you access to the workspace API.

## Tool recommendations

### [Insomnia](https://insomnia.rest/)

Leading Open Source API Client, and Collaborative API Design Platform for REST, SOAP, GraphQL, and GRPC.

![Xata API in Insomnia](/docs/images/docs/insomnia.png)

### [Postman](https://www.postman.com/)

Postman makes API development easy, offering tools to simplify each step of the API building process and streamlines collaboration so you can test APIs faster.

![Xata API in Postman](/docs/images/docs/postman.png)

### [OpenAPI Codegen](https://github.com/fabien0102/openapi-codegen)

Generate TypeScript fetcher functions or typed react-query hooks from your OpenAPI schema.

> ⚠️ Using generated react-query components in this context will leak your API key! The REST API must always be called in a server-side environment!

![Xata API with openapi-codegen](/docs/images/docs/openapi-codegen.png)
