---
sidebar_position: 6
sidebar_label: search-retro-games
---

# Search Retro Games

An directory of classic games, this app was built with Xata using Next.js 13 to showcase the Xata's **data storage** and **search** capabilities, including boosters and fuzziness combined with Next.js' new approach to server components and its [app/ directory](https://beta.nextjs.org/docs/app-directory-roadmap).

**The app contains over 7k games, and searches through them in milliseconds.**

![search-retro-games](/images/docs/examples/retro-games.png)

This app was contributed by [Anjana Sofia Vakil](https://anjana.dev/).

When using the app, you can search for games by name, and filter by genre, platform, and year. The search results match the search term even if it's misspelled, and the results are sorted by relevance. Relevance is calculated based on closeness to the search term, and then boosted by the game's ratings.

- [Visit the App](https://search-retro-games.vercel.app/) to explore, or
- [View the Source Code](https://github.com/vakila/search-retro-games) to learn more.
