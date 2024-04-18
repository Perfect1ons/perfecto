
import { ICategory } from "@/types/PopularCategory";
import { IBanner } from "@/types/bannerRequest";
import ky from "ky";

const maxkg = ky.create({ prefixUrl: process.env.MAXKG, cache: "no-cache"});

  export const getBannerData = (): Promise<IBanner> => {
    return maxkg.get("baner?pageSize=20&page=1").json();
  };

  export const getPopularCategory = (): Promise<ICategory> => {
    return maxkg.get("catalog/season").json();
  }




