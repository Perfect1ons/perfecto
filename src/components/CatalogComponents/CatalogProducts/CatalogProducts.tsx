"use client";
import React, { useEffect, useRef, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import styles from "./style.module.scss";
import {
  getCatalogProductsFilters,
  getFiltersBrandByClient,
} from "@/api/clientRequest";
import CatalogProductList from "./CatalogProductList";
import CatalogFiltres, {
  ISelectedFilterProps,
} from "../CatalogFiltres/CatalogFiltres";
import AllFiltersMobile from "../AllFiltersMobile/AllFiltersMobile";
import useMediaQuery from "@/hooks/useMediaQuery";
import cn from "clsx";
import { ICategoryModel } from "@/types/Catalog/catalogFilters";
import { ICatalogsProducts, Tov } from "@/types/Catalog/catalogProducts";
import { IFiltersBrand, Filter2 } from "@/types/filtersBrand";
import { BreadCrumbs } from "@/types/BreadCrums/breadCrums";
import { IIntroBannerDekstop } from "@/types/Home/banner";
import { IFiltersBrandByAbdulaziz, url } from "@/components/temporary/data";
import CardSkeleton from "@/components/UI/Card/CardSkeleton";
import CatalogPagination from "./CatalogPagination/CatalogPagination";
import dynamic from "next/dynamic";
import CatalogCrumbs from "./CatalogCrumbs/CatalogCrumbs";
import CatalogBanner from "./CatalogBanner/CatalogBanner";

const FiltersCrumbs = dynamic(() => import("./FiltersCrumbs/FiltersCrumbs"));
const CatalogDesc = dynamic(() => import("./CatalogDesc/CatalogDesc"));
const CatalogUndefined = dynamic(
  () => import("./CatalogUndefined/CatalogUndefined")
);

interface ICatalogProductsProps {
  banner: IIntroBannerDekstop;
  catalog: ICatalogsProducts;
  filter: IFiltersBrand;
  breadCrumbs: BreadCrumbs[];
  filtered: IFiltersBrandByAbdulaziz;
}

type SelectedFilters = {
  brand: string[];
  priceMin: number;
  priceMax: number;
  dost: string[];
  additional_filter: string[];
  sortName: string;
};

export type FilterKey = keyof SelectedFilters;

export default function CatalogProducts({
  banner,
  catalog,
  filter,
  breadCrumbs,
  filtered,
}: ICatalogProductsProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isSMobile = useMediaQuery("(max-width: 480px)");
  const searchParams = useSearchParams();
  const initialPage = parseInt(searchParams?.get("page") || "1", 10);
  const initialBrand = searchParams?.get("brand")?.split(",") || [];
  const initialPriceMin = parseInt(searchParams?.get("priceMin") || "0", 10);
  const initialPriceMax = parseInt(searchParams?.get("priceMax") || "0", 10);
  const initialDost = searchParams?.get("dost")?.split(",") || [];
  const initialAdditionalFilter =
    searchParams?.get("additional_filter")?.split(",") || [];
  const initialSortName = searchParams?.get("sort") || "id";
  const [items, setItems] = useState<ICategoryModel[] | Tov[]>([]);
  const [count, setCount] = useState<number>(0);
  const [defSelectFilter, setDefSelectFilter] = useState({
    sortName: initialSortName,
    sortTitle: "По популярности",
  });
  const [selectedFilters, setSelectedFilters] = useState<ISelectedFilterProps>({
    id: catalog.category.id,
    page: initialPage,
    brand: initialBrand,
    priceMin: initialPriceMin,
    priceMax: initialPriceMax,
    dost: initialDost,
    additional_filter: initialAdditionalFilter,
    sortName: defSelectFilter.sortName,
  });

  const [tempPrice, setTempPrice] = useState<{
    tempMin: number;
    tempMax: number;
  }>({
    tempMin: initialPriceMin,
    tempMax: initialPriceMax,
  });

  const [isColumnView, setIsColumnView] = useState(false);
  const [pageCount, setPageCount] = useState<any>();
  const [start, setStart] = useState<number>(0);
  const [limit, setLimit] = useState<number>(20);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const loaderRef = useRef<HTMLDivElement | null>(null);
  const [isLoadingScroll, setIsLoadingScroll] = useState(false); // State for loading indicator
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator
  const mobileFilter = useMediaQuery("(max-width: 992px)");
  const [clientFilter, setClientFilter] = useState(filter);
  const toggleView = (view: boolean) => {
    setIsColumnView(view);
    setStart(0);
    handleViewChange(view);
  };
  const handleShowMore = () => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      page: prevFilters.page + 1,
    }));
    setStart(0);
    updateURLWithFilters({
      ...selectedFilters,
      page: selectedFilters.page + 1,
    });
    window.scrollTo({ top: 300, behavior: "auto" });
  };

  const handleFilterChange = (name: string, value: any) => {
    setStart(0);
    const updatedFilters = {
      ...selectedFilters,
      [name]: value,
      page: 1, // Сброс страницы при изменении фильтров
    };

    setSelectedFilters(updatedFilters); // Обновление состояния фильтров
    updateURLWithFilters(updatedFilters); // Обновление URL с новыми фильтрами
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const clearAllCrumbs = () => {
    setStart(0);
    window.scrollTo({ top: 300, behavior: "smooth" });
    setSelectedFilters({
      id: selectedFilters.id, // Preserve catalog.category.id
      page: 1,
      brand: [],
      priceMin: 0,
      priceMax: 0,
      dost: [],
      additional_filter: [],
      sortName: selectedFilters.sortName,
    });

    setTempPrice({
      tempMin: 0,
      tempMax: 0,
    });

    updateURLWithFilters({
      id: selectedFilters.id,
      page: 1,
      brand: [],
      priceMin: 0,
      priceMax: 0,
      dost: [],
      additional_filter: [],
      sortName: selectedFilters.sortName,
    });
  };
  const clearFilter = (name: string) => {
    const updatedFilters = {
      ...selectedFilters,
      [name]: [],
      page: 1, // Сброс страницы при изменении фильтров
    };

    setSelectedFilters(updatedFilters); // Обновление состояния фильтров
    updateURLWithFilters(updatedFilters); // Обновление URL с новыми фильтрами
  };

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
    setStart(0);
    window.scrollTo({ top: 300, behavior: "smooth" });
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
        const response = await getCatalogProductsFilters(
          selectedFilters.id,
          selectedFilters.page,
          start,
          limit,
          selectedFilters.brand.join(","),
          selectedFilters.priceMin,
          maxPrice,
          selectedFilters.dost.join(","),
          selectedFilters.additional_filter.join(","),
          defSelectFilter.sortName
        );
        const clientFilter = await getFiltersBrandByClient(
          selectedFilters.id,
          selectedFilters.additional_filter.join(",")
        );

        if (response.category.tov) {
          setCount(response.category.tov.length);
          setPageCount(response.kol_page);
          setItems(response.category.tov);
        }
        if (clientFilter) {
          setClientFilter(clientFilter);
        }
        setStart(0);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Set loading to false when data fetching is complete
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalog.category.id, selectedFilters, defSelectFilter.sortName]);

  const fetchByScroll = async (startValue: number) => {
    setIsLoadingScroll(true); // Set loading to true when fetching data
    let maxPrice = 0;
    if (selectedFilters.priceMax > 0) {
      maxPrice = selectedFilters.priceMax;
    } else if (selectedFilters.priceMin > 0) {
      maxPrice = 9999999; // Or any large number, like 999999
    }

    try {
      const response = await getCatalogProductsFilters(
        selectedFilters.id,
        selectedFilters.page,
        startValue,
        20,
        selectedFilters.brand.join(","),
        selectedFilters.priceMin,
        maxPrice,
        selectedFilters.dost.join(","),
        selectedFilters.additional_filter.join(","),
        defSelectFilter.sortName
      );
      const clientFilter = await getFiltersBrandByClient(
        selectedFilters.id,
        selectedFilters.additional_filter.join(",")
      );

      if (response.category.tov) {
        setCount((prevCount) => prevCount + response.category.tov.length);
        setPageCount(response.kol_page);
        setItems((prevItems) => [...prevItems, ...response.category.tov]);
      }
      if (clientFilter) {
        setClientFilter(clientFilter);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoadingScroll(false); // Set loading to false when data fetching is complete
    }
  };

  const handleViewChange = (isColumn: boolean) => {
    setIsColumnView(isColumn);
    window.scrollTo({ top: 300, behavior: "auto" });
    setStart(0);
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setTempPrice((prevTempPrice) => ({
      ...prevTempPrice,
      tempMin: min,
      tempMax: max,
    }));
    setStart(0);
  };

  const applyFilterPrice = () => {
    window.scrollTo({ top: 300, behavior: "smooth" });
    setSelectedFilters({
      ...selectedFilters,
      priceMin: tempPrice.tempMin,
      priceMax: tempPrice.tempMax,
      page: 1, // Reset page when price filter changes
    });
    updateURLWithFilters({
      ...selectedFilters,
      priceMin: tempPrice.tempMin,
      priceMax: tempPrice.tempMax,
      page: 1,
    });
    setStart(0);
  };

  const clearFilterPrice = () => {
    setTempPrice({ tempMin: 0, tempMax: 0 });
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      priceMin: 0,
      priceMax: 0,
      page: 1, // Reset page when price filter changes
    }));
    updateURLWithFilters({
      ...selectedFilters,
      priceMin: 0,
      priceMax: 0,
      page: 1,
    });
    setStart(0);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    const newPage = selected + 1;
    const updatedFilters = {
      ...selectedFilters,
      page: newPage,
    };
    setStart(0);
    setSelectedFilters(updatedFilters); // Обновление состояния фильтров
    updateURLWithFilters(updatedFilters); // Обновление URL с новой страницей
    window.scrollTo({ top: 300, behavior: "auto" });
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
    if (filters.sortName) queryParams.set("sort", filters.sortName);
    //
    // if (filters.sortName !== defSelectFilter.sortName)
    //   queryParams.set("sort", filters.sortName);
    const newUrl = `${window.location.pathname}?${queryParams.toString()}`;
    window.history.replaceState({ path: newUrl }, "", newUrl);
  };

  const clearFilterCrumbs = (filterKey: FilterKey, value: string | number) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters = { ...prevFilters };

      if (filterKey === "priceMin") {
        updatedFilters[filterKey] = 0;
        setTempPrice({ tempMin: 0, tempMax: tempPrice.tempMax });
      } else if (filterKey === "priceMax") {
        updatedFilters[filterKey] = 0;
        setTempPrice({ tempMin: tempPrice.tempMin, tempMax: 0 });
      } else if (Array.isArray(updatedFilters[filterKey])) {
        updatedFilters[filterKey] = (
          updatedFilters[filterKey] as string[]
        ).filter((item) => item !== value);
      }

      updateURL(updatedFilters);

      return updatedFilters;
    });
    setStart(0);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const updateURL = (filters: SelectedFilters) => {
    const params = new URLSearchParams();

    if (filters.brand.length > 0) {
      params.set("brand", filters.brand.join(","));
    }
    if (filters.priceMin > 0) {
      params.set("priceMin", filters.priceMin.toString());
    }
    if (filters.priceMax > 0) {
      params.set("priceMax", filters.priceMax.toString());
    }
    if (filters.dost.length > 0) {
      params.set("dost", filters.dost.join(","));
    }
    if (filters.additional_filter.length > 0) {
      params.set("additional_filter", filters.additional_filter.join(","));
    }
    if (filters.sortName) {
      params.set("sort", filters.sortName);
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({ path: newUrl }, "", newUrl);

    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      page: 1,
    }));
    setStart(0);
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  const handleSortChange = (option: {
    sortName: string;
    sortTitle: string;
  }) => {
    const updatedFilters = {
      ...selectedFilters,
      sortName: option.sortName,
      page: 1, // Сброс страницы при изменении сортировки
    };

    setSelectedFilters(updatedFilters); // Обновление состояния фильтров
    updateURLWithFilters(updatedFilters); // Обновление URL с новой сортировкой
    // Установка нового значения defSelectFilter
    setDefSelectFilter((prev) => ({
      ...prev,
      sortName: option.sortName,
      sortTitle: option.sortTitle,
    }));
    window.scrollTo({ top: 300, behavior: "smooth" });
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const handleShowMor = () => {
    const newStart = start + 20;
    setStart(newStart);
    if (start < 81) {
      fetchByScroll(newStart);
    }
  };

  useEffect(() => {
    const handleObserver = (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (
        target.isIntersecting &&
        items.length % 20 === 0 &&
        items.length <= 80 &&
        !isLoadingScroll
      ) {
        handleShowMor(); // Only fetch if not already loading and items are multiples of 20
      }
    };

    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "300px",
      threshold: 0,
    });

    if (loaderRef.current && observerRef.current) {
      // Ensure both loaderRef and observerRef are defined
      observerRef.current.observe(loaderRef.current);
    }

    return () => {
      if (observerRef.current && loaderRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observerRef.current.unobserve(loaderRef.current);
      }
    };
  }, [handleShowMor, isLoadingScroll, items.length]);

  return (
    <section>
      <CatalogCrumbs breadCrumbs={breadCrumbs} />
      {banner.baner.length > 0 && (
        <CatalogBanner isMobile={isMobile} banner={banner} />
      )}
      <div className="container">
        <h1 className={styles.category__title}>{catalog.category.name}</h1>
      </div>

      {mobileFilter ? (
        <>
          <AllFiltersMobile
            categoryid={selectedFilters.id}
            setSelected={(filters) =>
              setSelectedFilters((prev) => ({ ...prev, ...filters }))
            }
            filter={filtered}
            isColumnView={isColumnView}
            filters={filter}
            toggleView={toggleView}
            selectedSort={defSelectFilter}
            setSelectedSort={setDefSelectFilter}
            handleSortChange={handleSortChange}
          />
        </>
      ) : (
        <div className={cn("container", styles.filterSticky)}>
          <div className="sort__buttons">
            <CatalogFiltres
              handleSortChange={handleSortChange}
              clearAllCrumbs={clearAllCrumbs}
              resetCategoryFilters={resetCategoryFilters}
              tempPrice={tempPrice}
              clearFilterPrice={clearFilterPrice}
              clearFilter={clearFilter}
              applyFilterPrice={applyFilterPrice}
              handlePriceRangeChange={handlePriceRangeChange}
              handleFilterChange={handleFilterChange}
              selectedFilters={selectedFilters}
              intialAdditional={initialAdditionalFilter}
              filter={clientFilter}
              catalog={catalog}
              selectedSort={defSelectFilter}
              setSelectedSort={setDefSelectFilter}
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
          {selectedFilters && (
            <FiltersCrumbs
              filter={filter}
              selectedFilters={selectedFilters}
              clearFilterCrumbs={clearFilterCrumbs}
              clearAllCrumbs={clearAllCrumbs}
            />
          )}
        </div>
      )}
      {isLoading && isColumnView ? (
        <div className="cardsGridFive toptwenty">
          {Array.from({ length: count > 0 ? count : 18 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : isLoading ? (
        <div className="cards toptwenty">
          {Array.from({ length: 20 }).map((_, index) => (
            <CardSkeleton key={index} />
          ))}
        </div>
      ) : items.length !== 0 ? (
        <>
          <CatalogProductList
            items={items}
            isColumnView={isColumnView}
            isMobile={isSMobile}
          />
          <div ref={loaderRef}>
            {isLoadingScroll && (
              <div className="cards">
                {Array.from({ length: 20 }).map((_, index) => (
                  <CardSkeleton key={index} />
                ))}
              </div>
            )}
          </div>
          <div className={styles.showMore}>
            {selectedFilters.page !== pageCount ? (
              <button
                className="default__buttons_showMore"
                onClick={handleShowMore}
              >
                Показать еще
              </button>
            ) : null}
          </div>
          {pageCount > 1 && (
            <CatalogPagination
              forcePage={selectedFilters.page - 1}
              pageCount={pageCount}
              pageChange={handlePageChange}
              isMobile={isSMobile}
            />
          )}
        </>
      ) : (
        <CatalogUndefined />
      )}

      <CatalogDesc
        title={catalog.category.title}
        desc={catalog.category.description}
        keywords={catalog.category.keywords}
      />
    </section>
  );
}
