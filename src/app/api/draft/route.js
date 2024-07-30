// route handler enabling draft mode

import { draftMode } from 'next/headers'
import { NextResponse } from 'next/server'
export async function GET(request) {
    console.log('hit the mode')
    const { origin } = request.nextUrl;
    const slug = request.nextUrl.searchParams.get("slug") || ''
    const model = request.nextUrl.searchParams.get("model") || ''
    const previewToken = request.nextUrl.searchParams.get("previewToken")

    if (!previewToken) return NextResponse.error(new Error('Invalid preview token'))


    const redirectUrl = `${origin}/${model}${slug}`



  const response = NextResponse.redirect(redirectUrl)
  draftMode().enable()
  console.log('apiroutedraftmode', draftMode().isEnabled)

  return response
}