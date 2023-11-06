import React from "react";
import axios from "axios";
import { useState, useRef } from "react";
import { CodeEditor, Button } from "ui";
import { Dropdown } from "ui";
import Input from "./Input";
function Code({ setExecutionId }: any) {
  const supportedLanguages = ["cpp", "python"];
  const [code, setCode] = useState("");
  const [stdin, setStdin] = useState("");
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
      .post("/api/code/execute", {
        src: code,
        lang: "cpp",
        input: stdin,
      })
      .then((data) => {
        setExecutionId(data.data.data.executionId);
      });
  };
  return (
    <form>
      <div className="pb-1 px-1">
        <CodeEditor code={code} setCode={setCode} />
      </div>
      <div className="grid grid-cols-1">
        <div className="flow-root p-1">
          <div className="float-left w-60">
            <select
              id={supportedLanguages[0]}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-neutral-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option selected>{supportedLanguages[0]}</option>
              {supportedLanguages.slice(1).map((supportedLanguages, idx) => (
                <option key={idx} value={supportedLanguages}>
                  {supportedLanguages}
                </option>
              ))}
            </select>
          </div>
          <div className="float-right">
            <button
              onClick={onSubmit}
              type="button"
              className="focus:outline-none font-bold text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm p-3 px-5 dark:focus:ring-yellow-900"
            >
              {"Run"}
            </button>
          </div>
        </div>
        <div className="p-1">
          <Input stdin={stdin} setStdin={setStdin} />
        </div>
      </div>
    </form>
  );
}
export default Code;
