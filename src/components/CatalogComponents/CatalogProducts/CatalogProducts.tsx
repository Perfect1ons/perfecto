"use client";
import { ICatalogsProducts, Tov } from "@/types/Catalog/catalogProducts";
import { useEffect, useState } from "react";
import { IFiltersBrand } from "@/types/filtersBrand";
import CatalogProductList from "./CatalogProductList";
import Image from "next/image";
import styles from "./style.module.scss";
import Link from "next/link";
import { Cross } from "../../../../public/Icons/Icons";// Assuming the API function is placed in @/api/catalog
import FiltersProducts from "../FiltersProducts/FiltersProducts";

interface ICatalogProductsProps {
  catalog: ICatalogsProducts;
  filter: IFiltersBrand;
}
interface IFiltersProps {
  brand: string[];
  price: { max: number; min: number };
  dost: string[];
  additional_filter: string[];
}
type BrandSelection = {
  [key: string]: {
    [key: string]: boolean;
  };
};

export default function CatalogProducts({
  catalog,
  filter,
}: ICatalogProductsProps) {
  const initialItems = catalog.category.tov || []; // Ensure initialItems is always an array
  const [items, setItems] = useState<Tov[]>(initialItems);
  const [selectedBrands, setSelectedBrands] = useState<BrandSelection>({});
  const [selectedFilters, setSelectedFilters] = useState<IFiltersProps>({
    brand: [],
    price: { max: 0, min: 0 },
    dost: [],
    additional_filter: [],
  });
  // Функция для извлечения id_filter из данных фильтров
  const extractAdditionalFilters = (filterData: any) => {
    let additionalFilters = [];
    for (let key in filterData) {
      const filters = filterData[key].filter;
      for (let filterKey in filters) {
        additionalFilters.push(filters[filterKey].id_filter);
      }
    }
    return additionalFilters;
  };
  // Функция для обновления состояния
  const addFiltersToState = (apiData: any, setSelectedFilters: any) => {
    const selectedFilters = {
      brand: apiData.brand || [],
      price: { max: 0, min: 0 }, // Предполагаем, что цена не является частью данных API
      dost: apiData.variant_day || [],
      additional_filter: extractAdditionalFilters(apiData.filter),
    };

    setSelectedFilters(selectedFilters);
  };
  const [sortOrder, setSortOrder] = useState<
    "default" | "cheap" | "expensive" | "rating" | null
  >(null);
  const [isColumnView, setIsColumnView] = useState(false);

  // const fetchProductsByBrand = async (brandPath: string) => {
  //   try {
  //     const response = await getProductsSortsBrand(
  //       catalog.category.id,
  //       brandPath
  //     );
  //     setItems(response.category.tov || []);
  //   } catch (error) {
  //     console.error("Failed to fetch products by brand", error);
  //   }
  // };

  const toggleBrandSelection = (mainKey: string, subKey: string) => {
    setSelectedBrands((prevState) => {
      const updatedSelection = {
        ...prevState,
        [mainKey]: {
          ...prevState[mainKey],
          [subKey]: !prevState[mainKey]?.[subKey],
        },
      };
      const selectedBrandsPaths = Object.entries(updatedSelection)
        .flatMap(([main, subs]) =>
          Object.entries(subs)
            .filter(([sub, isSelected]) => isSelected)
            .map(([sub]) => sub)
        )
        .join(",");
      if (selectedBrandsPaths) {
        // fetchProductsByBrand(selectedBrandsPaths);
      } else {
        setItems(initialItems); // Reset to initial items if no brand is selected
      }
      return updatedSelection;
    });
  };

  const resetSelection = (mainKey: string) => {
    setSelectedBrands((prevState) => {
      const updatedSelection = { ...prevState };
      if (updatedSelection[mainKey]) {
        Object.keys(updatedSelection[mainKey]).forEach((subKey) => {
          updatedSelection[mainKey][subKey] = false;
        });
      }
      // fetchProductsByBrand(""); // Fetch all products when a brand is reset
      return updatedSelection;
    });
  };

  const resetSelectionAll = () => {
    setSelectedBrands({});
    setItems(initialItems); // Reset to initial items when all selections are reset
  };

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

  return (
    <section className="seek">
      <div className={styles.breadContainer}>
        <ol className={styles.breadcrumb}>
          <li className={styles.links}>
            <Link href="/" className={styles.link}>
              Главная
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
          <FiltersProducts
            filter={filter}
            value={sortOrder || "default"}
            options={[
              { label: "По умолчанию", value: "default" },
              { label: "Сначала дешевле", value: "cheap" },
              { label: "Сначала дороже", value: "expensive" },
              { label: "По рейтингу", value: "rating" },
            ]}
            onChange={(value) => handleSort(value)}
            onBrandToggle={toggleBrandSelection}
            selectedBrands={selectedBrands}
            onReset={resetSelection}
            resetSelectionAll={resetSelectionAll}
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
      <ul className={styles.choiseList}>
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
      </ul>
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
