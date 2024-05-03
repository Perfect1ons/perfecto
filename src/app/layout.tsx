import type { Metadata } from "next";

import { Montserrat, Rubik } from "next/font/google";
import "./globals.scss";
import HeaderWrap from "@/components/Header/HeaderWrap/HeaderWrap";
import DownloadAppMobile from "@/components/DownloadAppMobile/DownloadAppMobile";
import Footer from "@/components/Footer/Footer";
import MobileMenu from "@/components/MobileMenu/MobileMenu";

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
        <DownloadAppMobile />
        {/* ниже меню для мобильной версии */}
        <MobileMenu />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
