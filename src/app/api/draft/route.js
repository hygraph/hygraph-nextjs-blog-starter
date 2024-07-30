import { draftMode, cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export async function GET(request) {
  const { searchParams } = new URL(request.url)
  const previewToken = searchParams.get('previewToken')
  const slug = searchParams.get('slug')

  if (!previewToken || !slug) {
    return new Response('Invalid token', { status: 401 })
  }

  const res = await fetch(process.env.HYGRAPH_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: `
      query SinglePage($slug: String!) {
        page(where: { slug: $slug }, stage: DRAFT) {
          slug
        }
      }
      `,
      variables: { slug }
    })
  })

  const { data } = await res.json()

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

  redirect(`/${data.page.slug}`)
}
