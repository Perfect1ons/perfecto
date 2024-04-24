import { ICategory } from "@/types/PopularCategory";
import { ICatalogHome } from "@/types/catalogsHome";
import { subCatalog } from "@/types/subCatalog";
import { IBanner } from "@/types/bannerRequest";
import { INews } from "@/types/news";
import { IPromotion } from "@/types/promotion";
import { IBrands } from "@/types/brands";
import { IBoughts } from "@/types/lastBoughts";
import { ISeasonCategory } from "@/types/seasonCategory";
import ky from "ky";
import { IDiscounts } from "@/types/discounts";
import { IFiltersBrand } from "@/types/filtersBrand";

const maxkg = ky.create({
  prefixUrl: process.env.PUBLIC_NEXT_API,
  cache: "no-cache",
});
const maxkgz = ky.create({
  prefixUrl: "https://max.kg/api",
  cache: "no-cache",
});

// export const getBannerData = (): Promise<IBanner> => {
//   return maxkg.get("baner?pageSize=20&page=1").json();
// };

export const getPopularCategory = (): Promise<ICategory> => {
  return maxkg.get("catalog/season").json();
};
export const getCatalogs = (): Promise<ICatalogHome[]> => {
  return maxkg.get("catalog/cathome").json();
};
export const getSubCatalogs = (path: number): Promise<subCatalog> => {
  return maxkgz.get(`catalog/${path}?enable=1`).json();
};
export const getFiltersBrand = (id: number): Promise<IFiltersBrand> => {
  return maxkgz.get(`catalog/listfilter?id_cat=${id}?enable=1`).json();
};

export const getBannerData = (): Promise<IBanner> => {
  return maxkg.get("baner?pageSize=20&page=1").json();
};

export const getPromotion = (): Promise<IPromotion[]> => {
  return maxkg.get(`ak`).json();
};

export const getNews = (): Promise<INews[]> => {
  return maxkg.get("news").json();
};
export const getSeasonCategory = (): Promise<ISeasonCategory> => {
  return maxkg.get("catalog/season-cat").json();
};
export const getBrands = (): Promise<IBrands> => {
  return maxkg.get("brand?pageSize=36").json();
};
export const getBoughts = (): Promise<IBoughts> => {
  return maxkg.get("site/lastz?page=1").json();
};

export const getDiscounts = (): Promise<IDiscounts[]> => {
  return maxkg.get("discount").json();
};

const getFilterPrice = (
  id: number,
  cena_min: number,
  cena_max: number
): Promise<subCatalog> => {
  return maxkgz
    .get(
      `${id}?page=1&VNaltovaroksearch[${cena_min}]=0&VNaltovaroksearch[${cena_max}]=500`
    )
    .json();
};
