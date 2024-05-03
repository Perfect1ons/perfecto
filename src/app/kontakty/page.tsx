import { getFooter, getFooterPages } from "@/api/requests";
import FooterPageRenderer from "@/components/UI/FooterPageRenderer/FooterPageRenderer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакты max.kg в Бишкеке",
  description:
    "Маркетплейс max.kg Контакты , Адрес г. Бишкек ул. матыева 148",
  keywords:
    "Оптом  Кыргызстан дешево цена розница доставка на заказ интернет магазин Бишкек max.kg характеристики фото",
  robots: "index,follow",
};
export default async function page() {
  const contacts = await getFooterPages("kompaniya/kontakty");
  const sidebarLinks = await getFooter();

  return (
    <>
      <FooterPageRenderer data={contacts} links={sidebarLinks} />
    </>
  );
}
