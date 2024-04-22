import { getCatalogs, getSubCatalogs } from "@/api/requests";
import AllProducts from "@/components/CatalogComponents/AllProducts/AllProducts";
import CatalogOptions from "@/components/CatalogComponents/CatalogOptions/CatalogOptions";
import CatalogPageMain from "@/components/CatalogComponents/CatalogPageName/CatalogPageMain";
import HeaderCatalog from "@/components/CatalogComponents/HeaderCatalog/HeaderCatalog";

export interface IListItem {
  title: string;
  items: string[];
}

export default async function catalog() {
  const ListItem: IListItem[] = [
    {
      title: "Компания:",
      items: [
        "О компании",
        "Контакты",
        "Вакансии",
        "Условия продажи",
        "Благотворительность",
      ],
    },
    {
      title: "Покупателям:",
      items: [
        "Пункты выдачи",
        "Корпоративным клиентам",
        "Рассрочка онлайн",
        "Тендеры",
        "Бонусы",
        "Каталог товаров",
        "Оптовые продажи",
        "Политика конфиденциальности",
      ],
    },
    {
      title: "Помощь:",
      items: [
        "Как оформить заказ?",
        "Как оплатить?",
        "Доставка",
        "Гарантии и возврат товаров",
      ],
    },
    {
      title: "Партнерам:",
      items: ["Продавцам", "Поставщикам", "Реклама", "Сотрудничество"],
    },
    {
      title: "Мы в соцсетях:",
      items: ["Instagram", "YouTube", "Facebook"],
    },
  ];

  const catalogs = await getCatalogs();
  // const id = catalogs.filter((item) => item.id);
  const category = await getSubCatalogs(1);
  // console.log(category);

  return (
    <CatalogPageMain>
      <CatalogOptions options={ListItem} />
      {/* <HeaderCatalog catalog={catalogs} /> */}
      <AllProducts catalog={catalogs} category={category} />
    </CatalogPageMain>
  );
}
