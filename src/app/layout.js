import Image from 'next/image'
import Link from 'next/link'
import HygraphLogo from '../../public/svg/logo.svg'
import HygraphMark from '../../public/svg/mark.svg'
import NavList from '../components/NavList'
import './globals.css'

export const metadata = {
  title: {
    template: '%s | Hygraph Blog Next.js Starter'
  },
  openGraph: {
    title: 'Next.js',
    description: 'The React Framework for the Web'
  }
}
export default function Layout({ children }) {
  return (
    <html lang="en">
      <body>
        <div className="px-6 max-w-3xl mx-auto">
          <header className="py-10 relative">
            <nav className="relative flex items-center justify-between sm:h-10 ">
              <Link href="/" aria-label="Hygraph Next.js Blog Starter">
                <Image
                  width={150}
                  height={40}
                  src={HygraphLogo}
                  alt="Hygraph Logo"
                  className="hidden sm:block h-10"
                />
                <Image
                  width={44}
                  height={40}
                  src={HygraphMark}
                  alt="Hygraph Logo"
                  className="h-10 sm:hidden"
                />
              </Link>
              <ul>
                <NavList navId="main" />
              </ul>
            </nav>
          </header>
          <main>{children}</main>
          <footer className="bg-white mt-5 dark:bg-gray-900">
            <div className="py-6 lg:py-8">
              <div className="md:flex md:justify-between">
                <div className="mb-6 md:mb-0">
                  <Link href="/" aria-label="Hygraph Next.js Blog Starter">
                    <Image
                      width={150}
                      height={40}
                      src={HygraphLogo}
                      alt="Hygraph Logo"
                      className="hidden sm:block h-10"
                    />
                    <Image
                      width={44}
                      height={40}
                      src={HygraphMark}
                      alt="Hygraph Logo"
                      className="h-10 sm:hidden"
                    />
                  </Link>
                </div>
                <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
                  <div>
                    <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">
                      Follow us
                    </h2>
                    <ul className="text-gray-600 dark:text-gray-400 font-medium">
                      <ul>
                        <NavList navId="social" />
                      </ul>
                    </ul>
                  </div>
                </div>
              </div>
              <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
              <div className="sm:flex sm:items-center sm:justify-between">
                <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">
                  © 2023{' '}
                  <a href="https://hygraph.com/" className="hover:underline">
                    Hygraph
                  </a>
                  . All Rights Reserved.
                </span>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
