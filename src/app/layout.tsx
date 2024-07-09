import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.scss";
import dynamic from "next/dynamic";
import Provider from "@/context/Provider";
import HeaderWrap from "@/components/Header/HeaderWrap/HeaderWrap";
import ReactProvider from "@/ReactProvider";
import { cookies } from "next/headers";

const Application = dynamic(
  () => import("@/components/HomeComponents/Application/Application")
);
const DownloadAppMobile = dynamic(
  () => import("@/components/DownloadAppMobile/DownloadAppMobile")
);
const Footer = dynamic(() => import("@/components/Footer/Footer"));
const ScrollToTopButton = dynamic(
  () => import("@/components/UI/ScrollToTopButton/ScrollToTopButton")
);

const rubik = Rubik({
  subsets: ["latin", "cyrillic"],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  icons: "/img/favicon.ico",
  manifest: "/manifest.json",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
    const cookieStore = cookies();
    const searchHistory: string[] = JSON.parse(
      cookieStore.get("searchHistory")?.value || "[]"
    );
  return (
    <html lang="ru" className={`${rubik.variable}`}>
      <body className={rubik.className}>
        <ReactProvider>
          <HeaderWrap searchHistory={searchHistory}/>
          <DownloadAppMobile />
          <Provider>
            <main id="main">{children}</main>
            <ScrollToTopButton />
          </Provider>
          <Application />
          <Footer />
        </ReactProvider>
      </body>
    </html>
  );
}
