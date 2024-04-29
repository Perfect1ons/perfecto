import { ICategory } from "@/types/PopularCategory";
import { IBanner } from "@/types/bannerRequest";
import { INews } from "@/types/news";
import { IPromotion } from "@/types/promotion";
import { IBrands } from "@/types/brands";
import { IBoughts } from "@/types/lastBoughts";
import { ISeasonCategory } from "@/types/seasonCategory";
import ky from "ky";
import { IDiscounts } from "@/types/discounts";
import { IFiltersBrand } from "@/types/filtersBrand";
import { IPopularGood } from "@/types/popularGoods";
import { ICatalogHome } from "@/types/Catalog/catalogsHome";
import { ICatalogsChild } from "@/types/Catalog/catalogsChild";
import { ICatalogMenu } from "@/types/Catalog/catalogMenu";
import { ICatalogsProducts } from "@/types/Catalog/catalogProducts";
import { INewsByPath } from "@/types/News/NewsById";

const maxkg = ky.create({
  prefixUrl: process.env.PUBLIC_NEXT_API,
});
const maxkgz = ky.create({
  prefixUrl: "https://max.kg/api/",
});

// export const getBannerData = (): Promise<IBanner> => {
//   return maxkg.get("baner?pageSize=20&page=1").json();
// };

// запрос на главный каталог
export const getCatalogs = (): Promise<ICatalogHome[]> => {
  return maxkgz.get("catalog/cathome").json();
};
export const getCatalogsMenu = (): Promise<ICatalogMenu> => {
  return maxkgz.get("catalog/cat-list-menu").json();
};

// подкаталоги от getCatalogs
export const getSubCatalogs = (path: number): Promise<ICatalogsChild> => {
  return maxkg.get(`catalog/catmenu?id=${path}`).json();
};
export const getCatalogsProducts = (id: number): Promise<ICatalogsProducts> => {
  return maxkg.get(`catalog/${id}?_format=json`).json();
};
// на популярные категории
export const getPopularCategory = (): Promise<ICategory> => {
  return maxkg.get("catalog/season").json();
};

export const getFiltersBrand = (id: number): Promise<IFiltersBrand> => {
  return maxkgz.get(`catalog/listfilter?id_cat=${id}?`).json();
};

export const getBannerData = (): Promise<IBanner> => {
  return maxkg.get("baner?pageSize=20&page=1").json();
};

export const getPromotion = (): Promise<IPromotion[]> => {
  return maxkg.get(`ak`).json();
};

export const getNewsByLimit = (): Promise<INews[]> => {
  return maxkg.get("news?pageSize=6").json();
};

export const getNews = (): Promise<INews[]> => {
  return maxkg.get("news?pageSize=40").json();
};
export const getSeasonCategory = (): Promise<ISeasonCategory> => {
  return maxkg.get("catalog/season-cat").json();
};

export const getBrands = (): Promise<IBrands> => {
  return maxkg.get("brand?pageSize=36").json();
};

export const getBoughts = (page: number): Promise<IBoughts> => {
  return maxkg.get(`site/lastz?${page}`).json();
};

export const getDiscounts = (): Promise<IDiscounts[]> => {
  return maxkg.get("discount").json();
};

export const getPopularGoods = (page: number): Promise<IPopularGood[]> => {
  return maxkg.get(`site/popular?page=${page}`).json();
}
export const getDiscountsPageOne = (): Promise<IDiscounts[]> => {
  return maxkg.get(`discount?pageSize=20&page=1`).json();
};

export const getDiscountsPageTwo = (): Promise<IDiscounts[]> => {
  return maxkg.get(`discount?pageSize=20&page=2`).json();
};

const getFilterPrice = (
  id: number,
  cena_min: number,
  cena_max: number
): Promise<ICatalogsChild> => {
  return maxkgz
    .get(
      `${id}?page=1&VNaltovaroksearch[${cena_min}]=0&VNaltovaroksearch[${cena_max}]=500`
    )
    .json();
};


export const getNewsById = (id: number): Promise<INewsByPath> => {
  return maxkg.get(`news/${id}`).json();
}