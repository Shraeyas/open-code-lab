"use client";
import React from "react";
import { signIn } from "next-auth/react";
function page() {
  return (
    <>
      <div
        className="flex justify-center mt-72"
        onClick={() => signIn("google", { callbackUrl: "/" })}
      >
        <button className="rounded p-5 px-9 bg-gray-700 text-lg">
          <span className="text-gray-200">Sign in with</span>
          <span className="text-yellow-500"> </span>
          <strong>
            <span className="text-blue-500">G</span>
            <span className="text-red-500">o</span>
            <span className="text-yellow-500">o</span>
            <span className="text-blue-500">g</span>
            <span className="text-green-500">l</span>
            <span className="text-red-500">e</span>
          </strong>
        </button>
      </div>
    </>
  );
}

export default page;
