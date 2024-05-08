import type { Metadata } from "next";
import { Montserrat, Rubik } from "next/font/google";
import "./globals.scss";
import HeaderWrap from "@/components/Header/HeaderWrap/HeaderWrap";
import DownloadAppMobile from "@/components/DownloadAppMobile/DownloadAppMobile";
import { Suspense } from "react";
import dynamic from "next/dynamic";
import MobileMenu from "@/components/MobileMenu/MobileMenu";
import Header from "@/components/Header/Header";

const Application = dynamic(
  () => import("@/components/HomeComponents/Application/Application")
);

const Footer = dynamic(() => import("@/components/Footer/Footer"));




const rubik = Rubik({
  subsets: ["latin", "cyrillic"],
  variable: "--font-rubik",
});

const montserrat = Montserrat({
  subsets: ["latin", "cyrillic"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  icons: "/img/favicon.ico",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${rubik.variable}`}>
      <body className={rubik.className}>
        <HeaderWrap />
          <main id="main">{children}</main>
        <DownloadAppMobile />
        <MobileMenu />
        <Application />
        <Footer />
      </body>
    </html>
  );
}
