import { ICategory } from "@/types/PopularCategory";
import { IBanner } from "@/types/bannerRequest";
<<<<<<< HEAD
import { INews } from "@/types/news";
import { IPromotion, IPromotionResponse } from "@/types/promotion";
=======
import { IBrands } from "@/types/brands";
>>>>>>> 99751e6560d30e9ec21a03914dbf8ab4ac8d5a09
import { ISeasonCategory } from "@/types/seasonCategory";
import ky from "ky";

const maxkg = ky.create({ prefixUrl: process.env.MAXKG, cache: "no-cache" });

export const getBannerData = (): Promise<IBanner> => {
  return maxkg.get("baner?pageSize=20&page=1").json();
};

export const getPopularCategory = (): Promise<ICategory> => {
  return maxkg.get("catalog/season").json();
};

<<<<<<< HEAD
export const getPromotion = (): Promise<IPromotion[]> => {
  return maxkg.get(`ak`).json();
};

export const getNews = (): Promise<INews[]> => {
  return maxkg.get('news').json();
=======
export const getSeasonCategory = (): Promise<ISeasonCategory> => {
  return maxkg.get("catalog/season-cat").json();
};
export const getBrands = (): Promise<IBrands> =>{
return maxkg.get("brand?pageSize=36").json()
>>>>>>> 99751e6560d30e9ec21a03914dbf8ab4ac8d5a09
}