import React from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { signOut, useSession } from "next-auth/react";

const Navbar: React.FC = () => {
  const router = useRouter();
  const isActive: (pathname: string) => boolean = (pathname) => {
    return router.pathname === pathname;
  };

  const { data: session, status } = useSession();

  return (
    <nav className="flex items-center justify-between flex-wrap bg-gray-800 p-6">
      <div className="flex items-center flex-shrink-0 text-white mr-6">
        <Link href="/">
          <span className="font-semibold text-xl tracking-tight">two_sd</span>
        </Link>
      </div>
      <div className="w-full block flex-grow lg:flex lg:items-center lg:w-auto">
        <div className="text-sm lg:flex-grow">
          <Link
            href="/interface"
            className={`block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4 ${
              isActive("/interface") ? "text-white" : ""
            }`}
          >
            Tutor
          </Link>
          <Link
            href="/"
            className={`block mt-4 lg:inline-block lg:mt-0 text-gray-200 hover:text-white mr-4 ${
              isActive("/about") ? "text-white" : ""
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
              <p className="inline-block text-sm px-4 py-2 leading-none text-white mt-4 lg:mt-0">
                Hi {session.user?.name}!
              </p>
              <button
                onClick={() => signOut()}
                className="inline-block text-sm px-4 py-2 leading-none border rounded text-white border-white hover:border-transparent hover:text-gray-800 hover:bg-white mt-4 lg:mt-0"
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
