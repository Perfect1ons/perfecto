import type { Metadata } from "next";
import { Montserrat, Rubik } from "next/font/google";
import "./globals.scss";
import dynamic from "next/dynamic";

import Provider from "@/context/Provider";
import HeaderWrap from "@/components/Header/HeaderWrap/HeaderWrap";
// import { Provider } from "react-redux";
import ReactProvider from "@/ReactProvider";

const Application = dynamic(
  () => import("@/components/HomeComponents/Application/Application")
);

const DownloadAppMobile = dynamic(
  () => import("@/components/DownloadAppMobile/DownloadAppMobile")
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
    <html lang="ru" className={`${rubik.variable}`}>
      <body className={rubik.className}>
        <ReactProvider>
          <HeaderWrap />
          <DownloadAppMobile />
          <Provider>
            <main id="main">{children}</main>
          </Provider>
          <Application />
          <Footer />
        </ReactProvider>
      </body>
    </html>
  );
}
