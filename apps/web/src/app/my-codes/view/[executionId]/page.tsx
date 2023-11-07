"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import axios from "axios";
import { CodeEditor } from "ui";
interface Params {
  executionId: string;
}
interface CodeDataInterface {
  success: string;
  data: {
    id: string;
    input: string;
    lang: string;
    src: string;
    status: string;
    verdict: string;
    output: string;
  };
}
export default function Page({ params }: { params: Params }) {
  const session = useSession();
  if(session.status === 'unauthenticated') {
    redirect("/");
  }
  const { executionId } = params;
  const [codeData, setCodeData] = useState<CodeDataInterface | null>(null);
  useEffect(() => {
    if (executionId) {
      axios
        .post("/api/user/get-code/", { id: executionId })
        .then((response) => {
          const responseData = response.data as CodeDataInterface;
          setCodeData(responseData);
        });
    }
  }, [executionId]);

  return (
    <div>
      <div className="grid grid-cols-1 pb-2 px-2 lg:grid-cols-3">
        <div className="col-span-1 px-2 lg:col-span-2">
          <form>
            <div className="pb-1 px-1">
              {codeData && (
                <CodeEditor code={codeData.data.src} readOnly={true} />
              )}
            </div>
            <div className="grid grid-cols-1">
              <div className="flow-root p-1">
                <div className="float-left w-60">
                  <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-neutral-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {codeData && codeData.data.lang}
                  </div>
                </div>
              </div>
              <div className="p-1">
                <div
                  id="custom-input"
                  className="block p-3 w-full text-sm resize-none text-gray-900  bg-slate-800  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Add Custom Input Here..."
                >
                  {(codeData && codeData.data.input) || "No Input Was Provided"}
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="col-span-1 p-1 lg:p-0 lg:col-span-1">
          {codeData?.data?.verdict === "Compilation Error" ? (
            <span className="bg-yellow-100 text-sm font-medium m-2 px-5 py-1 rounded dark:bg-yellow-900 dark:text-yellow-300">
              Compilation Error
            </span>
          ) : (
            <></>
          )}
          {codeData?.data?.verdict === "Runtime Error" ? (
            <span className="bg-red-100 text-red-800 text-sm font-medium m-2 px-5 py-1 rounded dark:bg-red-900 dark:text-red-300">
              Runtime Error
            </span>
          ) : (
            <></>
          )}
          {codeData?.data?.verdict === "Executed" ? (
            <span className="bg-green-100 text-green-800 text-sm font-medium m-2 px-5 py-1 rounded dark:bg-green-900 dark:text-green-300">
              Success
            </span>
          ) : (
            <></>
          )}
          {!codeData ? (
            <span className="bg-gray-100 text-gray-800 text-sm font-medium m-2 px-5 py-1 rounded dark:bg-neutral-700 dark:text-gray-300">
              No Code To Execute!
            </span>
          ) : (
            <></>
          )}
          <div className=" bg-neutral-800 h-auto rounded-md p-3 m-2">
            <strong>Output</strong>
            <br />
            <br />
            {codeData ? codeData.data.output : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
