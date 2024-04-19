import { getCatalog, getCatalogSecond } from "@/api/requests";
import Catalog from "@/components/Catalog/Catalog";
import CatalogOptions from "@/components/Catalog/CatalogOptions/CatalogOptions";
import { ICatalogFirst } from "@/types/catalogFirst";
import { ICatalogSecond } from "@/types/catalogSecond";

import React from "react";

export interface IListItem {
  title: string;
  items: string[];
}

export interface CatalogProps {
  catalog: ICatalogFirst[];
  category: ICatalogSecond;
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

const CatalogPage: React.FC = async () => {
  const catalog = await getCatalog();
  const category = await getCatalogSecond(2000000464);

  return (
    <>
      {/* <CatalogOptions options={ListItem} /> */}
      <Catalog catalog={catalog} category={category} />
    </>
  );
};

export default CatalogPage;
