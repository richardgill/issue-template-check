# Xata Docs

The documentation app is a Next.js app running with `/docs` as the `basePath`. This means there is no root route.

This app uses Next.js Multi-Zone features, where the Xata Website is the main server. Hence why there are some production specific redirects.

## Setup the environment

Follow the [`.env.template`](/.env.template) to create your own `.env.local`. This will define the API Tokens neccessary for the app to function properly.

> ⚠️ Do not use `main` as your schema branch for development or your routes won't be properly indexed. This branch is protected only for **production** builds.

## Install and run

Once the environment is properly configured, it’s all about installing the JavaScript dependencies and running the app.

Note we use [pnpm](https://pnpm.io/).

```sh
pnpm install && pnpm dev
```

If available, your app will run on port 3000. So go to [localhost:3000/docs/overview](http://localhost:3000/docs/overview).

Looking forward to your contribution!
Happy hacking! 🎉
