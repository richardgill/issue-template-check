---
sidebar_position: -1
sidebar_label: SDK Overview
---

# Xata SDK for TypeScript and JavaScript

The Xata SDK supports typescript definitions for your Xata database schema. It also works with JavaScript.

It has zero dependencies and can run in Node.js, V8, Deno, and Bun.

## Installation

We recommend installing the [Xata CLI](/cli/installation) globally and import the Xata Client from the [code generated](/cli/codegen) by the CLI.

## Usage

There are three ways to use the SDK:

- Schema-generated Client: SDK to create/read/update/delete records in a given database following a schema file (with type-safety).
- Schema-less Client: SDK to create/read/update/delete records in any database without schema validation (with partial type-safety).
- API Client: SDK to interact with the whole Xata API and all its endpoints.
