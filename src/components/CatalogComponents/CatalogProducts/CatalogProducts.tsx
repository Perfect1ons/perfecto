"use client";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { BackArrow } from "../../../../public/Icons/Icons";
import styles from "./style.module.scss";
import CatalogProductList from "./CatalogProductList";
import useMediaQuery from "@/hooks/useMediaQuery";
import CatalogFiltres, {
  ISelectedFilterProps,
} from "../CatalogFiltres/CatalogFiltres";
import AllFiltersMobile from "../AllFiltersMobile/AllFiltersMobile";
import { IIntroBannerDekstop } from "@/types/Home/banner";
import { url } from "@/components/temporary/data";
import { ICatalogsProducts, Tov } from "@/types/Catalog/catalogProducts";
import { IFiltersBrand, Filter2 } from "@/types/filtersBrand";
import { BreadCrumbs } from "@/types/BreadCrums/breadCrums";
import { getCatalogProductsFiltered } from "@/api/clientRequest";
import clsx from "clsx";

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
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [items, setItems] = useState<ICatalogsProducts["category"]["tov"]>(
    catalog.category.tov || []
  );
  const [selectedFilters, setSelectedFilters] = useState<ISelectedFilterProps>({
    id: catalog.category.id,
    page: 1,
    brand: [],
    priceMin: 0,
    priceMax: 0,
    dost: [],
    additional_filter: [],
  });
  const [tempPrice, setTempPrice] = useState<{
    tempMin: number;
    tempMax: number;
  }>({ tempMin: 0, tempMax: 0 });
  const [sortOrder, setSortOrder] = useState<
    "default" | "cheap" | "expensive" | "rating" | null
  >(null);
  const [isColumnView, setIsColumnView] = useState(false);
  const mobileFilter = useMediaQuery("(max-width: 992px)");
  const observerRef = useRef<IntersectionObserver | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleObserver, {
      root: null,
      rootMargin: "500px",
      threshold: 0.1,
    });

    if (
      observerRef.current &&
      catalog.category.tov &&
      catalog.category.tov.length > 0 &&
      sentinelRef.current
    ) {
      observerRef.current.observe(sentinelRef.current);
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
    };
  }, [catalog.category.tov]);

  useEffect(() => {
    const fetchData = async () => {
      let maxPrice =
        selectedFilters.priceMax > 0 ? selectedFilters.priceMax : 9999999;
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
        if (selectedFilters.page === 1) {
          setItems(response.model);
        } else {
          setItems((prevItems) => [...prevItems, ...(response.model || [])]);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [catalog.category.id, selectedFilters]);

  const handleObserver: IntersectionObserverCallback = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && selectedFilters.page < 5) {
        setSelectedFilters((prevFilters) => ({
          ...prevFilters,
          page: prevFilters.page + 1,
        }));
      }
    });
  };

  const handleFilterChange = (name: string, value: any) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value,
    }));
  };

  const clearFilter = (name: string) => {
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      [name]: [],
    }));
  };

  const clearFilterByID = (filters: Filter2, selectedFilters: string[]) => {
    return Object.values(filters).filter(
      (filter) => !selectedFilters.includes(filter.id_filter.toString())
    );
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
  };

  const handlePriceRangeChange = (min: number, max: number) => {
    setTempPrice({ tempMin: min, tempMax: max });
  };

  const applyFilterPrice = () => {
    setSelectedFilters({
      ...selectedFilters,
      priceMin: tempPrice.tempMin,
      priceMax: tempPrice.tempMax,
    });
  };

  const clearFilterPrice = () => {
    setTempPrice({ tempMin: 0, tempMax: 0 });
    setSelectedFilters((prevFilters) => ({
      ...prevFilters,
      priceMin: 0,
      priceMax: 0,
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
        {breadCrumbs.map((crumbs) => (
          <Link
            className="all__directions_link"
            href={`/catalog/${crumbs.full_slug}`}
            key={crumbs.id}
          >
            {crumbs.name}
          </Link>
        ))}
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
          toggleView={handleViewChange}
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
            <div className={clsx("default__sort_style", "sortBoxShadow")}>
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
      <div ref={sentinelRef} style={{ height: "1px", margin: "0 auto" }}></div>
    </section>
  );
}
