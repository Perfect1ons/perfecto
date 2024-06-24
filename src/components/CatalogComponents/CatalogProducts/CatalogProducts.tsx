"use client";
import { ICatalogsProducts, Tov } from "@/types/Catalog/catalogProducts";
import { useEffect, useState } from "react";
import { Filter2, IFiltersBrand } from "@/types/filtersBrand";
import CatalogProductList from "./CatalogProductList";
import Image from "next/image";
import styles from "./style.module.scss";
import Link from "next/link";
import { BackArrow } from "../../../../public/Icons/Icons"; // Assuming the API function is placed in @/api/catalog
import { BreadCrumbs } from "@/types/BreadCrums/breadCrums";
import { getCatalogProductsFiltered } from "@/api/clientRequest";
import CatalogFiltres, {
  ISelectedFilterProps,
} from "../CatalogFiltres/CatalogFiltres";
import AllFiltersMobile from "../AllFiltersMobile/AllFiltersMobile";
import { IIntroBannerDekstop } from "@/types/Home/banner";
import { url } from "@/components/temporary/data";
import useMediaQuery from "@/hooks/useMediaQuery";
import clsx from "clsx";

import cn from "clsx";
import { ICategoryModel } from "@/types/Catalog/catalogFilters";
interface ICatalogProductsProps {
  banner: IIntroBannerDekstop;
  catalog: ICatalogsProducts;
  filter: IFiltersBrand;
  breadCrumbs: BreadCrumbs[];
}
// export interface IFiltersProps {
//   brand: string[];
//   price: { max: number; min: number };
//   dost: string[];
//   additional_filter: any[];
// }

export default function CatalogProducts({
  banner,
  catalog,
  filter,
  breadCrumbs,
}: ICatalogProductsProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [items, setItems] = useState<ICategoryModel[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<ISelectedFilterProps>({
    id: catalog.category.id,
    page: 1,
    brand: [],
    priceMin: 0,
    priceMax: 0,
    dost: [],
    additional_filter: [],
  });

  console.log(selectedFilters);

  const [sortOrder, setSortOrder] = useState<
    "default" | "cheap" | "expensive" | "rating" | null
  >(null);
  const [isColumnView, setIsColumnView] = useState(false);
  const mobileFilter = useMediaQuery("(max-width: 992px)");

  const toggleView = (view: boolean) => {
    setIsColumnView(view);
    handleViewChange(view);
  };

  const handleFilterChange = (name: string, value: any) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  // Функция для очистки фильтров
  const clearFilter = (name: string) => {
    setSelectedFilters((prevFilters: ISelectedFilterProps) => {
      const updatedFilters: any = { ...prevFilters };

      if (updatedFilters.hasOwnProperty(name)) {
        updatedFilters[name] = [];
      }

      return updatedFilters;
    });
  };

  const clearFilterByID = (filters: Filter2, selectedFilters: string[]) => {
    return Object.values(filters).filter(
      (filter) => !selectedFilters.includes(filter.id_filter.toString())
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getCatalogProductsFiltered(
          selectedFilters.id,
          selectedFilters.page,
          selectedFilters.brand.join(","),
          selectedFilters.priceMin,
          selectedFilters.priceMax,
          selectedFilters.dost.join(","),
          selectedFilters.additional_filter.join(",")
        );
        console.log(response);

        setItems(response.model || []);
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
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      priceMin: min,
      priceMax: max,
    }));
  };

  const clearFilterCena = () => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      priceMin: 0,
      priceMax: 0,
    }));
  };

  return (
    <section className="container">
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
        {/* <h2 className={styles.category__title}>Хиты продаж</h2> */}
        <Link href={"/page/partneram/prodavcam"}>
          <Image
            src={
              isMobile
                ? `${url}bimages/baner/mobile/baner_${banner.baner[0].id}.jpg`
                : `${url}bimages/baner/baner_${banner.baner[0].id}.jpg`
            }
            width={1440}
            height={300}
            alt={banner.baner[0].naim}
            className={styles.category__image}
          />
        </Link>
      </div>
      {mobileFilter ? (
        <AllFiltersMobile
          value={sortOrder || "default"}
          options={[
            { label: "По умолчанию", value: "default" },
            { label: "Сначала дешевле", value: "cheap" },
            { label: "Сначала дороже", value: "expensive" },
            { label: "По рейтингу", value: "rating" },
          ]}
          onChange={(value) => handleSort(value)}
          filter={filter}
          isColumnView={isColumnView}
          toggleView={toggleView}
        />
      ) : (
        <div className="container">
          <div className="sort__buttons">
            <CatalogFiltres
              clearFilterByID={clearFilterByID}
              clearFilterCena={clearFilterCena}
              clearFilter={clearFilter}
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

            <div className={cn("default__sort_style", "sortBoxShadow")}>
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
      )}
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
      <div className={clsx(styles.descriptionContainer, "container")}>
        <h3 className={styles.descriptionContainer__categoryTitle}>
          {catalog.category.title}
        </h3>
        <div className={styles.parapContainer}>
          <p className={styles.parapContainer__keywords}>
            {catalog.category.description}
          </p>
          <p className={styles.parapContainer__keywords}>
            {catalog.category.keywords}
          </p>
        </div>
      </div>
    </section>
  );
}
