import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.scss";

import Footer from "@/components/Footer/Footer";

import Header from "@/components/Header/Header";

const rubik = Rubik ({
  subsets: ["latin", "cyrillic"],
  variable: "--font-rubik",
})

export const metadata: Metadata = {
  icons: "/img/favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${rubik.variable}`}>
      <body className={rubik.className}>
        <Header/>
        {children}
        <Footer/>
        </body>
    </html>
  );
}
