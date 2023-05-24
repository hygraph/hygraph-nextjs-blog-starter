import { SinglePage } from '@/queries/pages'
import { RichText } from '@graphcms/rich-text-react-renderer'
import Head from 'next/head'

async function getPage(slug) {
  const { page } = await fetch(process.env.HYGRAPH_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: SinglePage,
      variables: { slug: slug }
    })
  })
    .then((res) => res.json())
    .then((res) => res.data)
  return page
}

export default async function Page({ params }) {
  const page = await getPage(params.slug)
  return (
    <div className="divide-y divide-gray-200">
      <Head>
        <meta
          name="description"
          content={page.description || page.seo?.description}
        />
        {page.seo?.image && <meta property="image" content={seo.image.url} />}

        <meta property="og:title" content={page.title} />
        <meta
          property="og:description"
          content={page.description || page.seo?.description}
        />
        {page.seo?.image && (
          <meta property="og:image" content={seo.image.url} />
        )}
        <meta name="og:type" content="website" />

        <meta name="twitter:site" content="@Hygraph" />
        <meta name="twitter:title" content={page.title} />
        <meta name="twitter:card" content="summary_large_image" />
        {page.seo?.image && (
          <meta name="twitter:image:src" content={seo.image.url} />
        )}
      </Head>
      <div className="pt-6 pb-8 space-y-2 md:space-y-5">
        <h1 className="text-3xl leading-9 font-extrabold text-gray-900 tracking-tight sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
          {page.title}
        </h1>
        {page.subtitle && (
          <p className="text-lg leading-7 text-gray-500">{page.subtitle}</p>
        )}
      </div>
      <div className="pb-16 lg:pb-20">
        <div className="prose max-w-none pt-10 pb-8">
          <RichText content={page.content.raw} />
        </div>
      </div>
    </div>
  )
}
