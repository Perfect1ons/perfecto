import { getCatalogs } from "@/api/requests";
import HeaderCatalog from "@/components/CatalogComponents/HeaderCatalog/HeaderCatalog";

const CatalogeHome = async () => {
  const catalogs = await getCatalogs();
  return <HeaderCatalog catalog={catalogs} />;
};

export default CatalogeHome;

import CatalogOptions from "@/components/Catalog/CatalogOptions/CatalogOptions";
import React from "react";

export interface IListItem {
  title: string;
  items: string[];
}

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

const CatalogPage: React.FC = () => {
  return (
    <>
      <CatalogOptions options={ListItem} />
    </>
  );
};

export default CatalogPage;
