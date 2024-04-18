import { IBoughtToday } from './../types/boughtToDayRequest';
import { IBanner } from "@/types/bannerRequest";
<<<<<<< HEAD
import { ICatalogFirst } from "@/types/catalogFirst";
import { ICatalogSecond } from "@/types/catalogSecond";
=======
import { IPopularCategory } from "@/types/popularCategoriesRequest";
>>>>>>> 10ab96e1a6d12fd5723bebc77512cdea5965277e
import ky from "ky";

const maxkg = ky.create({
  prefixUrl: "https://max.kg/api/",
  cache: "no-cache",
});

<<<<<<< HEAD
export const getBannerData = (): Promise<IBanner> => {
  return maxkg.get("baner?pageSize=20&page=1").json();
};
export const getCatalog = (): Promise<ICatalogFirst[]> => {
  return maxkg.get("catalog/cathome").json();
};
export const getCatalogSecond = (id: number): Promise<ICatalogSecond> => {
  return maxkg.get(`catalog/${id}`).json();
};
=======
  export const getBannerData = (): Promise<IBanner> => {
    return maxkg.get("baner?pageSize=20&page=1").json();
  };

export const getPopularCategories = (): Promise<IPopularCategory> =>{
    return maxkg.get("catalog/season").json();
}

export const getTodayBought = (): Promise<IBoughtToday> =>{
  return maxkg.get("site/lastz?page=1").json();
}
>>>>>>> 10ab96e1a6d12fd5723bebc77512cdea5965277e
