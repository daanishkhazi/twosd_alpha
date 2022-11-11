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
            className={
              "block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-primary-500 mr-4"
            }
          >
            Tutor
          </Link>
          <Link
            href="/about"
            className={
              "block mt-4 lg:inline-block lg:mt-0 text-gray-700 hover:text-primary-500 mr-4"
            }
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
                className="inline-block text-sm font-semibold text-gray-700 px-4 py-2 leading-none bg-slate-200 rounded-full hover:bg-slate-300 mt-4 lg:mt-0"
              >
                Sign In
              </Link>
            </div>
          )}
          {status === "authenticated" && (
            <div>
              <p className="inline-block text-sm px-4 py-2 leading-none text-gray-900 mt-4 lg:mt-0">
                {session.user?.name}
              </p>
              <button
                onClick={() => signOut()}
                className="inline-block text-sm font-semibold text-gray-700 px-4 py-2 leading-none bg-slate-200 rounded-full hover:bg-slate-300 mt-4 lg:mt-0"
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
