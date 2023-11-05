"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { CodeEditor } from "ui";
function page({ params }) {
  const { executionId } = params;
  const [codeData, setCodeData] = useState(null);
  useEffect(() => {
    if (executionId) {
      axios.post("/api/user/get-code/", { id: executionId }).then((data) => {
        setCodeData(data);
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
                <CodeEditor code={codeData.data.data.src} readOnly={true} />
              )}
            </div>
            <div className="grid grid-cols-1">
              <div className="flow-root p-1">
                <div className="float-left w-60">
                  <div className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-neutral-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    {codeData && codeData.data.data.lang}
                  </div>
                </div>
              </div>
              <div className="p-1">
                <div
                  id="custom-input"
                  rows={4}
                  className="block p-3 w-full text-sm resize-none text-gray-900  bg-slate-800  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Add Custom Input Here..."
                >
                  {(codeData && codeData.data.data.input) ||
                    "No Input Was Provided"}
                </div>
              </div>
            </div>
          </form>
        </div>
        <div className="col-span-1 p-1 lg:p-0 lg:col-span-1">
          {codeData?.data.data?.verdict === "Compilation Error" ? (
            <span className="bg-yellow-100 text-sm font-medium m-2 px-5 py-1 rounded dark:bg-yellow-900 dark:text-yellow-300">
              Compilation Error
            </span>
          ) : (
            <></>
          )}
          {codeData?.data.data?.verdict === "Runtime Error" ? (
            <span class="bg-red-100 text-red-800 text-sm font-medium m-2 px-5 py-1 rounded dark:bg-red-900 dark:text-red-300">
              Runtime Error
            </span>
          ) : (
            <></>
          )}
          {codeData?.data.data?.verdict === "Executed" ? (
            <span class="bg-green-100 text-green-800 text-sm font-medium m-2 px-5 py-1 rounded dark:bg-green-900 dark:text-green-300">
              Success
            </span>
          ) : (
            <></>
          )}
          {!codeData ? (
            <span class="bg-gray-100 text-gray-800 text-sm font-medium m-2 px-5 py-1 rounded dark:bg-neutral-700 dark:text-gray-300">
              No Code To Execute!
            </span>
          ) : (
            <></>
          )}
          <div className=" bg-neutral-800 h-auto rounded-md p-3 m-2">
            <strong>Output</strong>
            <br />
            <br />
            {codeData ? codeData.data.data.output : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
export default page;
