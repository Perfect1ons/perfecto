import ky from "ky";
import { ICategory } from "@/types/PopularCategory";
import { IBanner } from "@/types/bannerRequest";
import { INews } from "@/types/news";
import { IPromotion } from "@/types/promotion";
import { IBrands } from "@/types/brands";
import { IBoughts } from "@/types/lastBoughts";
import { ISeasonCategory } from "@/types/seasonCategory";
import { IDiscounts } from "@/types/discounts";
import { IFiltersBrand } from "@/types/filtersBrand";
import { IPopularGood } from "@/types/popularGoods";
import { ICatalogMenu } from "@/types/Catalog/catalogMenu";
import { ICatalogsProducts } from "@/types/Catalog/catalogProducts";
import { IFooter } from "@/types/footerRequest";
import { INewsByPath } from "@/types/News/NewsById";
import { IPromoById } from "@/types/Promo/PromoById";
import { IDiscountsById } from "@/types/Discounts/discountById";
import { ISeek } from "@/types/Search/seek";
import { IFooterPage } from "@/types/footerPagesRequest/footerPages";
import { IIntroBanner, IIntroBannerDekstop } from "@/types/Home/banner";
import { ICardProductItems } from "@/types/CardProduct/cardProduct";
import { ISimilarProduct } from "@/types/SimilarProduct/similarProduct";
import { IBrandByName } from "@/types/Brands/brandByName";
import { IMetaData } from "@/types/MetaData/MetaData";
import { IBreadCrumbs } from "@/types/BreadCrums/breadCrums";
import { BrandsAll } from "@/types/bannerAll";
import { IFiltersBrandByAbdulaziz } from "@/components/temporary/data";
import { IScrolledCatalog } from "@/types/catalogProduct/catalogProduct";
import { UserPersonalDataType } from "@/types/Profile/PersonalData";
import { Notifications } from "@/types/Profile/Notifications/notifications";
import { IOrderHistory } from "@/types/OrdersHistory/OrdersHistory";
import { CurrentOrdersType } from "@/types/Profile/CurrentOrders";
import { StatusDetailsType } from "@/types/Profile/statusDetails";
import { IOrderById } from "@/types/OrderById/orderbyid";
import { PaymentMethod } from "@/types/Basket/PaymentMethod";
import { DeliveryMethod } from "@/types/Basket/DeliveryMethod";
import { SelectCityType } from "@/types/Basket/SelectCity";
import { IRatingOrderHistoryCard } from "@/types/OrdersHistory/RatingOrderHistoryCard";

const maxkg = ky.create({
  prefixUrl: process.env.PUBLIC_NEXT_API,
  next: { revalidate: 5 },
});

const maxkgcatalog = ky.create({
  prefixUrl: process.env.PUBLIC_NEXT_API,
  next: { revalidate: 3600 },
});

export const getPopularGoods = (page: number): Promise<IPopularGood[]> => {
  return maxkg.get(`site/popular?page=${page}`).json();
};

export const getBrandsByName = (id: number): Promise<IBrandByName> => {
  return maxkg.get(`brand/${id}`).json();
};

// запрос на главный каталог
export const getCatalogsMenu = (): Promise<ICatalogMenu> => {
  return maxkgcatalog.get("catalog/cat-list-menu").json();
};

// подкаталоги от getCatalogs
export const getSubCatalogs = (path: string): Promise<ICatalogMenu> => {
  return maxkg.get(`catalog/${path}`).json();
};
export const getCatalogsProducts = (
  path: string
): Promise<ICatalogsProducts> => {
  return maxkg.get(`catalog/cat-product/${path}`).json();
};
export const getBannerAll = (id: number): Promise<BrandsAll> => {
  return maxkg.get(`baner/get-position?id=${id}`).json();
};

// на популярные категории
export const getPopularCategory = (): Promise<ICategory> => {
  return maxkg.get("catalog/season").json();
};

export const getFiltersBrand = (id: number): Promise<IFiltersBrand> => {
  return maxkg.get(`catalog/listfilter?id_cat=${id}`).json();
};

export const getFiltersBrandByAbdulaziz = (
  id: number
): Promise<IFiltersBrandByAbdulaziz> => {
  return maxkg.get(`catalog/listfilter?id_cat=${id}`).json();
};
export const getProductsSortsBrand = (
  id: number,
  path: string
): Promise<IFiltersBrand> => {
  return maxkg
    .get(`catalog/${id}?page=1&VNaltovaroksearch[brand]=${path}`)
    .json();
};
//max.kg/api/catalog/28631?page=1&VNaltovaroksearch[brand]=Asus
export const getBannerData = (): Promise<IBanner> => {
  return maxkg.get("baner?pageSize=20&page=1").json();
};

export const getPromotion = (): Promise<IPromotion[]> => {
  return maxkg.get(`ak`).json();
};
export const getPromotionPagination = (id: number): Promise<IPromotion[]> => {
  return maxkg.get(`ak?pageSize=10&page=${id}`).json();
};

export const getNewsByLimit = (): Promise<INews[]> => {
  return maxkg.get("news?pageSize=18").json();
};

export const getNews = (): Promise<INews[]> => {
  return maxkg.get("news?pageSize=40").json();
};

export const getNewsPagination = (id: number): Promise<INews[]> => {
  return maxkg.get(`news?pageSize=10&page=${id}`).json();
};

export const getSeasonCategory = (): Promise<ISeasonCategory> => {
  return maxkg.get("catalog/season-cat").json();
};

export const getBrands = (): Promise<IBrands> => {
  return maxkg.get("brand?pageSize=36").json();
};

export const getBrandsData = (): Promise<IBrands> => {
  return maxkg.get("brand?pageSize=all").json();
};

export const getBrandsPaginations = (id: number): Promise<IBrands> => {
  return maxkg.get(`brand?pageSize=36&page=${id}`).json();
};

export const getBoughts = (page: number): Promise<IBoughts> => {
  return maxkg.get(`site/lastz?page=${page}`).json();
};

export const getDiscounts = (id: number): Promise<IDiscounts[]> => {
  return maxkg.get(`discount?pageSize=20&page=${id}`).json();
};

export const getFooter = (): Promise<IFooter> => {
  return maxkg.get("site/footer-menu").json();
};

//footer pages requests
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

export const getSearchItem = (slug: string, id: number): Promise<ISeek> => {
  return maxkg.get(`naltovarok/seek?search=${slug}&page=${id}`).json();
};

export const getMobileData = (): Promise<IIntroBanner> => {
  return maxkg.get("baner/position?id=1").json();
};
export const getDekstopData = (): Promise<IIntroBannerDekstop> => {
  return maxkg.get("baner/get-position?id=1").json();
};

export const getCatalogBanner = (): Promise<IIntroBannerDekstop> => {
  return maxkg.get("baner/get-position?id=11").json();
};

export const getSecondBanner = (): Promise<IIntroBannerDekstop> => {
  return maxkg.get("baner/get-position?id=3").json();
};

export const getThirdBanner = (): Promise<IIntroBannerDekstop> => {
  return maxkg.get("baner/get-position?id=5").json();
};

export const getCardProduct = (art: string): Promise<ICardProductItems> => {
  return maxkg.get(`naltovarok/itemnal?art=${art}`).json();
};
export const getSimilarProduct = (art: string): Promise<ISimilarProduct> => {
  return maxkg.get(`naltovarok/similar?id_tov=${art}`).json();
};

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//! GET запросы для получения Meta тего на страницах
export const getMetaMainPage = (): Promise<IMetaData> => {
  return maxkg.get("site/meta?type=main").json();
};

export const getMetaKorzinaPage = (): Promise<IMetaData> => {
  return maxkg.get("site/meta?type=korzina").json();
};

export const getMetaSkidPage = (): Promise<IMetaData> => {
  return maxkg.get("site/meta?type=main_skid").json();
};

export const getMetaNewsPage = (): Promise<IMetaData> => {
  return maxkg.get("site/meta?type=main_news").json();
};
export const getMetaPromoPage = (): Promise<IMetaData> => {
  return maxkg.get("site/meta?type=cat_promo").json();
};

export const getMetaPopularPage = (): Promise<IMetaData> => {
  return maxkg.get("site/meta?type=popular").json();
};
export const getMetaBrandPage = (): Promise<IMetaData> => {
  return maxkg.get("site/meta?type=main_brand").json();
};

export const getBreadCrumbs = (id: number): Promise<IBreadCrumbs> => {
  return maxkg.get(`site/breadcrumbs?id=${id}`).json();
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

export const getCatalogProductsFiltersServer = (
  path: string,
  page: number
): Promise<IScrolledCatalog> => {
  return maxkg.get(`catalog/cat-product/${path}?page=${page}`).json();
};

export const getPersonalDataProfileServer = (
  token: string
): Promise<UserPersonalDataType> => {
  return maxkg
    .get("prof", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .json();
};

export const getNotification = (id: number): Promise<Notifications> => {
  return maxkg.get(`site/notification?idUser=${id}`).json();
};

export const getOrdersHistory = (token: string): Promise<IOrderHistory> => {
  return maxkg
    .get("zakaz/history", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .json();
};
export const getCurrentOrders = (token: string): Promise<CurrentOrdersType> => {
  return maxkg
    .get("zakaz", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .json();
};
export const getStatusDetails = (token: string): Promise<StatusDetailsType> => {
  return maxkg
    .get("zakaz/statusdetal", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .json();
};

export const getPaymentMethod = (
  idUser: string | undefined
): Promise<PaymentMethod> => {
  return maxkg.get(`naltovarok/vopl?idUser=${idUser}`).json();
};

export const getCurrentOrder = (
  token: string,
  id: number
): Promise<IOrderById> => {
  return maxkg
    .get(`box/zakazok?id_zakaz=${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .json();
};

export const getDeliveryMethod = (
  idUser: string | undefined
): Promise<DeliveryMethod> => {
  return maxkg.get(`naltovarok/viddost?idUser=${idUser}`).json();
};
export const getSelectCity = (): Promise<SelectCityType> => {
  return maxkg.get(`naltovarok/city`).json();
};

export const getOrderHistoryOrderRating = (
  token: string | undefined,
  id_zakaz: number
): Promise<IRatingOrderHistoryCard> => {
  return maxkg
    .get(`otz/zakaz-ocenka?id_zakaz=${id_zakaz}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .json();
};
