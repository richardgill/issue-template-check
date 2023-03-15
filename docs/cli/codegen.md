---
sidebar_position: 4
sidebar_label: Code Generation
---

# Code Generation

We strongly recommend using the CLI to generate your Xata client for you. The Xata client is a class that you can instantiate in your project that will help you query Xata in a familiar way. This will help make your queries to Xata predictable and safe, while also providing autocomplete and safety.

Once you have a generated Xata client, you can import it into your project and use it. The Playground in the [Xata web application](https://app.xata.io) can serve as a companion for you to build and test out your queries. Once you're happy with them, you copy and paste them into your project.

As your schema changes, running `xata codegen` will consistently refresh your auto-generated Xata client with the latest schema for your database branch.
