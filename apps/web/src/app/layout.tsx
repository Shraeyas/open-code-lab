import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Provider } from "./components/Provider";
import { Header } from "./components/Header";
const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "OpenCodeLab",
  description: "Execute Code Online",
};
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Provider>
      <html lang="en" className="dark">
        <body className={inter.className}>
          <Header />
          {children}
          <div className="fixed right-5 bottom-5 font-bold bg-gradient-to-r from-blue-950 to-neutral-950 p-3 rounded-s-full rounded-e-full text-sm"><a target={"_blank"} href={"https://github.com/Shraeyas/open-code-lab"}>View on GitHub</a></div>
        </body>
      </html>
    </Provider>
  );
}
