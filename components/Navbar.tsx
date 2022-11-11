import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";
import Image from "next/image";

const Navbar: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) => {
    return router.pathname === pathname;
  };

  const { data: session, status } = useSession();

  // Logo will be bream.svg from public folder

  return (
    <nav className="flex items-center justify-between flex-wrap bg-white shadow-md sticky top-0 z-50 px-6 xl:px-12 py-2">
      <div className="flex items-center mr-6">
        <Link href="/">
          <Image src="/bream.svg" alt="logo" height={150} width={150} />
        </Link>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm font-semibold lg:flex-grow">
          <Link
            href="/interface"
            className={`block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-gray-900 mr-4 ${
              isActive("/interface") ? "text-primary" : ""
            }`}
          >
            Tutor
          </Link>
          <Link
            href="/about"
            className={`block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-gray-900 mr-4 ${
              isActive("/about") ? "text-primary" : ""
            }`}
          >
            Guide
          </Link>
        </div>
        <div>
          {status === "loading" && <div>Loading...</div>}
          {status === "unauthenticated" && (
            <div>
              <Link
                href="/api/auth/signin"
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0"
              >
                Sign In
              </Link>
            </div>
          )}
          {status === "authenticated" && (
            <div>
              <p className="inline-block text-sm px-4 py-2 leading-none text-gray-900 mt-4 lg:mt-0">
                Hi {session.user?.name}!
              </p>
              <button
                onClick={() => signOut()}
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-gray-700 border-white hover:border-transparent hover:text-teal-500 hover:bg-white mt-4 lg:mt-0"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
