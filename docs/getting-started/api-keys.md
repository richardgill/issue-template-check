---
sidebar_position: 5
sidebar_label: API Keys
---

# API Keys

Whenever users interact with our API, we expect an API key to be included in the request's [Authorization](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization) header. This provides security by authorizing our users to only see _what's theirs_, but also provides _identity_: we are able to identify users based on the keys we generate for them.

## Generating API Keys

![Creating API Keys in Xata](/screenshots/CreateApiKeys.mp4|/screenshots/CreateApiKeys.webm)

To create an API key, you'll want to visit your [account settings](https://app.xata.io), where you will be able to add an API key. After giving your key a name, submit the form to create a key. Be sure to copy it to a secure location, because **your key will only be displayed to you this one time**, after which it will be inaccessible for security reasons. If you lose this key, you can invalidate it and generate a new one.

## Replacing Code Snippet Access Tokens

The "Get code snippet" feature gives us code snippets in multiple languages that implement the query which produces the current view. A temporary access token (ephemeral API key) is optionally generated as part of the code snippet. Depending on each language or tool, the access token is set in a local variable, an environmental variable, or an Authorization header in the code snippet.

In order to use the code in a development environment where work will be continued beyond the scope of the current browser window, or later on in production, this access token should be replaced by an API Key generated as described above. While the ephemeral access token may differ from the real API key in terms of length and character content, it can be directly replaced by the API key.

Not replacing the access token means that the code will be unable to connect to Xata after the ephemeral API key's brief expiration period.
