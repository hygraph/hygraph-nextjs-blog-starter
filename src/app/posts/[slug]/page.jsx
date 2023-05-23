import { AllPosts, SinglePost } from '@/queries/posts'
import Link from 'next/link'
import Head from 'next/head'
import Image from 'next/image'

import { RichText } from '@graphcms/rich-text-react-renderer'
export async function getStaticPaths() {
  const allPosts = await fetch(process.env.HYGRAPH_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: AllPosts
    })
  })
    .then((res) => res.json())
    .then((res) => res.data.posts)

  const paths = allPosts.map((post) => ({
    params: { slug: post.slug }
  }))
  return { paths, fallback: false }
}

async function getData(slug) {
  const { post } = await fetch(process.env.HYGRAPH_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: SinglePost,
      variables: { slug: slug }
    })
  })
    .then((res) => res.json())
    .then((res) => res.data)
  return post
}

export default async function Post({ params }) {
  const post = await getData(params.slug)
  return (
    <article>
      <Head>
        <meta
          name="description"
          content={post.description || post.seo?.description}
        />
        {post.seo?.image && <meta property="image" content={seo.image.url} />}

        <meta property="og:title" content={post.title} />
        <meta
          property="og:description"
          content={post.description || post.seo?.description}
        />
        {post.seo?.image && (
          <meta property="og:image" content={seo.image.url} />
        )}
        <meta name="og:type" content="website" />

        <meta name="twitter:site" content="@Hygraph" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:card" content="summary_large_image" />
        {post.seo?.image && (
          <meta name="twitter:image:src" content={seo.image.url} />
        )}
      </Head>
      <header className="pt-6 lg:pb-10">
        <div className="space-y-1">
          <div>
            <h1 className="text-3xl leading-9 font-extrabold text-gray-900 tracking-tight sm:text-4xl sm:leading-10 md:text-5xl md:leading-14">
              {post.title}
            </h1>
          </div>
        </div>
      </header>
      <div
        className="divide-y lg:divide-y-0 divide-gray-200 lg:grid lg:grid-cols-[200px_1fr] gap-x-6 pb-16 lg:pb-20"
        style={{ gridTemplateRows: 'auto 1fr' }}
      >
        <dl className="pt-6 pb-10 lg:pt-0 lg:border-b lg:border-gray-200">
          <dt className="mb-2 text-sm font-medium leading-5">Written by</dt>
          <dd>
            <ul className="space-x-8 sm:space-x-12 lg:space-x-0 lg:space-y-8">
              <li key={post.author.remoteId} className="flex space-x-2">
                <Image
                  className="w-10 h-10 rounded-full"
                  src={post.author.picture.url}
                  width={post.author.picture.width}
                  height={post.author.picture.height}
                  alt={post.author.name}
                />
                <dl className="flex-1 text-sm font-medium leading-5">
                  <dt className="sr-only">Name</dt>
                  <dd className="text-gray-900">{post.author.name}</dd>
                  {post.author.title && (
                    <>
                      <dt className="sr-only">Title</dt>
                      <dd className="text-gray-500">{post.author.title}</dd>
                    </>
                  )}
                </dl>
              </li>
            </ul>
          </dd>
          <div className="mt-8">
            <dt className="text-sm font-medium leading-5">Published on</dt>
            <dd className="text-base leading-6 font-medium text-gray-500">
              <time dateTime={post.date}>
                {new Date(post.date).toLocaleDateString('en-us', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}
              </time>
            </dd>
          </div>
        </dl>
        <div className="prose lg:pb-0 lg:row-span-2">
          <RichText content={post.content.raw} />
        </div>
        <footer className="text-sm font-medium leading-5 divide-y divide-gray-200 lg:col-start-1 lg:row-start-2">
          <div className="pt-8">
            <Link href="/" className="text-purple-500 hover:text-purple-600">
              &larr; Back to the blog
            </Link>
          </div>
        </footer>
      </div>
    </article>
  )
}
