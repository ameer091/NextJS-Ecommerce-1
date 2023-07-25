import Image from 'next/image'
import { Inter } from 'next/font/google'
/*const inter = Inter({ subsets: ['latin'] })*/
import { useSession, signIn, signOut } from "next-auth/react"
import Nav from "@/components/Nav"
import Layout from "@/components/Layout"


//The following was here before I created the Layout.js in the components folder.  I created the layout in the components so that I don't have to continually copy and paste.  I also changed the function to Layout instead of Home
/*export default function Home() {
  const { data: session } = useSession()

  if (!session){
  return (
  <div className="bg-blue-900 w-screen h-screen flex items-center">
    <div className="text-center w-full">
    <button onClick={() => signIn('google')} className="bg-white p-2 px-4 rounded-lg">Login with Google</button>
  </div>
  </div>
  );
  }
  return (
    <div className="bg-blue-900 min-h-screen flex">
      <Nav />
    {/*Flex grow is very useful, use it again*
    <div className="bg-white flex-grow mt-2 mr-2 mb-2 rounded-lg p-4"> logged in {session.user.email}</div>
    </div>
  )
}
*/

export default function Home() {
  const {data: session} = useSession();
  return <Layout>
    <div className="text-blue-900 flex justify-between">
      {/*The ? after session and user mean to only show if they exist*/}
      <h2>
      Hello, <b>{session?.user?.name}</b>
      </h2>
   <div className="flex bg-rey-300 gap-1 text-black rounded-lg overflow-hidden">
   <img src={session?.user?.image} alt=''className="w-6 h-6"></img>
   <span className="px-2">
   {session?.user?.name}
   </span>

   </div>

    </div>
  </Layout>
}