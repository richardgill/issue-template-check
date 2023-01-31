---
sidebar_position: 2
sidebar_label: Config
---

## Configuration Overrides

You **should not** edit your generated file (e.g. `./src/xata.ts`) since any changes to your schema will cause the file to rebuild when `xata codegen` is run. If you need to override the configuration, you can set up a separate file alongside the generated code.

```ts
export const getXataClient = () => {
  if (instance) return instance

  instance = new XataClient({
    // Override configuration here
    databaseURL: process.env.XATA_DATABASE_URL,
    apiKey: process.env.XATA_API_KEY,
    fetch: fetch,
    branch: process.env.XATA_BRANCH
    // ... other configuration
  })
  return instance
}
```
