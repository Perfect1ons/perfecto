import type { Metadata } from "next";
import { Rubik } from "next/font/google";
import "./globals.scss";
import dynamic from "next/dynamic";
import Provider from "@/context/Provider";
import HeaderWrap from "@/components/Header/HeaderWrap/HeaderWrap";
import ReactProvider from "@/ReactProvider";
import { cookies } from "next/headers";
import AuthProvider from "@/context/AuthContext";
import { ModalProvider } from "@/context/ModalContext/ModalContext";
import { getNotification } from "@/api/requests";
const DynamicMessageModal = dynamic(
  () => import("@/components/UI/MessageModal/MessageModal"),
  {
    ssr: false,
  }
);
const Application = dynamic(
  () => import("@/components/HomeComponents/Application/Application")
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
  () => import("@/components/UI/ScrollToTopButton/ScrollToTopButton"),
  {
    ssr: false,
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
  const userId = cookieStore.get("userId")?.value;

  if (isAuthed && userId) {
    const notifications = await getNotification(parseInt(userId));
  }

  return (
    <html lang="ru" className={`${rubik.variable}`}>
      <body className={rubik.className}>
        <div id="__next">
          <AuthProvider >
            <ReactProvider>
              <HeaderWrap isAuthed={isAuthed} searchHistory={searchHistory} />
              <DownloadAppMobile />
              <Provider>
                <ModalProvider>
                  <main id="main">{children}</main>
                  <DynamicMessageModal />
                  <ScrollToTopButton />
                </ModalProvider>
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
