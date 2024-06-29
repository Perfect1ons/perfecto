import {
  getCatalogProductsFilteredByAbdulaziz,
  getFiltersBrandByAbdulaziz,
} from "@/api/requests";
import CatalogFilterByAbdulaziz from "@/components/temporary/CatalogFiltersByAbdulaziz/CatalogFiltersByAbdulaziz";

export default async function page() {
  // const getCatalogFilteredId = await getCatalogsProducts(fullPath);
  const catalogFilteredData = await getCatalogProductsFilteredByAbdulaziz(
    28631
  );
  const catalogFilteredFilters = await getFiltersBrandByAbdulaziz(28631);

  return (
    <CatalogFilterByAbdulaziz
      filtered={catalogFilteredData.model}
      filters={catalogFilteredFilters}
    />
  );
}

export async function generateMetadata() {
  return {
    title: "ЭТО МОЯ СТРАНИЦА ЭТО МОЁ И Я ТУТ ПРОВОЖУ СВОИ ТЕСТЫ :)))",
    description:
      "Интернет магазин Max.kg:бытовая техника, ноутбуки, спорт товары, туризм, сад и огород, автотовары и оборудование, товары для дома и бизнеса. Покупайте в Max.kg: ✓ Официальная гарантия",
    keywords:
      "Оптом  Кыргызстан дешево цена розница доставка на заказ интернет магазин Бишкек max.kg характеристики фото",
  };
}
