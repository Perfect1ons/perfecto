import { ICategory } from "@/types/PopularCategory";
import { IBanner } from "@/types/bannerRequest";
import { IBrands } from "@/types/brands";
import { ISeasonCategory } from "@/types/seasonCategory";
import ky from "ky";

const maxkg = ky.create({ prefixUrl: process.env.MAXKG, cache: "no-cache" });

export const getBannerData = (): Promise<IBanner> => {
  return maxkg.get("baner?pageSize=20&page=1").json();
};

export const getPopularCategory = (): Promise<ICategory> => {
  return maxkg.get("catalog/season").json();
};

export const getSeasonCategory = (): Promise<ISeasonCategory> => {
  return maxkg.get("catalog/season-cat").json();
};
export const getBrands = (): Promise<IBrands> =>{
return maxkg.get("brand?pageSize=36").json()
}