import { IBanner } from "@/types/bannerRequest";
import { ICatalogFirst } from "@/types/catalogFirst";
import { ICatalogSecond } from "@/types/catalogSecond";
import ky from "ky";

const maxkg = ky.create({
  prefixUrl: "https://max.kg/api/",
  cache: "no-cache",
});

export const getBannerData = (): Promise<IBanner> => {
  return maxkg.get("baner?pageSize=20&page=1").json();
};
export const getCatalog = (): Promise<ICatalogFirst[]> => {
  return maxkg.get("catalog/cathome").json();
};
export const getCatalogSecond = (id: number): Promise<ICatalogSecond> => {
  return maxkg.get(`catalog/${id}`).json();
};
