'use client'
import { signIn, signOut, useSession } from 'next-auth/react'
export const Header = () => {
    const session = useSession();
    const { data } = session;
    return (
        <>  
            <nav>
                <div className="flex flex-wrap justify-between items-center px-5 mt-2 py-2">
                    <a href="/" className="flex items-center pb-2">
                        <span className="self-center text-md font-semibold whitespace-nowrap dark:text-white">Open Code Lab</span>
                    </a>
                    <div className="flex items-center ">
                        { data && <button><a href="/my-codes" className="mr-6 text-gray-500 dark:text-white">My Codes</a></button> }
                        { !data && <button className='bg-neutral-800 text-white font-bold rounded-md py-2 px-5 text-sm' onClick={() => signIn()}>Login</button> }
                        { data && <button className='bg-neutral-800 text-white font-bold rounded-md py-2 px-5 text-sm' onClick={() => signOut()}>Logout</button> }
                    </div>
                </div>
            </nav>
        </>
    )
}