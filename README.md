# Zombie Master: Reborn - Website

A NodeJS application to build our static website.

---

## Installing

After [installing NodeJS](https://nodejs.org/en/), use the following command inside this folder:

```bash
npm install
```

## Running

```bash
# Starts watching for changes and serving the website.
npm run serve

# You can now view the site @ localhost:8080
```

## Building an optimized version

```bash
npm run build
```

## Writing articles

Go to `src/blog/`-directory. Create a Markdown (.md) file and write an article!

### Front matter

These are the settings for that particular article. You define things like article title and description here. You add them at the start of the document like so:

```
---
title: Title of the article
description: Description of the article
date: 2021-06-12 (Date published in ISO 8601 format, ie. YYYY-MM-DD)
image: /assets/bg002.jpg (Thumbnail image path)
---
This is the contents of the article.
```

---

[Template](https://github.com/StartBootstrap/startbootstrap-agency) and its [license](https://github.com/StartBootstrap/startbootstrap-agency/blob/master/LICENSE).
