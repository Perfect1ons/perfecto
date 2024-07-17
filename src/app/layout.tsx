import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.scss";
import dynamic from "next/dynamic";
import Provider from "@/context/Provider";
import HeaderWrap from "@/components/Header/HeaderWrap/HeaderWrap";
import ReactProvider from "@/ReactProvider";
import { cookies } from "next/headers";
import AuthProvider from "@/context/AuthContext";

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
  const isAuthed = cookieStore.get("identify")?.value;

  return (
    <html lang="ru" className={`${rubik.variable}`}>
      <body className={rubik.className}>
        <div id="__next">
          <AuthProvider>
            <ReactProvider>
              <HeaderWrap isAuthed={isAuthed} searchHistory={searchHistory} />
              <DownloadAppMobile />
              <Provider>
                <main id="main">{children}</main>
                <ScrollToTopButton />
              </Provider>
              <Application />
              <Footer />
            </ReactProvider>
          </AuthProvider>
        </div>
      </body>
    </html>
  );
}
