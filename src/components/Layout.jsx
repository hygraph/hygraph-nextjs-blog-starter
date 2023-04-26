import Link from "next/link";
import Image from "next/image";
import useSWR from 'swr';
import {SingleNav} from '../queries/navigations';
import HygraphLogo from "../../public/svg/logo.svg";
import HygraphMark from "../../public/svg/mark.svg";
import NavList from "./NavList";

const fetcher = async (url) => {
  console.log(url)
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query: SingleNav,
        variables: { navId: "main" },
      }),
    }).then((res) => res.json())

    if (res.errors) {
      console.error(res.errors)
      throw new Error(res.errors[0].message)
    }
    return res
    
  }


export default ({ children }) => {
  const { data, error, isLoading } = useSWR(
    "https://api-us-east-1.hygraph.com/v2/cl8vzs0jm7fb201ukbf4ahe92/master",
    fetcher
  );

  const { main, social } = data?.data || {}
  console.log({data, error, isLoading})

  return (<>
    <div className="px-6 max-w-3xl mx-auto">
      <header className="py-10 relative">
        <nav className="relative flex items-center justify-between sm:h-10 ">
              <Link href="/" aria-label="Hygraph Gatsby Blog Starter">
                <Image
                width={150}
                  src={HygraphLogo}
                  alt="Hygraph Logo"
                  className="hidden sm:block h-10"
                />
                <Image
                  src={HygraphMark}
                  alt="Hygraph Logo"
                  className="h-10 sm:hidden"
                />
              </Link>
            {!isLoading && data && <ul><NavList navItems={main.link} /></ul>}
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
                  src={HygraphLogo}
                  alt="Hygraph Logo"
                  className="hidden sm:block h-10"
                />
                <Image
                  src={HygraphMark}
                  alt="Hygraph Logo"
                  className="h-10 sm:hidden"
                />
              </Link>
          </div>
          <div className="grid grid-cols-2 gap-8 sm:gap-6 sm:grid-cols-3">
              <div>
                  <h2 className="mb-6 text-sm font-semibold text-gray-900 uppercase dark:text-white">Follow us</h2>
                  <ul className="text-gray-600 dark:text-gray-400 font-medium">
                    {!isLoading && data && <ul><NavList navItems={social.link} /></ul>}
                  </ul>
              </div>
              
          </div>
      </div>
      <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
      <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="https://hygraph.com/" className="hover:underline">Hygraph</a>. All Rights Reserved.
          </span>
     
      </div>
    </div>
</footer>

    </div>
    
</>
  );
};
