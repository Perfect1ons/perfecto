import { IUser } from "@/components/UI/ReviewModal/ReviewModal";
import { ICatalogMenu } from "@/types/Catalog/catalogMenu";
import { ICatalogsProducts } from "@/types/Catalog/catalogProducts";
import { IBoughts } from "@/types/lastBoughts";
import { IPopularGood } from "@/types/popularGoods";
import ky from "ky";

const maxkg = ky.create({
  prefixUrl: "/api/",
});

export const getCatalogsMenu = (): Promise<ICatalogMenu> => {
  return maxkg.get("catalog/cat-list-menu?_format=json").json();
};

export const getPopularGoodsByClient = (
  page: number
): Promise<IPopularGood[]> => {
  return maxkg.get(`site/popular?page=${page}`).json();
};

export const getBoughtsByClient = (page: number): Promise<IBoughts> => {
  return maxkg.get(`site/lastz?page=${page}`).json();
};

export const getProductsSortsBrand = (
  id: number,
  path: string
): Promise<ICatalogsProducts> => {
  return maxkg
    .get(`catalog/cat-product/${id}?page=1&VNaltovaroksearch[brand]=${path}`)
    .json();
};
export const getProductsSortsDost = (
  id: number,
  path: string
): Promise<ICatalogsProducts> => {
  return maxkg
    .get(`catalog/cat-product/${id}?page=1&VNaltovaroksearch[dost]=${path}`)
    .json();
};

export const postOtz = (otz: IUser) => {
  return maxkg.post("otz/create", { json: otz });
};
