import { useSession, signIn, signOut } from "next-auth/react"
import {useState} from "react";
import Nav from "@/components/Nav"
import Logo from "@/components/Logo"

export default function Layout({children}) {
  //The following showNav is for mobile reasons, I want it to get small and then show nav at various sizes of a screen
  const [showNav,setShowNav] = useState(false);
  const { data: session } = useSession()

  if (!session){
  return (
    //Keep in mind I created and defined bgGray in tailwind.config.js
  <div className="bg-bgGray w-screen h-screen flex items-center">
    <div className="text-center w-full">
    <button onClick={() => signIn('google')} className="bg-white p-2 px-4 rounded-lg">Login with Google</button>
  </div>
  </div>
  );
  }
  return (
    <div className="bg-bgGray min-h-screen">
      {/*The following block md is to make it so that the navigation bar is not show on medium screesn*/}
      <div className="block md:hidden flex items-center p-4">
      <button onClick={() => setShowNav(true)}>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
</svg>

      </button>
      {/*The following class is so that the logo goes to the middle of the page*/}
      <div className = "flex grow justify-center mr-8">
      <Logo />
      </div>

      </div>

          <div className="flex">
      <Nav show={showNav}/>
    {/*Flex grow is very useful, use it again*/}
    <div className="flex-grow p-4"> {children}</div>
    </div>

    </div>

  )
}