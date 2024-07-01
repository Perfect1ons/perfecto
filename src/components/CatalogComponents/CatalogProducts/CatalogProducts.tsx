"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.scss";
import { BackArrow } from "../../../../public/Icons/Icons";
import { getCatalogProductsFiltered } from "@/api/clientRequest";
import CatalogProductList from "./CatalogProductList";
import CatalogFiltres, {
  ISelectedFilterProps,
} from "../CatalogFiltres/CatalogFiltres";
import AllFiltersMobile from "../AllFiltersMobile/AllFiltersMobile";
import useMediaQuery from "@/hooks/useMediaQuery";
import cn from "clsx";
import {
  ICategoryFilter,
  ICategoryModel,
} from "@/types/Catalog/catalogFilters";
import { ICatalogsProducts, Tov } from "@/types/Catalog/catalogProducts";
import { IFiltersBrand, Filter2 } from "@/types/filtersBrand";
import { BreadCrumbs } from "@/types/BreadCrums/breadCrums";
import { IIntroBannerDekstop } from "@/types/Home/banner";
import { url } from "@/components/temporary/data";
import ReactPaginate from "react-paginate";
import CardSkeleton from "@/components/UI/Card/CardSkeleton";

interface ICatalogProductsProps {
  init: ICategoryFilter;
  banner: IIntroBannerDekstop;
  catalog: ICatalogsProducts;
  filter: IFiltersBrand;
  breadCrumbs: BreadCrumbs[];
}

export default function CatalogProducts({
  init,
  banner,
  catalog,
  filter,
  breadCrumbs,
}: ICatalogProductsProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const initialItems = init.model || [];
  const searchParams = useSearchParams();
  const initialPage = parseInt(searchParams.get("page") || "1", 10);

  // Parse initial filter values from URL
  const initialBrand = searchParams.get("brand")?.split(",") || [];
  const initialPriceMin = parseInt(searchParams.get("priceMin") || "0", 10);
  const initialPriceMax = parseInt(searchParams.get("priceMax") || "0", 10);
  const initialDost = searchParams.get("dost")?.split(",") || [];
  const initialAdditionalFilter =
    searchParams.get("additional_filter")?.split(",") || [];

  const [items, setItems] = useState<ICategoryModel[] | Tov[]>([]);
  const [count, setCount] = useState<number>(0);
  const [selectedFilters, setSelectedFilters] = useState<ISelectedFilterProps>({
    id: catalog.category.id,
    page: initialPage,
    brand: initialBrand,
    priceMin: initialPriceMin,
    priceMax: initialPriceMax,
    dost: initialDost,
    additional_filter: initialAdditionalFilter,
  });
  const resetCategoryFilters = (categoryFilters: Filter2) => {
    setSelectedFilters((prevSelectedFilters) => {
      const updatedFilters = {
        ...prevSelectedFilters,
        additional_filter: prevSelectedFilters.additional_filter.filter(
          (id: any) =>
            !Object.values(categoryFilters).some(
              (filter) => filter.id_filter.toString() === id
            )
        ),
      };
      updateURLWithFilters(updatedFilters); // Переместили вызов сюда
      return updatedFilters; // Обновляем состояние с обновленными фильтрами
    });
  };

  const [tempPrice, setTempPrice] = useState<{
    tempMin: number;
    tempMax: number;
  }>({
    tempMin: initialPriceMin,
    tempMax: initialPriceMax,
  });

  const [sortOrder, setSortOrder] = useState<
    "default" | "cheap" | "expensive" | "rating" | null
  >(null);
  const [isColumnView, setIsColumnView] = useState(false);
  const [pageCount, setPageCount] = useState<any>(
    Math.ceil(Math.ceil(init.totalCount / 20))
  );
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator
  const mobileFilter = useMediaQuery("(max-width: 992px)");

  const toggleView = (view: boolean) => {
    setIsColumnView(view);
    handleViewChange(view);
  };

  const handleFilterChange = (name: string, value: any) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
      page: 1, // Reset page when filters change
    }));
    updateURLWithFilters({ ...selectedFilters, [name]: value, page: 1 });
  };

  const clearFilter = (name: string) => {
    setSelectedFilters((prevFilters: ISelectedFilterProps) => {
      const updatedFilters: any = { ...prevFilters };

      if (updatedFilters.hasOwnProperty(name)) {
        updatedFilters[name] = [];
      }

      return {
        ...updatedFilters,
        page: 1, // Reset page when filters change
      };
    });
    updateURLWithFilters({ ...selectedFilters, [name]: [], page: 1 });
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true); // Set loading to true when fetching data
      let maxPrice = 0;
      if (selectedFilters.priceMax > 0) {
        maxPrice = selectedFilters.priceMax;
      } else if (selectedFilters.priceMin > 0) {
        maxPrice = 9999999; // Or any large number, like 999999
      }

      try {
        const response = await getCatalogProductsFiltered(
          selectedFilters.id,
          selectedFilters.page,
          selectedFilters.brand.join(","),
          selectedFilters.priceMin,
          maxPrice,
          selectedFilters.dost.join(","),
          selectedFilters.additional_filter.join(",")
        );

        if (response.model) {
          setCount(response.model.length);
          setPageCount(Math.ceil(response.totalCount / 20));
          setItems(response.model);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Set loading to false when data fetching is complete
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    const sortedItems = [...items];
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
    // Scroll to the top of the page when changing view
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setTempPrice((prevTempPrice) => ({
      ...prevTempPrice,
      tempMin: min,
      tempMax: max,
    }));
  };
  const applyFilterPrice = () => {
    setSelectedFilters({
      ...selectedFilters,
      priceMin: tempPrice.tempMin,
      priceMax: tempPrice.tempMax,
      page: 1, // Сбрасываем страницу при изменении фильтра цены
    });
    updateURLWithFilters({
      ...selectedFilters,
      priceMin: tempPrice.tempMin,
      priceMax: tempPrice.tempMax,
      page: 1,
    });
  };

  // const applyFilterPrice = () => {
  //   setSelectedFilters({
  //     ...selectedFilters,
  //     priceMin: tempPrice.tempMin,
  //     priceMax: tempPrice.tempMax,
  //     page: 1, // Reset page when price filter changes
  //   });
  //   updateURLWithFilters({
  //     ...selectedFilters,
  //     priceMin: tempPrice.tempMin,
  //     priceMax: tempPrice.tempMax,
  //     page: 1,
  //   });
  // };

  // const clearFilterPrice = () => {
  //   setTempPrice({ tempMin: 0, tempMax: 0 });
  //   setSelectedFilters((prevFilters) => ({
  //     ...prevFilters,
  //     priceMin: 0,
  //     priceMax: 0,
  //     page: 1, // Reset page when price filter changes
  //   }));
  //   updateURLWithFilters({
  //     ...selectedFilters,
  //     priceMin: 0,
  //     priceMax: 0,
  //     page: 1,
  //   });
  // };
  const clearFilterPrice = () => {
    // Установить tempPrice в начальные значения
    setTempPrice({
      tempMin: initialPriceMin,
      tempMax: initialPriceMax,
    });

    // Обновить selectedFilters и URL с начальными значениями
    setSelectedFilters({
      ...selectedFilters,
      priceMin: initialPriceMin,
      priceMax: initialPriceMax,
      page: 1,
    });

    updateURLWithFilters({
      ...selectedFilters,
      priceMin: initialPriceMin,
      priceMax: initialPriceMax,
      page: 1,
    });
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    const newPage = selected + 1;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      page: newPage,
    }));
    updateURLWithFilters({ ...selectedFilters, page: newPage });
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const updateURLWithFilters = (filters: ISelectedFilterProps) => {
    const queryParams = new URLSearchParams();
    if (filters.page > 1) queryParams.set("page", filters.page.toString());
    if (filters.brand.length > 0)
      queryParams.set("brand", filters.brand.join(","));
    if (filters.priceMin > 0)
      queryParams.set("priceMin", filters.priceMin.toString());
    if (filters.priceMax > 0)
      queryParams.set("priceMax", filters.priceMax.toString());
    if (filters.dost.length > 0)
      queryParams.set("dost", filters.dost.join(","));
    if (filters.additional_filter.length > 0)
      queryParams.set("additional_filter", filters.additional_filter.join(","));

    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.pushState({ path: newUrl }, "", newUrl);
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
              resetCategoryFilters={resetCategoryFilters}
              tempPrice={tempPrice}
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
      {isLoading ? (
        <div className="cards toptwenty">
          {Array.from({ length: count > 0 ? count : 18 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : items && items.length !== 0 ? (
        <>
          <CatalogProductList items={items} isColumnView={isColumnView} />
          <ReactPaginate
            previousLabel={"<"}
            forcePage={selectedFilters.page - 1}
            nextLabel={">"}
            breakLabel={"..."}
            pageCount={pageCount}
            marginPagesDisplayed={1}
            pageRangeDisplayed={3}
            onPageChange={handlePageChange}
            containerClassName={"pagination"}
            pageClassName={"page-item"}
            pageLinkClassName={"page-link"}
            previousClassName={"page-item-btn"}
            previousLinkClassName={"page-link-previous"}
            nextClassName={"page-item-btn"}
            nextLinkClassName={"page-link-next"}
            breakClassName={"page-item"}
            breakLinkClassName={"page-link"}
            activeClassName={"active"}
          />
        </>
      ) : (
        <div className={styles.containerUndefined}>
          <Image
            src="/img/undefinedPage.png"
            alt="undefinedPage"
            width={180}
            height={180}
          />
          <p className={styles.containerUndefined__parap}>
            В этой категории нет товаров
          </p>
        </div>
      )}

      <div className={cn(styles.descriptionContainer, "container")}>
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
