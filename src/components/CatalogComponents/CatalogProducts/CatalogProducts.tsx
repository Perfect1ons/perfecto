"use client";
import { ICatalogsProducts, Tov } from "@/types/Catalog/catalogProducts";
import { useEffect, useState } from "react";
import { IFiltersBrand } from "@/types/filtersBrand";
import CatalogProductList from "./CatalogProductList";
import CatalogProductsCustom from "./CatalogProductsCustom";
import Image from "next/image";
import styles from "./style.module.scss";
import Link from "next/link";

interface ICatalogProductsProps {
  catalog: ICatalogsProducts;
  filter: IFiltersBrand;
}

export default function CatalogProducts({
  catalog,
  filter,
}: ICatalogProductsProps) {
  const initialItems = catalog.category.tov; // Сохраняем исходные данные
  const [items, setItems] = useState<Tov[]>(initialItems);
  const [sortOrder, setSortOrder] = useState<
    "default" | "cheap" | "expensive" | "rating" | null
  >(null);
  const [isColumnView, setIsColumnView] = useState(false);

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const sortParam = queryParams.get("sort");
    if (
      sortParam &&
      (sortParam === "cheap" ||
        sortParam === "expensive" ||
        sortParam === "rating")
    ) {
      setSortOrder(sortParam as "cheap" | "expensive" | "rating");
    } else {
      setSortOrder("default");
    }
  }, []);

  useEffect(() => {
    if (sortOrder !== null && sortOrder !== "default") {
      sortItems(sortOrder);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOrder]);

  const sortItems = (order: "cheap" | "expensive" | "rating") => {
    const sortedItems = [...initialItems]; // Используем исходные данные для сортировки
    switch (order) {
      case "cheap":
        sortedItems.sort((a, b) => a.cenaok - b.cenaok);
        break;
      case "expensive":
        sortedItems.sort((a, b) => b.cenaok - a.cenaok);
        break;
      case "rating":
        sortedItems.sort((a, b) => b.ocenka - a.ocenka);
        break;
      default:
        break;
    }
    setItems(sortedItems);
  };

  const handleSort = (order: "default" | "cheap" | "expensive" | "rating") => {
    setSortOrder(order);
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("sort", order);
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${queryParams.toString()}`
    );
  };

  const handleViewChange = (isColumn: boolean) => {
    setIsColumnView(isColumn);
  };

  return (
    <section className="seek">
      <div className={styles.breadContainer}>
        <ol className={styles.breadcrumb}>
          <li className={styles.links}>
            <Link href="/" className={styles.link}>
              Главная
            </Link>
            <Link href={catalog.full_slug} className={styles.link}>
              {catalog.category.parent}
            </Link>
            <Link
              href={catalog.category.full_slug || "sadas"}
              className={styles.link}
            >
              {catalog.category.name}
            </Link>
          </li>
        </ol>
        <h1 className={styles.container__h1}>{catalog.category.name}</h1>
      </div>
      <div className="container">
        <div className="sort__buttons">
          <CatalogProductsCustom
            productId={catalog.category.id}
            filter={filter}
            value={sortOrder || "default"}
            options={[
              { label: "По умолчанию", value: "default" },
              { label: "Сначала дешевле", value: "cheap" },
              { label: "Сначала дороже", value: "expensive" },
              { label: "По рейтингу", value: "rating" },
            ]}
            onChange={(value) => handleSort(value)}
          />
          <div className="default__sort_style">
            <button
              className="default__sort_icons"
              onClick={() => handleViewChange(false)}
            >
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  className={`default__sort_icon ${
                    !isColumnView ? "sort__button_icons_active" : ""
                  }`}
                ></div>
              ))}
            </button>

            <button
              className="default__sort_icons_column"
              onClick={() => handleViewChange(true)}
            >
              {[...Array(2)].map((_, index) => (
                <div
                  key={index}
                  className={`default__sort_icon_column ${
                    isColumnView ? "sort__button_icons_active" : ""
                  }`}
                ></div>
              ))}
            </button>
          </div>
        </div>
      </div>
      {/* Проверяем, есть ли товары в каталоге */}
      {items.length === 0 ? (
        <div className={styles.containerUndefined}>
          <Image src="/img/undefinedPage.png" alt="" width={180} height={180} />
          <p className={styles.containerUndefined__parap}>
            По вашему запросу товаров не найдено
          </p>
        </div>
      ) : (
        <CatalogProductList items={items} isColumnView={isColumnView} />
      )}
    </section>
  );
}
