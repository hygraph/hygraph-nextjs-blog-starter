# hygraph-nextjs-blog-starter


> A [Next.js](httsp://nextjs.org) starter for creating a basic blog with [Hygraph](https://hygraph.com)

## Quick start

[![Clone project](https://hygraph.com/button)](https://app.hygraph.com/clone/ccfd3e465ed249d987b0dfc3f107d437?name=Basic%20Blog)


1. **Clone and install the project**

```shell
npx degit git@github.com:hygraph/hygraph-nextjs-blog-starter.git
```

2. **Provide your Hygraph project keys**

> In order to use this starter, you'll need to have created a new Hygraph project using our `Blog Template`.

Navigate into your new site’s directory and copy the `.env.sample` file.

```shell
cd hygraph-blog
cp .env.sample .env.local
```

Inside of your newly created `.env` file, provide values for each variable. These variables can be found in the [project settings UI](https://hygraph.com/docs/guides/overview/api-access).

```env
HYGRAPH_ENDPOINT=""
HYGRAPH_TOKEN=""
```

3. **Start building!**

Install the dependencies and start the Next.js dev server:

```shell
npm install
npm run dev
```

## Features
* App Router
* Tailwind CSS
* Built-in 404 page functionality
* `generateMetadata` for SEO
