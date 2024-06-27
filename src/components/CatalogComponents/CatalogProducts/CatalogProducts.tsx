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
import { usePathname, useSearchParams } from "next/navigation";
interface ICatalogProductsProps {
  banner: IIntroBannerDekstop;
  catalog: ICatalogsProducts;
  filter: IFiltersBrand;
  breadCrumbs: BreadCrumbs[];
}

export default function CatalogProducts({
  banner,
  catalog,
  filter,
  breadCrumbs,
}: ICatalogProductsProps) {
  // custom hook media query
  const isMobile = useMediaQuery("(max-width: 768px)");
  const initialItems = catalog.category.tov || [];
  const [items, setItems] = useState<ICategoryModel[] | Tov[]>(initialItems);

  const searchParams = useSearchParams();
  const pageNumber = parseInt(searchParams.get("page") ?? "1");

  const totalPages = Math.max(Math.ceil(100 / 30), 1);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 5
  );

  // selected filters storage
  const [selectedFilters, setSelectedFilters] = useState<ISelectedFilterProps>({
    id: catalog.category.id,
    page: 1,
    brand: [],
    priceMin: 0,
    priceMax: 0,
    dost: [],
    additional_filter: [],
  });

  //temp price storage
  const [tempPrice, setTempPrice] = useState<{
    tempMin: number;
    tempMax: number;
  }>({
    tempMin: 0,
    tempMax: 0,
  });

  //default sort storage
  const [sortOrder, setSortOrder] = useState<
    "default" | "cheap" | "expensive" | "rating" | null
  >(null);
  const [isColumnView, setIsColumnView] = useState(false);
  //custom hook media query
  const mobileFilter = useMediaQuery("(max-width: 992px)");

  //catalog view toggler
  const toggleView = (view: boolean) => {
    setIsColumnView(view);
    handleViewChange(view);
  };
  // filter change function
  const handleFilterChange = (name: string, value: any) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };
  // Функция для очистки фильтров
  //clear filter function
  const clearFilter = (name: string) => {
    setSelectedFilters((prevFilters: ISelectedFilterProps) => {
      const updatedFilters: any = { ...prevFilters };

      if (updatedFilters.hasOwnProperty(name)) {
        updatedFilters[name] = [];
      }

      return updatedFilters;
    });
  };
  //clear additional filter by id function
  const clearFilterByID = (filters: Filter2, selectedFilters: string[]) => {
    return Object.values(filters).filter(
      (filter) => !selectedFilters.includes(filter.id_filter.toString())
    );
  };
  // useEffect hook for fetching data
  useEffect(() => {
    const fetchData = async () => {
      let maxPrice = 0;
      if (selectedFilters.priceMax > 0) {
        maxPrice = selectedFilters.priceMax;
      } else if (selectedFilters.priceMin > 0) {
        maxPrice = 9999999; // Or any large number, like 999999
      }
      const promises = [];
      for (let page = 1; page <= selectedFilters.page; page++) {
        promises.push(
          getCatalogProductsFiltered(
            selectedFilters.id,
            page,
            selectedFilters.brand.join(","),
            selectedFilters.priceMin,
            maxPrice,
            selectedFilters.dost.join(","),
            selectedFilters.additional_filter.join(",")
          )
        );
      }

      try {
        const responses = await Promise.all(promises);

        // Объединяем данные всех страниц в один массив
        const allItems = responses.reduce(
          (acc: (ICategoryModel | Tov)[], response) => {
            if (response.model) {
              acc.push(...response.model);
            }
            return acc;
          },
          []
        );

        // Устанавливаем все полученные товары
        setItems(allItems);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [catalog.category.id, selectedFilters]);

  //hook for scroll fetching pages
  useEffect(() => {
    let lastScrollTop = 0; // переменная для отслеживания последнего положения скролла

    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;

      // Проверяем, что пользователь скроллит вниз и не меняем page при скроллинге вверх
      if (
        scrollTop > lastScrollTop &&
        scrollTop % 10 === 0 &&
        selectedFilters.page < 5 // Максимальное значение страницы 5
      ) {
        setSelectedFilters((prevFilters) => {
          // Проверяем, что текущая страница меньше 5 перед увеличением
          if (prevFilters.page < 5) {
            return {
              ...prevFilters,
              page: prevFilters.page + 1, // Увеличиваем номер страницы
            };
          }
          return prevFilters; // Возвращаем текущие фильтры без изменений
        });
      }

      lastScrollTop = scrollTop; // Обновляем последнее положение скролла
    };

    // Присоединяем слушатель события скролла
    window.addEventListener("scroll", handleScroll);

    // Удаляем слушатель события скролла при размонтировании компонента
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [selectedFilters]); // Обновляем эффект только при изменении selectedFilters

  //useEffect hook for url params
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

  //useEffect hook for default sort
  useEffect(() => {
    if (sortOrder !== null && sortOrder !== "default") {
      sortItems(sortOrder);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortOrder]);

  //default sort function
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
  //default sort handler
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
  //column view handler
  const handleViewChange = (isColumn: boolean) => {
    setIsColumnView(isColumn);
  };
  // filter price range changer
  const handlePriceRangeChange = (min: number, max: number) => {
    setTempPrice((prevTempPrice) => ({
      ...prevTempPrice,
      tempMin: min,
      tempMax: max,
    }));
  };
  //apply filter price function
  const applyFilterPrice = () => {
    setSelectedFilters({
      ...selectedFilters,
      priceMin: tempPrice.tempMin,
      priceMax: tempPrice.tempMax,
    });
  };
  //clear filter price function
  const clearFilterPrice = () => {
    setTempPrice({ tempMin: 0, tempMax: 0 });
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      priceMin: 0,
      priceMax: 0,
    }));
  };

  const handlePageChange = (simbol: "+" | "-") => {
    if (selectedFilters.page >= 5) {
      switch (simbol) {
        case "+":
          setSelectedFilters({
            ...selectedFilters,
            page: selectedFilters.page + 1,
          });
          break;
        case "-":
          setSelectedFilters({
            ...selectedFilters,
            page: selectedFilters.page - 1,
          });
        default:
          break;
      }
    }
  };

  return (
    <section>
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
              tempPrice={tempPrice}
              clearFilterByID={clearFilterByID}
              clearFilterPrice={clearFilterPrice}
              clearFilter={clearFilter}
              applyFilterPrice={applyFilterPrice}
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
          <Image
            src="/img/undefinedPage.png"
            alt="undefinedPage"
            width={180}
            height={180}
          />
          <p className={styles.containerUndefined__parap}>
            В этой категории нет товаров продавай на max kg
          </p>
        </div>
      ) : (
        <CatalogProductList items={items} isColumnView={isColumnView} />
      )}
      {selectedFilters.page >= 5 && (
        <div className="pagination">
          <Link className="link" href={`?page=${pageNumber - 1}`} passHref>
            <button
              onClick={() => handlePageChange("-")}
              disabled={pageNumber === 1}
              className={clsx(
                "pagination__button",
                pageNumber === 1 && "pagination__button_disactive"
              )}
            >
              {"<"}
            </button>
          </Link>
          {pageNumbers.map((page) => (
            <Link className="link" href={`?page=${page}`} key={page} passHref>
              <button
                className={clsx(
                  "pagination__button",
                  page === pageNumber && "pagination__button_active"
                )}
                onClick={() => handlePageChange("+")}
              >
                {page}
              </button>
            </Link>
          ))}
          <Link className="link" href={`?page=${pageNumber + 1}`} passHref>
            <button
              onClick={() => handlePageChange("+")}
              disabled={pageNumber === totalPages}
              className={clsx(
                "pagination__button",
                pageNumber === totalPages && "pagination__button_disactive"
              )}
            >
              {">"}
            </button>
          </Link>
        </div>
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
