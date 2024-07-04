"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import styles from "./style.module.scss";
import { BackArrow } from "../../../../public/Icons/Icons";
import {
  getCatalogProductsFiltered,
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
import {
  ICategoryFilter,
  ICategoryModel,
} from "@/types/Catalog/catalogFilters";
import { ICatalogsProducts, Tov } from "@/types/Catalog/catalogProducts";
import { IFiltersBrand, Filter2 } from "@/types/filtersBrand";
import { BreadCrumbs } from "@/types/BreadCrums/breadCrums";
import { IIntroBannerDekstop } from "@/types/Home/banner";
import { IFiltersBrandByAbdulaziz, url } from "@/components/temporary/data";
import CardSkeleton from "@/components/UI/Card/CardSkeleton";
import FiltersCrumbs from "./FiltersCrumbs/FiltersCrumbs";
import CatalogPagination from "./CatalogPagination/CatalogPagination";
import CatalogUndefined from "./CatalogUndefined/CatalogUndefined";
import CatalogDesc from "./CatalogDesc/CatalogDesc";

interface ICatalogProductsProps {
  init: ICategoryFilter;
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

interface FilterRules {
  [key: string]: { [key: string]: string[] };
}

export default function CatalogProducts({
  init,
  banner,
  catalog,
  filter,
  breadCrumbs,
  filtered,
}: ICatalogProductsProps) {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isSMobile = useMediaQuery("(max-width: 480px)");
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
  const [defSelectFilter, setDefSelectFilter] = useState({
    // sortName: "id",
    sortName: searchParams.get("sort") || "id",
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
  const [start, setStart] = useState<number>(1);
  const [limit, setLimit] = useState<number>(20);
  const [isLoading, setIsLoading] = useState(true); // State for loading indicator
  const mobileFilter = useMediaQuery("(max-width: 992px)");
  const [clientFilter, setClientFilter] = useState(filter);
  const toggleView = (view: boolean) => {
    setIsColumnView(view);
    handleViewChange(view);
  };

  const handleShowMore = () => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      page: prevFilters.page + 1,
    }));
    updateURLWithFilters({
      ...selectedFilters,
      page: selectedFilters.page + 1,
    });
    window.scrollTo({ top: 300, behavior: "auto" });
  };

  const handleFilterChange = (name: string, value: any) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
      page: 1, // Reset page when filters change
    }));
    updateURLWithFilters({ ...selectedFilters, [name]: value, page: 1 });
  };

  const clearAllCrumbs = () => {
    setSelectedFilters({
      id: selectedFilters.id, // Preserve catalog.category.id
      page: 1,
      brand: [],
      priceMin: 0,
      priceMax: 0,
      dost: [],
      additional_filter: [],
      sortName: "id",
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
      sortName: "id",
    });
  };
  const clearFilter = (name: string) => {
    setSelectedFilters((prevFilters) => {
      const updatedFilters: any = { ...prevFilters };
      if (updatedFilters.hasOwnProperty(name)) {
        updatedFilters[name] = [];
      }

      const updatedState = {
        ...updatedFilters,
        page: 1, // Сбрасываем страницу при изменении фильтров
      };

      updateURLWithFilters(updatedState);
      return updatedState;
    });
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
          100,
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
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false); // Set loading to false when data fetching is complete
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [catalog.category.id, selectedFilters, defSelectFilter.sortName]);

  const handleViewChange = (isColumn: boolean) => {
    setIsColumnView(isColumn);
    // Scroll to the top of the page when changing view
    window.scrollTo({ top: 300, behavior: "auto" });
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
      page: 1, // Reset page when price filter changes
    });
    updateURLWithFilters({
      ...selectedFilters,
      priceMin: tempPrice.tempMin,
      priceMax: tempPrice.tempMax,
      page: 1,
    });
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
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    const newPage = selected + 1;
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      page: newPage,
    }));
    updateURLWithFilters({ ...selectedFilters, page: newPage });
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
    // if (filters.sortName !== defSelectFilter.sortName) {
    //   queryParams.set("sort", filters.sortName);
    // }
    if (filters.sortName) {
      queryParams.set("sort", filters.sortName);
    }
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
  };

  // Function to update URL parameters
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
    if (filters.sortName !== defSelectFilter.sortName) {
      params.set("sort", filters.sortName);
    }

    const newUrl = `${window.location.pathname}?${params.toString()}`;
    window.history.replaceState({ path: newUrl }, "", newUrl);

    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      page: 1,
    }));
  };
  const handleSortChange = (option: {
    sortName: string;
    sortTitle: string;
  }) => {
    setDefSelectFilter(option);
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      sortName: option.sortName,
      page: 1,
    }));
    updateURLWithFilters({
      ...selectedFilters,
      sortName: option.sortName,
      page: 1,
    });
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
        <Link href={"/page/partneram/prodavcam"}>
          <Image
            src={
              isMobile
                ? `${url}bimages/baner/mobile/baner_${banner.baner[0].id}.jpg`
                : `${url}bimages/baner/baner_${banner.baner[0].id}.jpg`
            }
            width={1440}
            height={300}
            priority={true}
            alt={banner.baner[0].naim}
            className={styles.category__image}
          />
        </Link>
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
      ) : items && items.length !== 0 ? (
        <>
          <CatalogProductList
            items={items}
            isColumnView={isColumnView}
            isMobile={isSMobile}
          />
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
