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
  () => import("@/components/HomeComponents/Application/Application"),
  {
    ssr: false,
  }
);
const DownloadAppMobile = dynamic(
  () => import("@/components/DownloadAppMobile/DownloadAppMobile"),
  {
    ssr: false,
  }
);
const Footer = dynamic(() => import("@/components/Footer/Footer"), {
  ssr: false,
});

const ScrollToTopButton = dynamic(
  () => import("@/components/UI/ScrollToTopButton/ScrollToTopButton"),{
    ssr: false
  }
);

const rubik = Rubik({
  subsets: ["latin", "cyrillic"],
  variable: "--font-rubik",
});

export const metadata: Metadata = {
  icons: "/img/favicon.ico",
  description:
    "Интернет магазин Max.kg:бытовая техника, ноутбуки, спорт товары, туризм, сад и огород, автотовары и оборудование, товары для дома и бизнеса. Покупайте в Max.kg: ✓ Официальная гарантия",
  keywords:
    "Оптом  Кыргызстан дешево цена розница доставка на заказ интернет магазин Бишкек max.kg характеристики фото",
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
