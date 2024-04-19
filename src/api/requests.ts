import { IBanner } from "@/types/bannerRequest";
import { ICatalogFirst } from "@/types/catalogFirst";
import { ICatalogSecond } from "@/types/catalogSecond";
import { ICategory } from "@/types/PopularCategory";

import ky from "ky";

// import { IBanner } from "@/types/bannerRequest";
// import ky from "ky";

// const maxkg = ky.create({ prefixUrl: process.env.MAXKG, cache: "no-cache"});

//   export const getBannerData = (): Promise<IBanner> => {
//     return maxkg.get("baner?pageSize=20&page=1").json();
//   };

const maxkg = ky.create({
  prefixUrl: process.env.MAXKG,
  cache: "no-cache",
});

// for home page
export const getBannerData = (): Promise<IBanner> => {
  return maxkg.get("baner?pageSize=20&page=1").json();
};

export const getPopularCategory = (): Promise<ICategory> => {
  return maxkg.get("catalog/season").json();
};

// For catalog
export const getCatalog = (): Promise<ICatalogFirst[]> => {
  return maxkg.get("catalog/cathome").json();
};

export const getCatalogSecond = (id: number): Promise<ICatalogSecond> => {
  return maxkg.get(`catalog/${id}`).json();
};
