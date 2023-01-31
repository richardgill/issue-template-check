---
sidebar_position: 1
sidebar_label: Next.js with Basic Auth
---

# Next.js + Basic Auth

![Your First Steps on Xata](https://www.youtube.com/watch?v=87A7cSanQ3s)

## Before you start

Welcome to Xata! We're really happy you're here.

If this is your first time using Xata, we recommend checking out the [Overview](/overview) for a quick how-to before diving deeper.

This guide will walk you through the first steps on Xata by building a to-do list application with a popular framework like Next.js. Before we do though, we'd like to invite you to our [Discord server](https://xata.io/discord) if you'd like to throw ideas around and chat, and also let you know that if you ever need support, our [support portal](https://support.xata.io/) is the place to get it. If you'd like to request new features, check out our [feature board](https://feedback.xata.io/feature-request).

With that out of the way, let's get started! Begin by visiting the [Xata web user interface](https://app.xata.io) (UI). If you're not logged in, you'll be asked to login with either with GitHub or Google.

### Create

Once you're logged in, you'll be prompted to create a workspace. A workspace is like an [organization on GitHub](https://docs.github.com/en/organizations), where you and your team can collaborate on your databases. Once your workspace is setup, let's create a database by clicking the "Add a database" button, and giving our new database a name and a color.

<!-- gif -->

### Design

Our database is instantly ready to use, but empty. To follow our to-do list example, let's add an `items` table. To-do list items usually have a `label` and a `is_done` flag. Let's add those columns to our table. The `label` is of type **String**, and the `is_done` is of type **Boolean**.

<!-- gif -->

One thing we notice while adding columns is Xata's support for **rich column types**: we don't just support `string`s, but also supersets of `string`, like `email`. If a column is of type `email`, Xata will validate it for you to ensure consistency.

Great! We've got a table ready. But in order to test it, we need some data. We can do this by clicking "Add a row" at the bottom of the table, and filling in the label of our new to-do item.

<!-- gif -->

### Test Query

Our table is ready! Let's do a test query. To query this database, we click "Get Code Snippet". This will give us code snippets in multiple languages that we can use to query our new table.

If we choose curl, we can query our table directly from a shell environment that has it. If we choose JavaScript, we can paste the snippet directly in our browser console to test it out.

> ⚠️ This feature (Get Code Snippet) exposes a temporary API key. If you're building a production application, we suggest using a proper API key. See [API keys](/getting-started/api-keys) for more information.

Great! We should be able to query our table now. How quick was that?! Next, we'll build an _actual_ application from this database using Next.js.

---

## Querying Data from a Next.js App

![Building a Web App with Xata and Next.js](https://www.youtube.com/watch?v=0NAvrY_gEbk)

### Prerequisites

The sample app we're building is a [Node.js](https://nodejs.org/)-based app, so we assume you've got global commands like `npm` and `node`. If you don't, go ahead and install Node.js and we'll get started.

If you'd rather not install Node.js, it's not that important. The concepts of querying Xata are transferrable across languages. You may not be able to follow along with JavaScript/TypeScript, but The Xata RESTful API is designed to be easily accessible from any programming language. We have a [similar guide](api-guide/intro) on querying Xata purely with our REST API that you might find interesting.

### Source Code

This todo application is open source, and all of its code is available on [GitHub](https://github.com/xataio/examples/tree/main/apps/sample-nextjs-basic-auth). If you'd like to run it locally, you'll need to add a [Xata API key](/getting-started/api-keys) in an `.env` file at its root after you clone it.

### Bootstrapping our Application

Okay! Let's start building a web app on Xata! To do this, we'll start at the beginning. Let's run these commands in a fresh new folder on our machines:

```shell
# Initialize an npm project with default options
npm init --yes

# Install dependencies
npm install react react-dom next

# Install devDependencies
npm install typescript @types/node @types/react -D
```

You could also run `npx create-next-app --typescript` to achieve the same effect.

> ⚠️ We're using TypeScript because it makes our applications predictable and safe, but everything we do with TypeScript can be done the same way in JavaScript depending on your preference.

Now, let's get something on the screen by creating a `pages` directory and putting an `index.tsx` in there.

```shell
mkdir pages
touch pages/index.tsx
```

Great! Now, let's add a basic layout to our index page:

```tsx
// ./pages/index.tsx

const Index = () => {
  return (
    <main>
      <h1>My To-do List</h1>
      <ul>
        <li>
          <label>
            <input type="checkbox" />
            Buy oat milk
          </label>
        </li>
      </ul>
    </main>
  )
}

export default Index
```

With this, we can comfortably start a development server by running the following command:

```shell
npx next dev
```

This will start a development server on `http://localhost:3000` assuming port 3000 is free, and show us a very simple list of items to do.

### Adding Xata to our Application

Great! We've got a basic app up and running. Let's connect it to Xata. We recommend using the [Xata Software Development Kit (SDK)](/typescript-client/overview) to work with Xata. Let's set it up using the [Xata Command Line Interface (CLI)](/cli/installation). To begin, we'll install the Xata CLI globally:

```shell
# Install the Xata CLI globally
npm i -g @xata.io/cli
```

Now that this is installed, we have a global `xata` command that we can invoke from anywhere. This is why we recommend installing the CLI globally. It also works via [`npx`](https://docs.npmjs.com/cli/v7/commands/npx/), but this can be a bit more cumbersome.

Now that we've got the CLI, let's tell it who we are: let's login.

```shell
xata auth login
```

Running this command will present us with 2 choices:

- create a new existing API key by opening a browser, or
- paste in an existing one.

Since this is the quickstart, we'll create a new one. To learn more about API keys, see the [API keys](/getting-started/api-keys) page. To learn more about authenticating with the CLI, see the [CLI docs](/cli/installation).

After we create an API key, we can close the browser window and come back to Xata. Now, the CLI knows who we are. Let's initialize a project. We can do this by running the following command:

```shell
xata init
```

This will launch a little questionnaire that will help us configure our project. Let's answer the questions, and use code generation. This is the way we recommend working with Xata for maximum safety and efficiency.

<!--gif-->

Once we're done, our project will be setup to query Xata. If your Next.js development server is running, now's a good time to kill it and start it again because the Xata CLI added your API key to `.env`. Next.js reads this when your development server starts, so we'll need to start it again since `.env` has changed.

Great! Now, let's query Xata!

### Querying Xata

We always recommend querying Xata from a secure environment, like a serverless function, to hide your API keys from users. **It is currently unsafe to query Xata from a browser**, because you risk leaking your API key. We plan to address this soon.

To query Xata from our Next.js app, we will use [`getServerSideProps`](https://nextjs.org/learn/basics/data-fetching#get-server-side-props). This is a function that will be called by Next.js when it renders our page. We will also import our generated `XataClient` and use it here.

```tsx
// highlight 3-8,15-17,25-30
// ./pages/index.tsx

import { FC } from 'react'
import { XataClient } from '../util/xata'

type Props = Awaited<ReturnType<typeof getServerSideProps>>['props']

const Index: FC<Props> = ({ todos }) => {
  return (
    <main>
      <h1>My To-do List</h1>
      <ul>
        <li>
          {todos.map((t) => (
            <label key={t.id}>
              <input type="checkbox" checked={t.is_done} />
              {t.label}
            </label>
          ))}
        </li>
      </ul>
    </main>
  )
}

const xata = new XataClient()

export const getServerSideProps = async () => {
  const todos = await xata.db.items.getMany()
  return { props: { todos } }
}

export default Index
```

Let's talk about what just happened.

First, we imported our generated `XataClient` that we got from the CLI:

```ts
import { XataClient } from '../util/xata'
```

Then, we instantiated a new `XataClient`:

```ts
const xata = new XataClient()
```

If the credentials parsing from `.env` fails, you'll get an error here. You can pass your API key manually with the `apiKey` constructor option.

```ts
const xata = new XataClient({ apiKey: XATA_API_KEY })
```

Later, we used the `xata` client instance in our `getServerSideProps` function to get to-do items from Xata:

```ts
export const getServerSideProps = async () => {
  const todos = await xata.db.items.getMany()
  return { props: { todos } }
}
```

Note that `xata.db.[anything]` automatically knows the design of your database and provides you autocompletion hints. This is why we recommend code generation. It makes it easy to write predictable queries that will work with your database.

#### Methods to query the database

You'll notice that our call to Xata is done with the SDK's `getMany` method. There are multiple methods to run the query and get the items from your database.

- `getFirst`: Will return the first record in the table query results.
- `getMany`: Will return a subset of records in the table query results in an array. It returns the default pagination size, and you can customize the number of items returned with a different size (`xata.db.items.getMany({ pagination: { size: 100 }})`).
- `getAll`: Will return _every item_ in your table query results by getting all the pages and joining them in an array. If your query returns a lot of items, it might affect performance.
- `getPaginated`: Will return the first page of the table query results and allow you to paginate programmatically the rest of the pages.

#### Pagination

It is likely that in your application you want to paginate the results and allow the user to navigate between pages.

```ts
const page = xata.db.items.getPaginated({ pagination: { size: 100 } })
page.records // Array of items in the page

if (page.hasNextPage()) {
  const secondPage = await page.nextPage()
}
```

For more information on the SDK's pagination features, see its [reference](/typescript-client/get#paginating-results).

Great, now we know how to fine-tune the results we receive from Xata. In the snippet above, we also did some TypeScript stuff with `FC<Props>` and `Awaited<ReturnType<typeof getServerSideProps>>`. This is not really essential to understanding Xata, so we'll skip talking about it here. If you're curious, feel free to join our [Discord server](https://discord.gg/hUc5Mvctmt) and we'll be happy to talk about these things there.

### Conclusion

That's it! Now, our Next.js app is actively making a query to Xata and rendering to-do list items from our database! How can we create new ones though? Or mark existing ones as done? Maybe delete some? That's what we'll explore in the next session! Let's go!

---

## Updating Data with Xata

![Updating Data with Xata](https://www.youtube.com/watch?v=SigrRaOExRU)

Great! Our to-do app now reads data from Xata. **R**eading is just a small part of what most apps do though, with **CRUD** (Create, Read, Update, and Delete) being far more common. Let's explore how we can CRUD-ify our Xata app in this guide.

### Securely Talking to Xata

We always recommend querying Xata from a secure environment, like a serverless function, to hide your API keys from users. **It is unsafe to query Xata from a browser**, because you risk leaking your API key. Going forward, we'll query Xata with Next.js [API routes](https://nextjs.org/docs/api-routes/introduction).

### Toggling a To-do Item

Let's start with the basics: when we click a to-do item, we update the record on Xata to have `is_done` set to `true`. To do this, let's add an `onClick` event handler to the checkbox element:

```tsx
// highlight 4,17-27,40
// ./pages/index.tsx

import { FC } from 'react'
import { XataClient } from '../util/xata'

type Props = Awaited<ReturnType<typeof getServerSideProps>>['props']

const Index: FC<Props> = ({ todos }) => {
  return (
    <main>
      <h1>My To-do List</h1>
      <ul>
        <li>
          {todos.map((t) => (
            <label key={t.id}>
              <input
                onClick={() => {
                  fetch('/api/toggle-todo', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: t.id, is_done: !t.is_done })
                  }).then(() => {
                    window.location.reload()
                  })
                }}
                type="checkbox"
                checked={t.is_done}
              />
              {t.label}
            </label>
          ))}
        </li>
      </ul>
    </main>
  )
}

const xata = new XataClient()

export const getServerSideProps = async () => {
  const todos = await xata.db.items.getMany()
  return { props: { todos } }
}

export default Index
```

Let's talk about what we just changed. We added this `onClick` prop to the checkbox:

```ts
  onClick={() => {
    fetch("/api/toggle-todo", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id: t.id, is_done: !t.is_done }),
    }).then(() => {
      window.location.reload();
    });
  }}
```

What we're doing here is sending a request to our Next.js API route to toggle the to-do item. In the handler for this API route, we will talk to Xata and update the to-do item. Let's create a file called `./pages/api/toggle-todo.ts`, and implement it like this:

```ts
// ./pages/api/toggle-todo.ts
import { NextApiHandler } from 'next'
import { XataClient } from '../../util/xata'

const xata = new XataClient()

const handler: NextApiHandler = async (req, res) => {
  const { id, is_done } = req.body
  await xata.db.items.update({ is_done, id })
  res.end()
}

export default handler
```

Let's save and visit our app again.

<!-- gif -->

Great! It works! We're successfully updating data on Xata. However, we can do better.

### Let's Refactor!

Notice how we're instantiating a `new XataClient()` above? Let's factor that out into a utility function, and then import a single instance of the client in both places:

```ts
// ./util/xataClient.ts

import { XataClient } from './xata'

export const xata = new XataClient()
```

And then in the files that use it,

```tsx
// highlight 4, 40-43
// ./pages/index.tsx

import { FC } from 'react'
import { xata } from '../util/xataClient'

type Props = Awaited<ReturnType<typeof getServerSideProps>>['props']

const Index: FC<Props> = ({ todos }) => {
  return (
    <main>
      <h1>My To-do List</h1>
      <ul>
        <li>
          {todos.map((t) => (
            <label key={t.id}>
              <input
                onClick={() => {
                  fetch('/api/toggle-todo', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: t.id, is_done: !t.is_done })
                  }).then(() => {
                    window.location.reload()
                  })
                }}
                type="checkbox"
                checked={t.is_done}
              />
              {t.label}
            </label>
          ))}
        </li>
      </ul>
    </main>
  )
}

export const getServerSideProps = async () => {
  const todos = await xata.db.items.getMany()
  return { props: { todos } }
}

export default Index
```

for our index page, and this in our API handler:

```tsx
// highlight 3
// ./pages/api/toggle-todo.ts
import { NextApiHandler } from 'next'
import { xata } from '../../util/xataClient'

const handler: NextApiHandler = async (req, res) => {
  const { id, is_done } = req.body
  await xata.db.items.update({ is_done, id })
  res.end()
}

export default handler
```

---

## Conclusion

Great! Now we have a more reusable instance of a `XataClient` that we can use in multiple places! Okay, we can now update data, but how can we delete it? Let's look at that next!

### Deleting Data with Xata

![Deleting Data with Xata](https://www.youtube.com/watch?v=JZ0yC_dGm8o)

So currently, our to-do app can **R**ead data from Xata, and **U**pdate to-do items. But what good is keeping a list of already done to-dos? Let's offer our users a way to remove them, adding the **D**elete to **CRUD** (Create, Read, Update, and Delete). Let's explore how we can further CRUD-ify our Xata app in this guide.

### Creating a Delete Button

Currently, our to-do app has no button to delete a to-do item. Let's add a button to delete a to-do item.

```tsx
// highlight 15,34-49
// ./pages/index.tsx

import { FC } from 'react'
import { xata } from '../util/xataClient'

type Props = Awaited<ReturnType<typeof getServerSideProps>>['props']

const Index: FC<Props> = ({ todos }) => {
  return (
    <main>
      <h1>My To-do List</h1>
      <ul>
        <li>
          {todos.map((t) => (
            <>
              <label key={t.id}>
                <input
                  onClick={() => {
                    fetch('/api/toggle-todo', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({ id: t.id, is_done: !t.is_done })
                    }).then(() => {
                      window.location.reload()
                    })
                  }}
                  type="checkbox"
                  checked={t.is_done}
                />
                {t.label}
              </label>
              <button
                onClick={() => {
                  fetch('/api/delete-todo', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ id: t.id })
                  }).then(() => {
                    window.location.reload()
                  })
                }}
              >
                Delete
              </button>
            </>
          ))}
        </li>
      </ul>
    </main>
  )
}

export const getServerSideProps = async () => {
  const todos = await xata.db.items.getMany()
  return { props: { todos } }
}

export default Index
```

Just like we did previously, we've added a `fetch` call to a Next.js [API route](https://nextjs.org/docs/api-routes/introduction), but this time to delete a to-do item. Of course, the API route doesn't exist. So let's create a new one, in `./pages/api/delete-todo.ts`.

```ts
// ./pages/api/delete-todo.ts
import { NextApiHandler } from 'next'
import { xata } from '../../util/xataClient'

const handler: NextApiHandler = async (req, res) => {
  const { id } = req.body
  await xata.db.items.delete(id)
  res.end()
}

export default handler
```

All we're doing here is calling `.delete` and giving it an `id`, which we have from the user interface. Xata handles the rest. When we run this, we can now delete to-do items. Yay!

### Conclusion?

Wait! We've deleted all of our to-do items now. :( How can we create more? Let's wrap this up by allowing our users to create to-do items using Xata.

---

## Adding Basic Authentication with Xata

![Adding Basic Authentication with Xata](https://www.youtube.com/watch?v=WMZ-2wt8xeU)

Our to-do app is fully **CRUD** at this point since it can **C**reate records in Xata, **R**ead data from Xata, **U**pdate to-do items, and even **D**elete them. Now we will explore how we can add multiple users into our app and enable authentication for them.

### Add a New Table for Users

First we will add a new table for our users. The users table will contain columns `username` and `password`, both of `string` type.
There are multiple ways to update the schema of our existing Xata database: it can be done from the Xata UI, within the [VS Code Extension](https://marketplace.visualstudio.com/items?itemName=xata.xata), or using the [Xata CLI](/cli/installation).

Here's how to update the schema conveniently with the Xata CLI, by running the following command:

```shell
# Edit the Xata schema
xata schema edit
```

In the dialog menu, let's choose "Add a table", set the Name of the table to `users` and optionally add the description `A table of users`.
Once the table is created, choose the option `Add a column` below the users table to create two columns for it:

- a column with the name `username` of type `string` and description `A user's unique name`.
- a column with the name `password` of type `string` and description `Always hash the password`.

Once the columns are created, select "Run migration" and acknowledge the prompt requesting confirmation `(Y/n)`.

Now also add a column to the `items` table, with the name `user` of type `link` linking to the `users` table. The [link](/concepts/data-model#links-and-relations) column type enables us to point a record in the `items` table to an associated record in the `users` table, thus representing a relation between those two records which live in different tables. This way, we can form one-to-many relations between items and users (as our target is that each item can be accessed by multiple users).

The Xata CLI regenerates the schema for the XataClient automatically once the migration is completed. In case you did not use the Xata CLI to create the `users` table and the `link` column, make sure to run `xata codegen` in order to regenerate your `XataClient` to include the latest schema updates.

### Creating and Authenticating New Users

Let's add some Basic Auth to our Next.js App. Note that passwords should never be stored in plain text, so we will use [bcrypt](https://www.npmjs.com/package/bcrypt) to handle cryptography for us, so that passwords are hashed before they are stored.

You can install bcrypt with the following commands:

```shell
# Install bcrypt module
npm i bcrypt
npm i @types/bcrypt -D
```

Now let's create our authentication utility:

```ts
// ./util/authorize.ts

import { IncomingMessage } from 'http'
import { getXataClient } from './xata'
import bcrypt from 'bcrypt'
import { promisify } from 'util'

const compare = promisify(bcrypt.compare)
const hash = promisify(bcrypt.hash)

type OurAuthResponse = { username?: string; isAuthenticated: boolean }

export const authorize = async (
  req: IncomingMessage
): Promise<OurAuthResponse> => {
  const { authorization } = req.headers
  if (!authorization) {
    return { isAuthenticated: false }
  }

  // authorization: "Basic base64(username:password)"
  const [, credentials] = authorization.split(' ')
  const [username, password] = Buffer.from(credentials, 'base64')
    .toString('utf-8')
    .split(':')

  const xata = getXataClient()
  const user = await xata.db.users.filter({ username }).getFirst()

  // user doesn't exist
  if (!user) {
    await xata.db.users.create({
      username,
      password: await hash(password, 10)
    })
    return { isAuthenticated: true, username }
  }

  // user exists, we have the password
  const passwordsMatch = compare(password, user.password)

  if (!passwordsMatch) {
    return { isAuthenticated: false, username }
  }

  return { isAuthenticated: true, username }
}
```

Time to configure our application to use the authentication utility by modifying `getServerSideProps` to call `authorize`:

```tsx
// highlight 71-90
// ./pages/index.tsx

import Head from 'next/head'
import { FC } from 'react'
import { AddTodoForm } from '../components/AddTodoForm'
import { authorize } from '../util/authorize'
import { getXataClient } from '../util/xata'

type Props = Awaited<ReturnType<typeof getServerSideProps>>['props']

const Index: FC<Props> = ({ todos }) => {
  return (
    <main>
      <Head>
        <link rel="stylesheet" href="https://unpkg.com/mvp.css" />
      </Head>
      <h1>My Todo List</h1>
      <AddTodoForm />
      <ul>
        {todos.map((t) => (
          <li
            key={t.id}
            style={{ display: 'flex', gap: 8, alignItems: 'center' }}
          >
            <>
              <label>
                <input
                  onChange={() => {
                    fetch('/api/do-todo', {
                      method: 'POST',
                      headers: {
                        'Content-Type': 'application/json'
                      },
                      body: JSON.stringify({
                        id: t.id,
                        is_done: !t.is_done
                      })
                    }).then(() => window.location.reload())
                  }}
                  checked={t.is_done}
                  type="checkbox"
                />
                {t.label}
              </label>
              <button
                onClick={() => {
                  fetch('/api/delete-todo', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                      id: t.id
                    })
                  }).then(() => window.location.reload())
                }}
              >
                Delete
              </button>
            </>
          </li>
        ))}
      </ul>
    </main>
  )
}

export default Index

export const getServerSideProps = async ({ req, res }) => {
  const { isAuthenticated, username } = await authorize(req)

  if (isAuthenticated) {
    const xata = getXataClient()
    const todos = await xata.db.items
      .filter('user.username', username) // to-do items are now filtered to the current authenticated user
      .getMany()

    return {
      props: {
        todos
      }
    }
  } else {
    res.writeHead(401, {
      'WWW-Authenticate': "Basic realm='This is a private to-do list'"
    })
    res.end()
    return {}
  }
}
```

#### Updating all API routes to use Authentication

Finally let's update all our application's [API routes](https://nextjs.org/docs/api-routes/introduction) to use the new authentication workflow:

```tsx
// ./pages/api/add-todo.ts

import { NextApiHandler } from 'next'
import { authorize } from '../../util/authorize'
import { getXataClient } from '../../util/xata'

const handler: NextApiHandler = async (req, res) => {
  const { isAuthenticated, username } = await authorize(req)
  if (!isAuthenticated) {
    res.status(401).end()
    return
  }

  const { label, is_done } = req.body
  const xata = getXataClient()
  const user = await xata.db.users.filter({ username }).getFirst()
  await xata.db.items.create({ label, user: { id: user.id } })
  res.end()
}

export default handler
```

```tsx
// highlight 8-12
// ./pages/api/do-todo.ts

import { NextApiHandler } from 'next'
import { authorize } from '../../util/authorize'
import { getXataClient } from '../../util/xata'

const handler: NextApiHandler = async (req, res) => {
  const { isAuthenticated } = await authorize(req)
  if (!isAuthenticated) {
    res.status(401).end()
    return
  }

  const { id, is_done } = req.body
  const xata = getXataClient()
  await xata.db.items.update({ id, is_done })
  res.end()
}

export default handler
```

```tsx
// ./pages/api/delete-todo.ts

import { NextApiHandler } from 'next'
import { authorize } from '../../util/authorize'
import { getXataClient } from '../../util/xata'

const handler: NextApiHandler = async (req, res) => {
  const { isAuthenticated, username } = await authorize(req)
  if (!isAuthenticated) {
    res.status(401).end()
    return
  }

  const { id } = req.body
  await getXataClient().db.items.delete(id)
  res.end()
}

export default handler
```

---

## Conclusion

We've made it! Now our Next.js app is authenticating users, storing their password in a secure cryptographic way in Xata and automatically relates items to our authenticated users! We finally have a fully CRUD application with authentication, built on Xata.

This todo application is open source, and all of its code is available on [GitHub](https://github.com/xataio/examples/tree/main/apps/sample-nextjs-basic-auth). If you'd like to run it locally, you'll need to add a [Xata API key](/getting-started/api-keys) in an `.env` file at its root after you clone it.

Don't forget—we're always available to chat if you'd like to on our [Discord](https://xata.io/discord)! If you'd like to request a new feature, you can do so on our [feature board](https://feedback.xata.io/feature-request). We're also ready to support you with real problems if you need some [support](https://support.xata.io). Building something cool? Tell us on [Twitter](https://twitter.com/xata)!

Happy hacking!
