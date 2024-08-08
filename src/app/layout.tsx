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
import { getBasket, getCurrentOrders, getNotification, getProductBasket } from "@/api/requests";
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
  display: "swap",
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
  const cart = cookieStore.get("cart")?.value;
  const match = cart?.match(/s:7:"cart_id";i:(\d+)/);
  const cartId = match && match[1] ? parseInt(match[1], 10) : undefined;
  let notifications;
  let orders;
  let cartData: any;

  if (isAuthed && userId) {
    notifications = await getNotification(parseInt(userId));
    orders = await getCurrentOrders(isAuthed);
    cartData = await getBasket(isAuthed, 1);
  } else {
    cartData = (await getProductBasket(1, cartId ?? 0)).model;
  }

  return (
    <html lang="ru" className={`${rubik.variable}`}>
      <body className={rubik.className}>
        <div id="__next">
          <ReactProvider>
            <AuthProvider
              cartData={cartData}
              cartId={cartId}
              notifCount={notifications}
              ordersCount={orders}
              isAuthed={isAuthed}
              personId={userId}
            >
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
            </AuthProvider>
          </ReactProvider>
        </div>
      </body>
    </html>
  );
}
