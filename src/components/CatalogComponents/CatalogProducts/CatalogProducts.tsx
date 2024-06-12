"use client";
import { ICatalogsProducts, Tov } from "@/types/Catalog/catalogProducts";
import { useEffect, useState } from "react";
import { IFiltersBrand } from "@/types/filtersBrand";
import CatalogProductList from "./CatalogProductList";
import Image from "next/image";
import styles from "./style.module.scss";
import Link from "next/link";
import { BackArrow, Cross } from "../../../../public/Icons/Icons"; // Assuming the API function is placed in @/api/catalog
import FiltersProducts from "../FiltersProducts/FiltersProducts";
import { BreadCrumbs } from "@/types/BreadCrums/breadCrums";
import {
  getProductsByBrand,
  getProductsByCenaMinMax,
  getProductsByDost,
} from "@/api/clientRequest";

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
  const [selectedBrands, setSelectedBrands] = useState<BrandSelection>({});
  const [selectedFilters, setSelectedFilters] = useState<IFiltersProps>({
    brand: [],
    price: { min: 0, max: 0 },
    dost: [],
    additional_filter: [],
  });
  const handlePriceChange = (values: [number, number]) => {
    const [min, max] = values;

    // Проверяем, какой ползунок был изменен
    if (min !== selectedFilters.price.min) {
      // Если изменен min, обновляем min
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        price: {
          min: min,
          max: prevFilters.price.max,
        },
      }));
    } else if (max !== selectedFilters.price.max) {
      // Если изменен max, обновляем max
      setSelectedFilters((prevFilters) => ({
        ...prevFilters,
        price: {
          min: prevFilters.price.min,
          max: max,
        },
      }));
    }
  };

  const fetchProductsByBrand = async (brands: string) => {
    try {
      const response = await getProductsByBrand(catalog.category.id, brands);
      setItems(response.category.tov || []);
    } catch (err) {
      console.error("Failed to fetch products by brand", err);
    }
  };

  const fetchProductsByDost = async (day: string) => {
    try {
      const response = await getProductsByDost(catalog.category.id, day);
      setItems(response.category.tov || []);
    } catch (err) {
      console.error("Failed to fetch products by dost", err);
    }
  };

  const toggleDostSelection = (day: string) => {
    setSelectedFilters((prevState) => {
      const updatedSelection = {
        ...prevState,
        dost: prevState.dost.includes(day)
          ? prevState.dost.filter((d) => d !== day)
          : [...prevState.dost, day],
      };
      const selectedDostPaths = updatedSelection.dost.join(",");

      // Update the URL parameters
      const queryParams = new URLSearchParams(window.location.search);
      if (selectedDostPaths) {
        queryParams.set("dost", selectedDostPaths);
      } else {
        queryParams.delete("dost");
      }
      window.history.pushState(
        {},
        "",
        `${window.location.pathname}?${queryParams.toString()}`
      );

      // Fetch products based on the updated selection
      if (selectedDostPaths) {
        fetchProductsByDost(selectedDostPaths);
      } else {
        setItems(initialItems);
      }

      return updatedSelection;
    });
  };

  const addBrand = (brand: string) => {
    setSelectedFilters((prevState) => {
      if (prevState.brand.includes(brand)) {
        return prevState; // Если бренд уже есть, возвращаем предыдущее состояние без изменений
      }
      return {
        ...prevState,
        brand: [...prevState.brand, brand],
      };
    });
  };
  const addDay = (day: string) => {
    setSelectedFilters((prevState) => {
      if (prevState.dost.includes(day)) {
        return prevState; // Если день уже есть, возвращаем предыдущее состояние без изменений
      }
      const updatedSelection = {
        ...prevState,
        dost: [...prevState.dost, day],
      };
      toggleDostSelection(day); // Добавляем вызов toggleDostSelection после обновления выбранных дней
      return updatedSelection;
    });
  };

  const fetchProductsByMinMax = async (
    min: number | null,
    max: number | null
  ) => {
    try {
      const response = await getProductsByCenaMinMax(
        catalog.category.id,
        min,
        max
      );
      let sortedItems = response.category.tov || [];
      // Sort the items by price
      sortedItems.sort((a, b) => a.cenaok - b.cenaok);
      setItems(sortedItems);
    } catch (err) {
      console.error("Failed to fetch products by cena: min & max", err);
    }
  };

  const addFilter = (filter: number) => {
    setSelectedFilters((prevState) => {
      // Можно добавить проверку на уникальность фильтров здесь, если необходимо
      return {
        ...prevState,
        additional_filter: [...prevState.additional_filter, filter],
      };
    });
  };
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
        fetchProductsByBrand(selectedBrandsPaths);

        // Update URL
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set("brands", selectedBrandsPaths);
        window.history.pushState(
          {},
          "",
          `${window.location.pathname}?${queryParams.toString()}`
        );
      } else {
        setItems(initialItems); // Reset to initial items if no brand is selected

        // Remove brands from URL
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.delete("brands");
        window.history.pushState(
          {},
          "",
          `${window.location.pathname}?${queryParams.toString()}`
        );
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
  const [page, setPage] = useState(1); // Add page state
  const [isLoading, setIsLoading] = useState(false); // Add loading state
  const [hasMore, setHasMore] = useState(true); // Add hasMore state

  // const fetchMoreProducts = async () => {
  //   if (isLoading || !hasMore) return;
  //   setIsLoading(true);
  //   try {
  //     const response = await getProducts(catalog.category.id, page + 1); // Your API function to fetch products
  //     if (response.category.tov.length > 0) {
  //       setItems((prevItems) => [...prevItems, ...response.category.tov]);
  //       setPage((prevPage) => prevPage + 1);
  //     } else {
  //       setHasMore(false);
  //     }
  //   } catch (error) {
  //     console.error("Failed to fetch more products", error);
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

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
        <div className="sort__buttons">
          <FiltersProducts
            addFilter={addFilter}
            addDay={addDay}
            addBrand={addBrand}
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
            fetchProductsByMinMax={fetchProductsByMinMax}
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
