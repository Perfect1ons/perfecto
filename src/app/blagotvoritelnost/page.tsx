import { getFooter, getFooterPages } from "@/api/requests";
import FooterPageRenderer from "@/components/UI/FooterPageRenderer/FooterPageRenderer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Благотворительность",
  description:
    "Маркетплейс №1 в Кыргызстане, самый большой выбор товаров, бесплатная доставка, пункты выдачи, все виды оплат.",
  keywords:
    "Оптом  Кыргызстан дешево цена розница доставка на заказ интернет магазин Бишкек max.kg характеристики фото",
  robots: "index,follow",
};
export default async function page() {
  const blagotvoritelnost = await getFooterPages("kompaniya/blagotvoritelnost");
  const sidebarLinks = await getFooter();

  return (
    <>
      <FooterPageRenderer data={blagotvoritelnost} links={sidebarLinks} />
    </>
  );
}
