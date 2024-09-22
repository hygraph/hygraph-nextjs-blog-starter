import Link from 'next/link'
import { SingleNav } from '@/queries/navigations'
async function getNav(navId) {
  const res = await fetch(process.env.HYGRAPH_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      query: SingleNav,
      variables: { navId: navId }
    })
  }).then((res) => res.json())

  if (res.errors) {
    console.error(res.errors)
    throw new Error(res.errors[0].message)
  }
  return res.data.navigation.link
}

export default async function NavList({ navId }) {
  const navItems = await getNav(navId)
  return (
    <>
      {navItems.map((navItem) => {
        const isExternal = !!navItem?.externalUrl;
        const url = isExternal ? navItem.externalUrl : `/${navItem.page.slug}`
        return (
          <li key={url}>
            <Link 
              href={`${url}`}
              target={isExternal ? '_blank' : '_self'}
            >
              {navItem.displayText}
            </Link>
          </li>
        )
      })}
    </>
  )
}
