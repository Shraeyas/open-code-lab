"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSession } from "next-auth/react";
import axios, { AxiosResponse, AxiosError } from "axios";
import { Badge } from "ui";
import { redirect } from "next/navigation";
import Link from "next/link";
interface ExecutionData {
  id: string;
  input: string;
  lang: string;
  status: string;
  verdict: string;
  createdAt: string;
}
interface ExecutionHistory {
  data: {
    data: ExecutionData[];
  };
}
export default function MyCodes() {
  const session = useSession();
  if (session.status === "unauthenticated") {
    redirect("/");
  }
  const [executionHistory, setExecutionHistory] =
    useState<ExecutionHistory | null>(null);
  useEffect(() => {
    axios.post("/api/user/my-codes").then((data) => {
      setExecutionHistory(data as ExecutionHistory);
    });
  }, [session]);
  return (
    <div className="flex text-sm justify-center table-fixed mt-7">
      <table>
        <thead>
          <tr className="bg-neutral-950">
            <th className="p-3 px-10 text-left">ID</th>
            <th className="p-3 px-10 text-left">Language</th>
            <th className="p-3 px-10 text-left">Status</th>
            <th className="p-3 px-10 text-left">Verdict</th>
            <th className="p-3 px-10 text-left">Link</th>
            <th className="p-3 px-10 text-left">Date Created</th>
          </tr>
        </thead>
        <tbody>
          {executionHistory &&
            executionHistory.data.data.map((data, idx) =>
              idx % 2 ? (
                <tr key={idx} className="p-3 bg-neutral-900">
                  <td scope="row" className="p-3 px-10">
                    {data.id}
                  </td>
                  <td className="p-3 px-10">{data.lang}</td>
                  <td className="p-3 px-10">{data.status}</td>
                  <td className="p-3 px-10">
                    <Badge executionResult={data.verdict} />
                  </td>
                  <td className="p-3 px-10">
                    <Link href={`/my-codes/view/${data.id}`}><i>View</i></Link>
                  </td>
                  <td className="p-3 px-10">
                    {new Date(data.createdAt).toString().split("GMT")[0]}
                  </td>
                </tr>
              ) : (
                <tr key={idx} className="p-3 bg-neutral-800">
                  <td scope="row" className="p-3 px-10">
                    {data.id}
                  </td>
                  <td className="p-3 px-10">{data.lang}</td>
                  <td className="p-3 px-10">{data.status}</td>
                  <td className="p-3 px-10">
                    <Badge executionResult={data.verdict} />
                  </td>
                  <td className="p-3 px-10">
                    <Link href={`/my-codes/view/${data.id}`}>
                      <i>View</i>
                    </Link>
                  </td>
                  <td className="p-3 px-10">
                    {new Date(data.createdAt).toString().split("GMT")[0]}
                  </td>
                </tr>
              )
            )}
        </tbody>
      </table>
    </div>
  );
}
