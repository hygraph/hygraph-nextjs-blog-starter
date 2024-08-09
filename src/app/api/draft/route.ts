import { draftMode, cookies } from 'next/headers'
import { redirect } from 'next/navigation'



export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const previewToken = searchParams.get('previewToken')
  const slug = searchParams.get('slug')
  const model= searchParams.get('model')

  let modelUrl = ''
  if (model === 'page') {
    modelUrl = '/'
  } else if (model === 'post') {
    modelUrl= '/posts/'
  }
  const query = `
    query SinglePage($slug: String!) {
      page: ${model}(where: { slug: $slug }, stage: DRAFT) {
        slug
      }
    }
  `



  // Check for a slug and for a preview token
  if (previewToken !== process.env.HYGRAPH_QUERY_SECRET || !slug || !model) {
    return new Response('Invalid token', { status: 401 })
  }

  // Get the slug from Hygraph to ensure we don't run into redirect loops
  const res = await fetch(process.env.HYGRAPH_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query,
      variables: { slug }
    })
  })

  // Return the data
  const { data } = await res.json()

  // If the data returns in undefined or in the wrong shape, return an error
  if (!data || !data.page) {
    return new Response('Invalid slug', { status: 401 })
  }

  // Workaround for https://github.com/vercel/next.js/issues/49927
  // Enable draft mode as usual
  draftMode().enable()

  // Update the cookie and set same site to none so we can render it inside Hygraph
  const cookieStore = cookies()
  const cookie = cookieStore.get('__prerender_bypass')
  cookies().set({
    name: '__prerender_bypass',
    value: cookie?.value,
    httpOnly: true,
    path: '/',
    secure: true,
    sameSite: 'none'
  })

  redirect(`${modelUrl}${data.page.slug}`)
}
