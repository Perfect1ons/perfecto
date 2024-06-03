import { getFooter, getFooterPages } from "@/api/requests";
import FooterPage from "@/components/Footer/FooterPage/FooterPage";
import React from "react";

interface Params {
  params: { path: string };
}

export default async function page({ params: { path } }: Params) {
  let fullPath: string;
  if (Array.isArray(path)) {
    fullPath = path.join("/");
  } else {
    fullPath = path;
  }

  const data = await getFooterPages(fullPath);
  const sidebarLinks = await getFooter();

  return <FooterPage data={data} links={sidebarLinks} breadcrumb={fullPath} />;
}

export async function generateMetadata({ params: { path } }: Params) {
  let fullPath: string;
  if (Array.isArray(path)) {
    fullPath = path.join("/");
  } else {
    fullPath = path;
  }
  const data = await getFooterPages(fullPath);
  const title = data.model.naim;
  return {
    title: title,
    description:
      "Интернет магазин Max.kg:бытовая техника, ноутбуки, спорт товары, туризм, сад и огород, автотовары и оборудование, товары для дома и бизнеса. Покупайте в Max.kg: ✓ Официальная гарантия",
    keywords:
      "Оптом  Кыргызстан дешево цена розница доставка на заказ интернет магазин Бишкек max.kg характеристики фото",
  };
}
