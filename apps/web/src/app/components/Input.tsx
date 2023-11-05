import React from "react";

function Input({
  stdin,
  setStdin,
}: {
  stdin: string;
  setStdin: (value: string) => void;
}) {
  return (
    <textarea
      id="custom-input"
      onChange={(e) => setStdin(e.target.value)}
      rows={4}
      className="block p-3 w-full text-sm resize-none text-gray-900  bg-slate-800  rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-neutral-800 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      placeholder="Add Custom Input Here..."
    ></textarea>
  );
}

export default Input;
