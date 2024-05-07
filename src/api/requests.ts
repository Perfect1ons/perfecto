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
import { IFooter } from "@/types/footerRequest";
import { INewsByPath } from "@/types/News/NewsById";
import { IPromoById } from "@/types/Promo/PromoById";
import { ITruncate } from "@/types/truncatedText";
import { IDiscountsById } from "@/types/Discounts/discountById";
import { ISeek } from "@/types/Search/seek";
import { IFooterPage } from "@/types/footerPagesRequest/footerPages";
import { IIntroBanner, IIntroBannerDekstop } from "@/types/Home/banner";

const maxkg = ky.create({
  prefixUrl: process.env.PUBLIC_NEXT_API,
  cache: "no-cache",
});
const maxkgz = ky.create({
  prefixUrl: process.env.PUBLIC_NEXT_API,
  // cache: "no-cache",
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
export const getSubCatalogs = (path: string): Promise<ICatalogMenu> => {
  return maxkg.get(`catalog/${path}`).json();
};
export const getCatalogsProducts = (
  path: string
): Promise<ICatalogsProducts> => {
  return maxkg.get(`catalog/${path}`).json();
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
  return maxkg.get("news?pageSize=18").json();
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
  return maxkg.get(`site/lastz?page=${page}`).json();
};

export const getDiscounts = (): Promise<IDiscounts[]> => {
  return maxkg.get("discount").json();
};

export const getPopularGoods = (page: number): Promise<IPopularGood> => {
  return maxkg.get(`site/popular?page=${page}`).json();
};
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

export const getFooter = (): Promise<IFooter> => {
  return maxkg.get("site/footer-menu").json();
};

//footer pages request
export const getFooterPages = (url: string): Promise<IFooterPage> => {
  return maxkg.get(`site/get-page/${url}`).json();
};

export const getNewsByIdOne = (id: number): Promise<INewsByPath> => {
  return maxkg.get(`news/${id}?pageSize=20&page=1`).json();
};

export const getNewsByIdTwo = (id: number): Promise<INewsByPath> => {
  return maxkg.get(`news/${id}?pageSize=20&page=2`).json();
};

export const getNewsByIdThree = (id: number): Promise<INewsByPath> => {
  return maxkg.get(`news/${id}?pageSize=20&page=3`).json();
};

export const getPromoByIdOne = (id: number): Promise<IPromoById> => {
  return maxkg.get(`ak/${id}?pageSize=20&page=1`).json();
};

export const getPromoByIdTwo = (id: number): Promise<IPromoById> => {
  return maxkg.get(`ak/${id}?pageSize=20&page=2`).json();
};

export const getPromoByIdThree = (id: number): Promise<IPromoById> => {
  return maxkg.get(`ak/${id}?pageSize=20&page=3`).json();
};

export const getDiscountsById = (id: number): Promise<IDiscountsById> => {
  return maxkg.get(`discount/${id}`).json();
};

export const getSearchItem = (path: string): Promise<ISeek> => {
  return maxkg.get(`naltovarok/seek?${path}&cat=-1&page=1`).json();
};

export const getSearchItemTwo = (path: string): Promise<ISeek> => {
  return maxkg.get(`naltovarok/seek?${path}&cat=-1&page=2`).json();
};

export const getSearchItemThree = (path: string): Promise<ISeek> => {
  return maxkg.get(`naltovarok/seek?${path}&cat=-1&page=3`).json();
};

export const getMobileData = (): Promise<IIntroBanner> => {
  return maxkg.get("baner/position?id=1").json();
}
export const getDekstopData = (): Promise<IIntroBannerDekstop> => {
  return maxkg.get("baner/get-position?id=1").json();
};

export const getSecondBanner = (): Promise<IIntroBannerDekstop> => {
  return maxkg.get("baner/get-position?id=3").json();
}

export const getThirdBanner = (): Promise<IIntroBannerDekstop> => {
  return maxkg.get("baner/get-position?id=5").json();
};
