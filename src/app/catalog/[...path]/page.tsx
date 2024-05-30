import { getBreadCrumbs, getCatalogsProducts } from "@/api/requests";
import Catalogs from "@/components/Catalog/Catalog";
interface Params {
  params: { path: string | string[] };
}

export async function generateMetadata({ params: { path } }: Params) {
  let fullPath: string;
  if (Array.isArray(path)) {
    fullPath = path.join("/");
  } else {
    fullPath = path;
  }
  const data = await getCatalogsProducts(fullPath);
  const title = data.category.name;
  return {
    title: title,
    description:
      "Интернет магазин Max.kg:бытовая техника, ноутбуки, спорт товары, туризм, сад и огород, автотовары и оборудование, товары для дома и бизнеса. Покупайте в Max.kg: ✓ Официальная гарантия",
    keywords:
      "Оптом  Кыргызстан дешево цена розница доставка на заказ интернет магазин Бишкек max.kg характеристики фото",
  };
}

export default async function page({ params: { path } }: Params) {
  try {
    let fullPath: string;
    if (Array.isArray(path)) {
      // Если path является массивом строк, объединяем их в одну строку
      fullPath = path.join("/");
    } else {
      // Если path уже является строкой, используем его как есть
      fullPath = path;
    }
    try {
      // const catalogs = await getCatalogsMenu();
      const catalogs = await getCatalogsProducts(fullPath);
      const breadCrumbs = await getBreadCrumbs(catalogs.category.id)
      return (
        <div>
          <Catalogs catalog={catalogs} path={fullPath} breadCrumbs={breadCrumbs}/>
        </div>
      );
    } catch (error) {
      console.error("Ошибка:", error);
      return (
        <div>
          Ошибка при выборе каталогов. Пожалуйста, повторите попытку позже.
        </div>
      );
    }
  } catch (error) {
    console.error("Ошибка:", error);
    return <div>Произошла ошибка. Пожалуйста, попробуйте еще раз позже.</div>;
  }
}
