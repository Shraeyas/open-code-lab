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
        </body>
      </html>
    </Provider>
  );
}
