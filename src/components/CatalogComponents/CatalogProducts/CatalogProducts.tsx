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
import { IFiltersBrandByAbdulaziz, url } from "@/components/temporary/data";
import ReactPaginate from "react-paginate";
import CardSkeleton from "@/components/UI/Card/CardSkeleton";
import FiltersCrumbs from "./FiltersCrumbs/FiltersCrumbs";
import { useRouter } from "next/navigation";

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
};

export type FilterKey = keyof SelectedFilters;

export default function CatalogProducts({
  init,
  banner,
  catalog,
  filter,
  breadCrumbs,
  filtered,
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

  const [tempPrice, setTempPrice] = useState<{
    tempMin: number;
    tempMax: number;
  }>({
    tempMin: initialPriceMin,
    tempMax: initialPriceMax,
  });

  const router = useRouter();

  const [sortOrder, setSortOrder] = useState<
    "rating" | "cheap" | "expensive" | null
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

  const clearAllCrumbs = () => {
    setSelectedFilters({
      id: selectedFilters.id, // Preserve catalog.category.id
      page: 1,
      brand: [],
      priceMin: 0,
      priceMax: 0,
      dost: [],
      additional_filter: [],
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
    });
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
      (sortParam === "rating" ||
        sortParam === "cheap" ||
        sortParam === "expensive")
    ) {
      setSortOrder(sortParam as "rating" | "cheap" | "expensive");
    }
  }, []);

  const sortItems = (order: "rating" | "cheap" | "expensive") => {
    const sortedItems = [...items];
    switch (order) {
      case "rating":
        sortedItems.sort((a, b) => b.ocenka - a.ocenka);
        break;
      case "cheap":
        sortedItems.sort((a, b) => a.cenaok - b.cenaok);
        break;
      case "expensive":
        sortedItems.sort((a, b) => b.cenaok - a.cenaok);
        break;
      default:
        break;
    }
    setItems(sortedItems);
  };

  const handleSort = (order: "rating" | "cheap" | "expensive") => {
    setSortOrder(order);
    const queryParams = new URLSearchParams(window.location.search);
    queryParams.set("sort", order);
    window.history.pushState(
      {},
      "",
      `${window.location.pathname}?${queryParams.toString()}`
    );
  };
  useEffect(() => {
    // Убедитесь, что начальная сортировка не применяется автоматически
    if (sortOrder !== null) {
      sortItems(sortOrder);
    }
  }, [sortOrder]);

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
    const newUrl = `${window.location.pathname}?${params.toString()}`;
    router.push(newUrl, undefined);

    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      page: 1,
    }));
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
            setSelected={(filters) =>
              setSelectedFilters((prev) => ({ ...prev, ...filters }))
            }
            value={sortOrder || "rating"}
            options={[
              { label: "По рейтингу", value: "rating" },
              { label: "Сначала дешевле", value: "cheap" },
              { label: "Сначала дороже", value: "expensive" },
            ]}
            onChange={(value) => handleSort(value)}
            filter={filtered}
            isColumnView={isColumnView}
            toggleView={toggleView}
          />
          <FiltersCrumbs
            selectedFilters={selectedFilters}
            clearFilterCrumbs={clearFilterCrumbs}
            clearAllCrumbs={clearAllCrumbs}
          />
        </>
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
              intialAdditional={initialAdditionalFilter}
              onChange={(value) => handleSort(value)}
              filter={filter}
              catalog={catalog}
              value={sortOrder || "rating"}
              options={[
                { label: "По рейтингу", value: "rating" },
                { label: "Сначала дешевле", value: "cheap" },
                { label: "Сначала дороже", value: "expensive" },
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
          {selectedFilters && (
            <FiltersCrumbs
              selectedFilters={selectedFilters}
              clearFilterCrumbs={clearFilterCrumbs}
              clearAllCrumbs={clearAllCrumbs}
            />
          )}
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
          {pageCount > 1 && (
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
          )}
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
