import { getBrandsByName, getPopularGoods } from "@/api/requests";
import BrandByName from "@/components/Brands/BrandByName";

interface Params {
  params: { slug: string };
}

export default async function page({ params: { slug } }: Params) {
  const id = parseInt(slug.split("-").pop() || "", 10);
  const name = slug.split("-").slice(0, -1).join(" ");
  const decodedName = decodeURIComponent(name);

  const brandByNameData = await getBrandsByName(id);

      
  const [goodsOne, goodsTwo, goodsThree] = await Promise.all([
    getPopularGoods(1),
    getPopularGoods(2),
    getPopularGoods(3),
  ]);
  const goods = [goodsOne, goodsTwo, goodsThree].flat();
  return (
    <BrandByName
      goods={goods}
      path={decodedName}
      id={id}
      brand={brandByNameData}
      name={decodedName}
    />
  );
}

export async function generateMetadata({ params: { slug } }: Params) {
  const name = slug.split("-").slice(0, -1).join(" ");
  const decodedName = decodeURIComponent(name);

  const title = decodedName;
  return {
    title: `Бренд ${title}`,
    description:
      "Интернет магазин Max.kg: бытовая техника, ноутбуки, спорт товары, туризм, сад и огород, автотовары и оборудование, товары для дома и бизнеса. Покупайте в Max.kg: ✓ Официальная гарантия",
    keywords:
      "Оптом Кыргызстан дешево цена розница доставка на заказ интернет магазин Бишкек max.kg характеристики фото",
  };
}
