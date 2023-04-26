import Link from "next/link";

const NavList = ({ navItems }) => {
    console.log({navItems})
    return (
      <>
        {navItems.map((navItem) => 
        {
          const url = navItem.externalUrl || navItem.page.slug
          return (
          <li key={navItem.id}>
            <Link href={url}>{navItem.displayText}</Link>
          </li>
        )})}
      </>
    );
  };

  export default NavList