"use client";
import { ICatalogsProducts, Tov } from "@/types/Catalog/catalogProducts";
import { useEffect, useState } from "react";
import { IFiltersBrand } from "@/types/filtersBrand";
import CatalogProductList from "./CatalogProductList";
import Image from "next/image";
import styles from "./style.module.scss";
import Link from "next/link";
import { BackArrow } from "../../../../public/Icons/Icons"; // Assuming the API function is placed in @/api/catalog
import { BreadCrumbs } from "@/types/BreadCrums/breadCrums";
import {
  getCatalogProductFilter,
  getProductsByCenaMinMax,
} from "@/api/clientRequest";
import CatalogFiltres, {
  ISelectedFilterProps,
} from "../CatalogFiltres/CatalogFiltres";

interface ICatalogProductsProps {
  catalog: ICatalogsProducts;
  filter: IFiltersBrand;
  breadCrumbs: BreadCrumbs[];
}
export interface IFiltersProps {
  brand: string[];
  price: { max: number; min: number };
  dost: string[];
  additional_filter: any[];
}
type BrandSelection = {
  [key: string]: {
    [key: string]: boolean;
  };
};

export default function CatalogProducts({
  catalog,
  filter,
  breadCrumbs,
}: ICatalogProductsProps) {
  const initialItems = catalog.category.tov || [];
  const [items, setItems] = useState<Tov[]>(initialItems);
  const [selectedFilters, setSelectedFilters] = useState<ISelectedFilterProps>({
    brand: [],
    dost: [],
    additional_filter: [],
  });

  const [price, setPrice] = useState<{ min: number; max: number }>({
    min: 0,
    max: 0,
  });

  const [sortOrder, setSortOrder] = useState<
    "default" | "cheap" | "expensive" | "rating" | null
  >(null);
  const [isColumnView, setIsColumnView] = useState(false);

  const handleFilterChange = (name: string, value: any) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  // Функция для очистки фильтров
  const clearFilter = (name: string) => {
    setSelectedFilters((prevFilters: ISelectedFilterProps) => {
      // Создаем копию предыдущего состояния, чтобы избежать мутации
      const updatedFilters: any = { ...prevFilters };

      // Проверяем, существует ли имя фильтра в selectedFilters
      if (updatedFilters.hasOwnProperty(name)) {
        // Сбрасываем массив значений фильтра
        updatedFilters[name] = [];
      }

      return updatedFilters;
    });
  };

  const clearFilterCena = () => {
    setPrice({ min: 0, max: 0 });
    console.log("Цена сброшена до", { min: 0, max: 0 });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCatalogProductFilter(
          catalog.category.id,
          selectedFilters
        );
        setItems(response.category.tov || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [catalog.category.id, selectedFilters]);

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
    const sortedItems = [...items]; // Use current items for sorting
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

  const handlePriceRangeChange = (min: number, max: number) => {
    setPrice({ min, max });
  };

  const handleApplyPrice = () => {
    const fetchData = async () => {
      try {
        const response = await getProductsByCenaMinMax(
          catalog.category.id,
          price.min,
          price.max
        );
        const sortedItems = response.category.tov.sort(
          (a, b) => a.price - b.price
        );
        setItems(sortedItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  };
  return (
    <section className="seek">
      <div className="all__directions container">
        {breadCrumbs.slice(-2, -1).map((crumbs) => (
          <Link
            className="all__directions_link"
            href={`/catalog/${crumbs.full_slug}`}
            key={crumbs.id}
          >
            <BackArrow /> Назад
          </Link>
        ))}
        {breadCrumbs.map((crumbs) => {
          return (
            <Link
              className="all__directions_link"
              href={`/catalog/${crumbs.full_slug}`}
              key={crumbs.id}
            >
              {crumbs.name}
            </Link>
          );
        })}
      </div>
      <div className="container">
        <h1 className={styles.category__title}>{catalog.category.name}</h1>
        <Link href={"/page/partneram/prodavcam"}>
          <Image
            src="https://max.kg/bimages/baner/baner_987.jpg"
            width={1440}
            height={300}
            alt="banner"
            className={styles.category__image}
          />
        </Link>
      </div>
      <div className="container">
        <div className="sort__buttons">
          <CatalogFiltres
            clearFilterCena={clearFilterCena}
            applyPrice={handleApplyPrice}
            clearFilter={clearFilter}
            price={price}
            handlePriceRangeChange={handlePriceRangeChange}
            handleFilterChange={handleFilterChange}
            selectedFilters={selectedFilters}
            onChange={(value) => handleSort(value)}
            filter={filter}
            catalog={catalog}
            value={sortOrder || "default"}
            options={[
              { label: "По умолчанию", value: "default" },
              { label: "Сначала дешевле", value: "cheap" },
              { label: "Сначала дороже", value: "expensive" },
              { label: "По рейтингу", value: "rating" },
            ]}
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
      {/* <ul className={styles.choiseList}>
        {Object.entries(selectedBrands).map(([mainKey, subKeys]) =>
          Object.entries(subKeys).map(
            ([subKey, isSelected]) =>
              isSelected && (
                <li
                  key={`${mainKey}-${subKey}`}
                  className={styles.choiseList__li}
                >
                  {subKey}
                  <span
                    className={styles.choiseList__li__button}
                    onClick={() => toggleBrandSelection(mainKey, subKey)}
                  >
                    <Cross />
                  </span>
                </li>
              )
          )
        )}
        {Object.keys(selectedBrands).length > 0 && (
          <button onClick={resetSelectionAll} className={styles.clearAllButton}>
            Очистить все
          </button>
        )}
      </ul> */}
      {/* Проверяем, есть ли товары в каталоге */}
      {items && items.length === 0 ? (
        <div className={styles.containerUndefined}>
          <Image src="/img/undefinedPage.png" alt="" width={180} height={180} />
          <p className={styles.containerUndefined__parap}>
            В этой категории нет товаров продавай на max kg
          </p>
        </div>
      ) : (
        <CatalogProductList items={items} isColumnView={isColumnView} />
      )}
    </section>
  );
}
