import { IBoughtToday } from './../types/boughtToDayRequest';
import { IBanner } from "@/types/bannerRequest";
import { IPopularCategory } from "@/types/popularCategoriesRequest";
import ky from "ky";

const maxkg = ky.create({
    prefixUrl: "https://max.kg/api/",
    cache: "no-cache",
  });

  export const getBannerData = (): Promise<IBanner> => {
    return maxkg.get("baner?pageSize=20&page=1").json();
  };

export const getPopularCategories = (): Promise<IPopularCategory> =>{
    return maxkg.get("catalog/season").json();
}

export const getTodayBought = (): Promise<IBoughtToday> =>{
  return maxkg.get("site/lastz?page=1").json();
}