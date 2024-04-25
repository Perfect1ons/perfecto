import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.scss";

import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import HeaderWrap from "@/components/Header/HeaderWrap/HeaderWrap";
const rubik = Rubik({
  subsets: ["latin", "cyrillic"],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  icons: "/img/favicon.ico",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // запрос на главные каталоги
  // const catalogs = await getCatalogs();
  // // const id = catalogs.filter((item) => item.id);

  // // на дочерниe каталоги главных каталогов
  // const category = await getSubCatalogs(2000000464);
  // // console.log(category);

  return (
    <html lang="en" className={`${rubik.variable}`}>
      <body className={rubik.className}>
        {/* <Header /> */}
        <HeaderWrap />
        <div id="portal" />
        {children}
        <Footer />
      </body>
    </html>
  );
}
