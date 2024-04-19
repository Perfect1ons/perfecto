import { ICategory } from "@/types/PopularCategory";
import { IBanner } from "@/types/bannerRequest";
import { ICatalogHome } from "@/types/catalogsHome";
import { subCatalog } from "@/types/subCatalog";
import ky from "ky";

const maxkg = ky.create({
  prefixUrl: process.env.PUBLIC_NEXT_API_KEY,
  cache: "no-cache",
});
const maxkgz = ky.create({
  prefixUrl: "https://max.kg/api",
  cache: "no-cache",
});

// export const getBannerData = (): Promise<IBanner> => {
//   return maxkg.get("baner?pageSize=20&page=1").json();
// };

export const getPopularCategory = (): Promise<ICategory> => {
  return maxkg.get("catalog/season").json();
};
export const getCatalogs = (): Promise<ICatalogHome[]> => {
  return maxkg.get("catalog/cathome").json();
};
export const getSubCatalogs = (path: number): Promise<ICatalogHome> => {
  return maxkgz.get(`catalog/${path}`).json();
};
