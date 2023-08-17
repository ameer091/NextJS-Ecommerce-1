import Image from 'next/image'
import { Inter } from 'next/font/google'
/*const inter = Inter({ subsets: ['latin'] })*/
import { useSession, signIn, signOut } from "next-auth/react"
import Nav from "@/components/Nav"
import Layout from "@/components/Layout"


export default function Home() {
  const {data: session} = useSession();
  return <Layout>
    <div className="text-blue-900 flex justify-between">
      <h2>
      Hello, <b>{session?.user?.name}</b>
      </h2>
   <div className="flex bg-rey-300 gap-1 text-black rounded-lg overflow-hidden">
   <Image src={session?.user?.image} alt='' width={500} height={500}/>
   <span className="px-2">
   {session?.user?.name}
   </span>

   </div>

    </div>
  </Layout>
}