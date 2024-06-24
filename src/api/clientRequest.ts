import { ISelectedFilterProps } from "@/components/CatalogComponents/CatalogFiltres/CatalogFiltres";
import { IOcenka } from "@/components/Item/ProductReview/ProductReview";
import { IUser } from "@/components/UI/ReviewModal/ReviewModal";
import { ICatalogMenu } from "@/types/Catalog/catalogMenu";
import { ICatalogsProducts } from "@/types/Catalog/catalogProducts";
import { ISearch } from "@/types/Search/search";
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

export const getCatalogProductFilter = (
  id: number,
  selected: ISelectedFilterProps
): Promise<ICatalogsProducts> => {
  const url = `catalog/cat-product/${id}`;

  const params = new URLSearchParams();
  // Добавить фильтры бренда
  if (selected.brand.length > 0) {
    params.append("VNaltovaroksearch[brand]", selected.brand.join(","));
  }

  // Добавить фильтр доставки
  if (selected.dost.length > 0) {
    params.append("VNaltovaroksearch[dost]", selected.dost.join(","));
  }

  // Добавить дополнительные фильтры
  if (selected.additional_filter.length > 0) {
    params.append(
      "VNaltovaroksearch[additional_filter]",
      selected.additional_filter.join(",")
    );
  }

  // // Добавить фильтры цены
  // params.append("VNaltovaroksearch[cena_min]", selected.price.min.toString());
  // params.append("VNaltovaroksearch[cena_max]", selected.price.max.toString());

  const apiUrl = `${url}?${params.toString()}`;

  return maxkg.get(apiUrl).json();
};

export const getCatalogProductsFiltered = ( id: number, page?: number, brands?: string, ddos?: string, cenamin?: number, cenamax?: number, additional?: string & number): Promise<IBoughts> => {
  return maxkg
    .get(
      `catalog/${id}?page=${page}&VNaltovaroksearch[brand]=${brands}&VNaltovaroksearch[dost]=${ddos}&VNaltovaroksearch[cena_min]=${cenamin}&VNaltovaroksearch[cena_max]=${cenamax}&VNaltovaroksearch[additional_filter]=${additional}`
    )
    .json();
};

//! Условии для запроса!
// Важно передавать все значение по порядку строго по порядку то есть сначала --->
//1) Передать id категории
//2) Передать номер страницы при необходимости ( Сделанно для загрузки по скроллу)
//3) Передать бренды  ---> Примечание если не выбранно ничего в этом фильтре а в другом выбран то передавать просто нужно кое что сделать но я еще не придумал что сделать
//4) Передать время доставки  ---> Примечание если не выбранно ничего в этом фильтре а в другом выбран то передавать просто нужно кое что сделать но я еще не придумал что сделать
//5) Передать минимальную цену  ---> Примечание если не выбранно ничего в этом фильтре а в другом выбран то передавать просто нужно кое что сделать но я еще не придумал что сделать
//6) Передать максимальную цену  ---> Примечание если не выбранно ничего в этом фильтре а в другом выбран то передавать просто нужно кое что сделать но я еще не придумал что сделать
//7) Передать дополнительные фильтры  ---> Примечание если не выбранно ничего в этом фильтре а в другом выбран то передавать просто нужно кое что сделать но я еще не придумал что сделать


// export const getCatalogProductsFiltereds = (
//   page?: number
// ): Promise<IBoughts> => {
//   return maxkg
//     .get(
//       `catalog/28631?page=1${
//         page ? `&VNaltovaroksearch[brand]=Lenovo,Foxcon` : null
//       }&VNaltovaroksearch[dost]=1&VNaltovaroksearch[cena_min]=0&VNaltovaroksearch[cena_max]=20000`
//     )
//     .json();
// };


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

export const postOtz = (otz: IUser) => {
  return maxkg.post("otz/create", { json: otz });
};

export const postRating = (ocenka: IOcenka) => {
  return maxkg.post("otz/set-ocenka", { json: ocenka });
};


//! USER REQUESTS FOR SEARCH -

export const getUserSearch = (slug: string): Promise<ISearch> => {
  return maxkg.get(`naltovarok/seek?${slug}`).json();
};

export const getFastUserSearch = (slug: string): Promise<ISearch> => {
  return maxkg.get(`naltovarok/seek?search=${slug}`).json();
};