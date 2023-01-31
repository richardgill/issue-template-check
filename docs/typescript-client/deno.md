---
sidebar_position: 11
sidebar_label: Deno
---

# Deno Support

Since Deno 1.28, node modules can be imported directly, you can import the SDK like this:

```ts
import {
  buildClient,
  BaseClientOptions,
  XataRecord
} from 'npm:@xata.io/client@latest'
```

Alternatively, you can import the SDK with any compatible CDN. We recommend Skypack:

```ts
import {
  buildClient,
  BaseClientOptions,
  XataRecord
} from 'https://cdn.skypack.dev/@xata.io/client?dts'
```
