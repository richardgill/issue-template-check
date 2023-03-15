---
sidebar_position: 2
sidebar_label: Authentication
---

# Authenticating with the Xata API

The Xata API authenticates users using API keys that provide identity while interacting with a database in a secure manner. Below, we'll explore creating a key and then using it to fetch data from the Xata web API.

To create an API key, visit the [account settings](https://app.xata.io/settings) page.

## Sending an Authenticated Request

Once you've got an API key, you're ready to interact with any route on our [API Reference](/api-reference/user), passing the key in the request's `Authorization` header. For example, to get a list of your workspaces, you'd do a request like this in TypeScript:

```javascript
import fetch from 'node-fetch'

fetch('https://api.xata.io/workspaces', {
  headers: {
    Authorization: 'Bearer YOUR_API_KEY', // <- the magic
    'Content-Type': 'application/json',
  },
})
  .then((response) => response.json())
  .then((workspaces) => console.log('Look ma! Workspaces!', workspaces))
```

Note that we `import fetch from "node-fetch"` because **we recommend interacting with the Xata API from a backend** that serves as a proxy to our API. This protects your API key by not exposing it to a browser environment. When `fetch` is called in a browser, all headers sent along with the request [are visible in a browser's developer tools](https://stackoverflow.com/questions/4423061/how-can-i-view-http-headers-in-google-chrome), which raises some security concerns.

Armed with this knowledge, feel free to search these docs and [API Reference](/api-reference/user) by pressing ⌘K on macOS or Ctrl+K on Windows for your next steps.
