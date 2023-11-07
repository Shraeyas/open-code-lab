"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import Link from 'next/link';
export const Header = () => {
  const session = useSession();
  const { data } = session;
  return (
    <>
      <nav>
        <div className="flex flex-wrap justify-between items-center px-5 mt-2 py-2">
          <Link href="/" className="flex items-center pb-2">
            <span className="self-center text-md font-semibold whitespace-nowrap dark:text-white">
              Open Code Lab
            </span>
          </Link>
          <div className="flex items-center ">
            {data && (
              <button>
                <Link
                  href="/my-codes"
                  className="mr-6 text-gray-500 dark:text-white"
                >
                  My Codes
                </Link>
              </button>
            )}
            {!data && (
              <Link
                href="/signin"
                className="bg-neutral-800 text-white font-bold rounded-md py-2 px-5 text-sm"
              >
                Login
              </Link>
            )}
            {data && (
              <Link
              href="/signout"
                className="bg-neutral-800 text-white font-bold rounded-md py-2 px-5 text-sm"
                // onClick={() => signOut()}
              >
                Logout
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
};
