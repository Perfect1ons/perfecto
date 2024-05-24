import { getCardProduct, getSimilarProduct } from "@/api/requests";
import ItemPage from "@/components/Item/Item";

interface Params {
  params: { path: string };
}
export async function generateMetadata({ params: { path } }: Params) {
  const data = await getCardProduct(path[0]);

  const title = data.items.naim;
  return {
    title: `${title} в Бишкеке купить по ☝доступной цене в Кыргызстане ▶️ max.kg`,
    description: `Купить ${title}, описание, фото, характеристики, видео, ✍️️ отзывы.Гарантия ☑️ .  Консультация специалиста. ▶️ Бесплатная доставка. Онлайн оплата. Рассрочка ☎️ 0(553)93 1111, 0(500)93 1111`,
    keywords: `Оптом ${title} Кыргызстан дешево цена розница доставка на заказ интернет магазин Бишкек max.kg характеристики фото`,
  };
}

export default async function item({ params: { path } }: Params) {
  const data = await getCardProduct(path[0]);
  const similarData = await getSimilarProduct(path[0]);

  return <ItemPage data={data.items} similar={similarData} />;
}
