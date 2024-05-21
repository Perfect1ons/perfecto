import { ICatalogMenu } from "@/types/Catalog/catalogMenu";
import { IBoughts } from "@/types/lastBoughts";
import { IPopularGood } from "@/types/popularGoods";
import ky from "ky";

const maxkg = ky.create({
  prefixUrl: "/api/",
});

export const getCatalogsMenu = (): Promise<ICatalogMenu> => {
  return maxkg.get("catalog/cat-list-menu?_format=json").json();
};


export const getPopularGoodsByClient = (page: number): Promise<IPopularGood[]> => {
  return maxkg.get(`site/popular?page=${page}`).json();
};

export const getBoughtsByClient = (page: number): Promise<IBoughts> => {
  return maxkg.get(`site/lastz?page=${page}`).json();
};