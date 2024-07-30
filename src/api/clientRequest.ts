//! Типизация запросов
import { IOcenka } from "@/components/Item/ProductReview/ProductReview";
import { IUser } from "@/components/UI/ReviewModal/ReviewModal";
import { IFiltersBrandByAbdulaziz } from "@/components/temporary/data";
import { ICategoryFilter } from "@/types/Catalog/catalogFilters";
import { ICatalogMenu } from "@/types/Catalog/catalogMenu";
import { CurrentOrdersType } from "@/types/Profile/CurrentOrders";
import { IRatingOrderHistoryCard } from "@/types/OrdersHistory/RatingOrderHistoryCard";
import { Notifications } from "@/types/Profile/Notifications/notifications";
import { UserPersonalDataType } from "@/types/Profile/PersonalData";
import { settingsNotificationType } from "@/types/Profile/settingsNotification";
import { settingsNotificationUpdateType } from "@/types/Profile/settingsNotificationUpdaet";
import { ISearch } from "@/types/Search/search";
import { ISeek } from "@/types/Search/seek";
import { IScrolledCatalog } from "@/types/catalogProduct/catalogProduct";
import { IFiltersBrand } from "@/types/filtersBrand";
import { IBoughts } from "@/types/lastBoughts";
import { IPopularGood } from "@/types/popularGoods";

//! Импорт библиотеки
import ky from "ky";
import { SelectRegionType } from "@/types/Basket/SelectRegion";
import { getBasketProductsType } from "@/types/Basket/getBasketProduct";
import { ResponsePostBasket } from "@/types/Basket/ResponsePostBasket";

//! Используем библиотеку ky для fetch запросов
//  Как им пользоваться вам расскажет ютуб :)
const maxkg = ky.create({
  prefixUrl: "/api/",
});

const maxkgnocache = ky.create({
  prefixUrl: "/api/",
  cache: "no-cache",
});

//! GET запрос для получения каталог меню
export const getCatalogsMenu = (): Promise<ICatalogMenu> => {
  return maxkg.get("catalog/cat-list-menu").json();
};

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
  additional?: any,
  sort?: string
): Promise<ICategoryFilter> => {
  return maxkg
    .get(
      `catalog/${id}?page=${page}&VNaltovaroksearch[brand]=${brands}&VNaltovaroksearch[cena_min]=${cenamin}&VNaltovaroksearch[cena_max]=${cenamax}&VNaltovaroksearch[dost]=${ddos}&VNaltovaroksearch[additional_filter]=${additional}&sort=${sort}`
    )
    .json();
};
export const getSearchItem = (slug: string, id: number): Promise<ISeek> => {
  return maxkg.get(`naltovarok/seek?search=${slug}&page=${id}`).json();
};

export const getCatalogProductsFilters = (
  id: number,
  page: number,
  start: number,
  limit: number,
  brands?: string,
  cenamin?: number,
  cenamax?: number,
  ddos?: string,
  additional?: any,
  sort?: string
): Promise<IScrolledCatalog> => {
  return maxkg
    .get(
      `catalog/cat-product/${id}?page=${page}&start=${start}&limit=${limit}&VNaltovaroksearch[brand]=${brands}&VNaltovaroksearch[cena_min]=${cenamin}&VNaltovaroksearch[cena_max]=${cenamax}&VNaltovaroksearch[dost]=${ddos}&VNaltovaroksearch[additional_filter]=${additional}&sort=${sort}`
    )
    .json();
};
// max.kg/api/catalog/cat-product/28631?page=1&start=1&limit=20&VNaltovaroksearch[brand]=Lenovo&sort=-cenaok
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

export const getFiltersBrandByClient = (
  id: number,
  idfil?: number
): Promise<IFiltersBrand> => {
  return maxkg.get(`catalog/listfilter?id_cat=${id}&id_filter=${idfil}`).json();
};

export const getFiltersBrandByAClient = (
  id: number,
  idfil: string
): Promise<IFiltersBrandByAbdulaziz> => {
  return maxkg
    .get(`catalog/listfilter?id_cat=${id}}&id_filter=${idfil}`)
    .json();
};
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
  return maxkg.get(`naltovarok/seek?search=${slug}&page=1`).json();
};
//~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~//

export const postLoginCode = (tel: string) => {
  const params = new URLSearchParams();
  params.append("tel", tel);

  return maxkg.post("site/logincode", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });
};

export const postConfirmCode = (tel: string, code: string) => {
  const params = new URLSearchParams();
  params.append("tel", tel);
  params.append("code", code);

  return maxkg.post("site/confirmcode", {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });
};

export const getPersonalDataProfile = (
  token: string
): Promise<UserPersonalDataType> => {
  return maxkg
    .get("prof", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .json();
};
export const getSettingsNotification = (
  token: string
): Promise<settingsNotificationType> => {
  return maxkg
    .get("prof/notiflist", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .json();
};
export const getSettingsNotificationUpdate = (
  token: string
): Promise<settingsNotificationUpdateType> => {
  return maxkg
    .get("prof/my-notiflist", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .json();
};
export const postNotificationSettings = (
  token: string,
  name: string,
  key: string,
  check: number
) => {
  const params = new URLSearchParams();

  params.append("name", name);
  params.append("key", key);
  params.append("chek", check.toString());
  return maxkg.post(`prof/set-notif?name=${name}&key=${key}&chek=${check}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });
};

export const postPesonalDataProfileFio = (
  token: string,
  fio?: string,
  name?: string,
  birthday?: string,
  male?: string,
  position?: string
) => {
  const params = new URLSearchParams();

  if (fio !== undefined) params.append("fio", fio);
  if (name !== undefined) params.append("name", name);
  if (birthday !== undefined) params.append("birthday", birthday);
  if (male !== undefined) params.append("male", male);
  if (position !== undefined) params.append("position", position);

  return maxkg.post("prof/update-fio", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });
};

export const postPesonalDataProfileOrg = (
  token: string,
  ind_pred?: string,
  org?: string,
  inn?: string,
  adres?: string,
  email?: string,
  bank?: string,
  schet?: string,
  bik?: string
) => {
  const params = new URLSearchParams();

  if (ind_pred !== undefined) params.append("ind_pred", ind_pred);
  if (org !== undefined) params.append("org", org);
  if (inn !== undefined) params.append("inn", inn);
  if (adres !== undefined) params.append("adres", adres);
  if (email !== undefined) params.append("email", email);
  if (bank !== undefined) params.append("bank", bank);
  if (schet !== undefined) params.append("schet", schet);
  if (bik !== undefined) params.append("bik", bik);

  return maxkg.post("prof/set-user-org", {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });
};

export const getNotificationCount = (id: number): Promise<Notifications> => {
  return maxkg.get(`site/notification?idUser=${id}`).json();
};

export const getCurrentOrdersClient = (
  token: string
): Promise<CurrentOrdersType> => {
  return maxkg
    .get("zakaz", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .json();
};

export const deleteNotification = (id: number) => {
  return maxkgnocache.get(`site/closenotif?id=${id}`);
};

export const getPersonalDataProfileClient = (
  token: string
): Promise<UserPersonalDataType> => {
  return maxkg
    .get("prof", {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    })
    .json();
};

export const postOrderReview = (
  id_zakaz: number,
  ocenka: number,
  token: string
) => {
  const params = new URLSearchParams();
  return maxkg.post(`otz/zakaz-otz?id_zakaz=${id_zakaz}&ocenka=${ocenka}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });
};

export const postСancellationOrder = (token: string, id: number) => {
  const params = new URLSearchParams();
  return maxkg.post(`zakaz/otmena?id_zakaz=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: params.toString(),
  });
};

export const getOrderHistoryOrderRating = async (
  token: string | undefined,
  id_zakaz: number
): Promise<IRatingOrderHistoryCard> => {
  const response = await maxkg.get(`otz/zakaz-ocenka?id_zakaz=${id_zakaz}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return data as IRatingOrderHistoryCard;
};

export const checkUser = (tel: number): Promise<number> => {
  return maxkg.get(`prof/exists-user?tel=${tel}`).json();
};

export const postBoxOrder = (
  token: string,
  tel: number,
  vid_dost: string,
  id_vopl: string,
  fio: string,
  name: string,
  org: string,
  org_inn: string,
  id_bank: number,
  id_city: number,
  id_city2: number,
  directory: string
) => {
  const params = new URLSearchParams();
  return maxkg.post(
    `box/zakaz?tel=${tel}&vid_dost=${vid_dost}&id_vopl=${id_vopl}&fio=${fio}&name=${name}&org=${org}&org_inn=${org_inn}&id_bank=${id_bank}&id_city=${id_city}&id_city2=${id_city2}&directory=${directory}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    }
  );
};

export const getSelectRegion = async (
  token: string,
  id: number
): Promise<SelectRegionType> => {
  const response = await maxkg.get(`naltovarok/region?id=${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  const data = await response.json();

  return data as SelectRegionType;
};
export const postBasketProduct = async (
  kol: number,
  id_tov: number
): Promise<ResponsePostBasket> => {
  const formData = new FormData();
  formData.append("kol", kol.toString());
  formData.append("id_tov", id_tov.toString());

  try {
    const response: ResponsePostBasket = await maxkgnocache
      .post("box/set-box-guest", {
        body: formData,
      })
      .json();

    // Return the response directly, since it matches the ResponsePostBasket type
    return response;
  } catch (error) {
    console.error("Error posting basket product:", error);
    throw error; // Optionally re-throw the error for further handling
  }
};

export const deleteBasketProduct = (
  cart_id: string | null | undefined,
  id_tovar: number
): Promise<boolean> => {
  return maxkgnocache
    .delete(`box/del-box-guest?cart_id=${cart_id}&id_tov=${id_tovar}`)
    .json();
};

export const deleteBasketProductAll = async (
  cart_id: string | null | undefined,
  ids_tov: number[]
): Promise<boolean> => {
  const formData = new FormData();
  formData.append("cart_id", cart_id || "");
  formData.append("id_tov", ids_tov.join(","));
  try {
    const response = await maxkgnocache.post(`box/del-box-guest-all`, {
      body: formData,
    });

    if (response.ok) {
      return true;
    } else {
      const error = await response.json();
      console.error("Server error:", error);
      return false;
    }
  } catch (error) {
    console.error("Network error:", error);
    return false;
  }
};

//запросы корзины для зареганных юзеров

export const postBasketProductAuthed = async (
  token: string,
  kol: string,
  id_tov: string
): Promise<ResponsePostBasket> => {
  const params = new URLSearchParams();
  params.set("id_tov", id_tov);
  params.set("kol", kol);
  return maxkgnocache
    .post(`box/create`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    })
    .json();
};
