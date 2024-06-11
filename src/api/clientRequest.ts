import { IOcenka } from "@/components/Item/ProductReview/ProductReview";

import { IUser } from "@/components/UI/ReviewModal/ReviewModal";
import { ICatalogMenu } from "@/types/Catalog/catalogMenu";
import { ICatalogsProducts } from "@/types/Catalog/catalogProducts";
import { IBoughts } from "@/types/lastBoughts";
import { IPopularGood } from "@/types/popularGoods";
import ky from "ky";
import qs from "qs";

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

const obj = {
  page: 1,
  "VNaltovaroksearch[dost]": 1,
};
// page=1&VNaltovaroksearch[dost]=1

export const getProductsByBrand = (
  id: number,
  brands: string
): Promise<ICatalogsProducts> => {
  const params = qs.stringify({
    page: 1,
    "VNaltovaroksearch[brand]": brands,
  });
  return maxkg.get(`catalog/cat-product/${id}?${params}`).json();
};

export const getProductsByDost = (
  id: number,
  day: string
): Promise<ICatalogsProducts> => {
  const params = qs.stringify(
    {
      page: 1,
      "VNaltovaroksearch[dost]": day,
    },
    { addQueryPrefix: true }
  );

  return maxkg.get(`catalog/cat-product/${id}?${params}`).json();
};

export const getProductsByCenaMinMax = (
  id: number,
  min: number | null,
  max: number | null
): Promise<ICatalogsProducts> => {
  const params = qs.stringify({
    page: 1,
    "VNaltovaroksearch[cena_min]": min,
    "VNaltovaroksearch[cena_max]": max,
  });
  return maxkg.get(`catalog/cat-product/${id}?${params}`).json();
};

const filterProduct = qs.stringify({});

export const getProductFilter = (id: number): Promise<ICatalogsProducts> => {
  return maxkg.get(`catalog/cat-product/${id}?${filterProduct}`).json();
};
// export const getProductsSortsDost = (
//   id: number,
//   path: string
// ): Promise<ICatalogsProducts> => {
//   return maxkg
//     .get(`catalog/cat-product/${id}?page=1&VNaltovaroksearch[dost]=${path}`)
//     .json();
// };

export const postOtz = (otz: IUser) => {
  return maxkg.post("otz/create", { json: otz });
};

export const postRating = (ocenka: IOcenka) => {
  return maxkg.post("otz/set-ocenka", { json: ocenka });
};
