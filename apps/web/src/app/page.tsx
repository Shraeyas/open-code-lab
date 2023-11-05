"use client";
import React, { useRef, useState } from "react";
import Output from "./components/Output";
import Code from "./components/Code";
export default function Home() {
  const [executionId, setExecutionId] = useState("");
  return (
    <>
      <div className="grid grid-cols-1 pb-2 px-2 lg:grid-cols-3">
        <div className="col-span-1 px-2 lg:col-span-2">
          <Code setExecutionId={setExecutionId} />
        </div>
        <div className="col-span-1 p-1 lg:p-0 lg:col-span-1">
          <Output executionId={executionId} />
        </div>
      </div>
    </>
  );
}
