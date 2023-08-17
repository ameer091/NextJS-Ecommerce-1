import { useSession, signIn } from "next-auth/react";
import { useState } from "react";
import { useRouter } from 'next/router';
import Nav from "@/components/Nav";
import Logo from "@/components/Logo";

export default function Layout({ children }) {
  const [showNav, setShowNav] = useState(false);
  const { data: session } = useSession();
  const router = useRouter();

  const handleDemoClick = () => {
    router.push('/admin?demoMode=true');
  };

  if (!session) {
    return (
      <div className="bg-bgGray w-screen h-screen flex items-center">
        <div className="text-center w-full">
          <button
            onClick={() => signIn('google')}
            className="bg-white p-2 px-4 rounded-lg m-2"
          >
            Login with Google
          </button>
          <button
            onClick={handleDemoClick}
            className="bg-blue-500 text-white p-2 px-4 rounded-lg m-2"
          >
            Try Admin Demo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-bgGray min-h-screen">
      <div className="block md:hidden flex items-center p-4">
        <button onClick={() => setShowNav(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
          </svg>
        </button>
        <div className="flex grow justify-center mr-8">
          <Logo />
        </div>
      </div>

      <div className="flex">
        <Nav show={showNav} />
        <div className="flex-grow p-4"> {children}</div>
      </div>
    </div>
  );
}
