import Link from 'next/link'
import {useRouter} from "next/router"
import {signOut} from 'next-auth/react'
import Logo from "@/components/Logo"

export default function Nav({show}) {
  const inactiveLink = 'flex gap-1 p-1';
  //keep in mind that the highlight and primary in this case are from the tailwind.config.js file that I created and they are variables that I created.
  const activeLink = `${inactiveLink} bg-highlight text-black rounded-sm`;
  const inactiveIcon = 'w-6 h-6';
  const activeIcon = `${inactiveIcon} text-primary`;
  {/*This useRouter is from nextjs and is to check and see if you are on a page and then if so, that becomes the activeLink and makes the others the inactiveLink*/}
  const router = useRouter();
  {/*The pathname is from the pathname on the object*/}
  const {pathname} = router;

  //Function to hand the logout process
  async function handleLogout() {
    signOut({
        callbackUrl: '/',
        redirect: true
    });
}

//Keep in mind that I changed the svgs of the below as well to make it so that the icons change colors depeneding on whether or not they are selected.
//PLEASE don't forget to change the class names after stroke if you decide to change the heroicons.

  return (
    //In the following className it is designed so that it changes depeneding on the size of the screen.  This show is from the Layout.js file. Don't forget to add the space before top 0.  The md after h-full is for medium screens
    //Create a global css variable for this. There is too much going on and I need to break it down
    <aside className={`aside-nav ${show ? 'show' : 'hide'}`}>
      <div className="mb-4 mr-4">
      <Logo />
      </div>
      <nav className="flex flex-col gap-2 ">
      {/*The Link below is from nextjs, check out more.  Don't forget href is necessary */}
      <Link href={'/'} className={pathname === '/' ? activeLink : inactiveLink}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={pathname === '/' ? activeIcon : inactiveIcon}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>

        Dashboard
        </Link>
        <Link href={'/products'} className={pathname.includes('/products') ? activeLink : inactiveLink}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={pathname.includes('/products') ? activeIcon : inactiveIcon}>
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 21v-7.5a.75.75 0 01.75-.75h3a.75.75 0 01.75.75V21m-4.5 0H2.36m11.14 0H18m0 0h3.64m-1.39 0V9.349m-16.5 11.65V9.35m0 0a3.001 3.001 0 003.75-.615A2.993 2.993 0 009.75 9.75c.896 0 1.7-.393 2.25-1.016a2.993 2.993 0 002.25 1.016c.896 0 1.7-.393 2.25-1.016a3.001 3.001 0 003.75.614m-16.5 0a3.004 3.004 0 01-.621-4.72L4.318 3.44A1.5 1.5 0 015.378 3h13.243a1.5 1.5 0 011.06.44l1.19 1.189a3 3 0 01-.621 4.72m-13.5 8.65h3.75a.75.75 0 00.75-.75V13.5a.75.75 0 00-.75-.75H6.75a.75.75 0 00-.75.75v3.75c0 .415.336.75.75.75z" />
</svg>



        Products
        </Link>
        <Link href={'/categories'} className={pathname.includes('/categories') ? activeLink : inactiveLink}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={pathname === '/categories' ? activeIcon : inactiveIcon}>
         <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
        </svg>


        Categories
        </Link>
        <Link href={'/orders'} className={pathname.includes('/orders') ? activeLink : inactiveLink}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={pathname.includes('/orders') ? activeIcon : inactiveIcon}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
        </svg>


        Orders
        </Link>
        <button onClick={handleLogout} className="flex gap-1 p-1">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
</svg>



        Logout</button>
      </nav>

    </aside>
  )
}