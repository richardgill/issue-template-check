# Netlify

Xata offers a first class integration with Netlify and its [Deploy Previews](https://www.netlify.com/products/deploy-previews/). With this plugin, you can synchronize your Xata branch with your Netlify deploy preview branch.

To do so, you need:

- To use the [Xata Software Development Kit (SDK)](/typescript-client/overview) in your project
- To install the [Netlify plugin](https://github.com/xataio/netlify-plugin-xata) like so

```bash
npm install -D netlify-plugin-xata
```

- Add the following lines in your [`netlify.toml`](https://docs.netlify.com/configure-builds/file-based-configuration/#sample-netlify-toml-file).

```
[[plugins]]
package = "netlify-plugin-xata"
```

You are all set! Now, every time you have a Xata branch that matches the git branch name of your Netlify Deploy Preview, `XataClient` will automatically pick the correct branch.
