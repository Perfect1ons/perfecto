//! Типизация запросов
import { IOcenka } from "@/components/Item/ProductReview/ProductReview";
import { IUser } from "@/components/UI/ReviewModal/ReviewModal";
import { ICategoryFilter } from "@/types/Catalog/catalogFilters";
import { ICatalogMenu } from "@/types/Catalog/catalogMenu";
import { ISearch } from "@/types/Search/search";
import { IBoughts } from "@/types/lastBoughts";
import { IPopularGood } from "@/types/popularGoods";

//! Импорт библиотеки
import ky from "ky";

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//! Используем библиотеку ky для fetch запросов
//  Как им пользоваться вам расскажет ютуб :)
const maxkg = ky.create({
  prefixUrl: "/api/",
});
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//! GET запрос для получения каталог меню
export const getCatalogsMenu = (): Promise<ICatalogMenu> => {
  return maxkg.get("catalog/cat-list-menu?_format=json").json();
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//! GET запросы сделаны для загрузки по скроллу и по клику - передаем номер page
export const getPopularGoodsByClient = (
  page: number
): Promise<IPopularGood[]> => {
  return maxkg.get(`site/popular?page=${page}`).json();
};

export const getBoughtsByClient = (page: number): Promise<IBoughts> => {
  return maxkg.get(`site/lastz?page=${page}`).json();
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//! GET запрос на фильтрацию и условии для запроса фильтрации!
// Важно передавать все значение по порядку строго по порядку то есть сначала --->
//1) Передать id категории
//2) Передать номер страницы при необходимости но по дефолтному должно стоять 1 ( Сделанно для загрузки по скроллу)
//3) Передать бренды
//4) Передать минимальную цену
//5) Передать максимальную цену
//6) Передать время доставки
//7) Передать дополнительные фильтры

export const getCatalogProductsFiltered = (
  id: number,
  page?: number,
  brands?: string,
  cenamin?: number,
  cenamax?: number,
  ddos?: string,
  additional?: any
): Promise<ICategoryFilter> => {
  return maxkg
    .get(
      `catalog/${id}?page=${page}&VNaltovaroksearch[brand]=${brands}&VNaltovaroksearch[cena_min]=${cenamin}&VNaltovaroksearch[cena_max]=${cenamax}&VNaltovaroksearch[dost]=${ddos}&VNaltovaroksearch[additional_filter]=${additional}`
    )
    .json();
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//! POST запросы для отзывов
export const postOtz = (otz: IUser) => {
  return maxkg.post("otz/create", { json: otz });
};

export const postRating = (ocenka: IOcenka) => {
  return maxkg.post("otz/set-ocenka", { json: ocenka });
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
//! GET запросы для поиска
export const getUserSearch = (slug: string): Promise<ISearch> => {
  return maxkg.get(`naltovarok/seek?${slug}`).json();
};

export const getFastUserSearch = (slug: string): Promise<ISearch> => {
  return maxkg.get(`naltovarok/seek?search=${slug}`).json();
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//
