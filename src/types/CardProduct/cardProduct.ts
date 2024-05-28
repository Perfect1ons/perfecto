export interface ICardProductItems {
  items: Items;
}

export interface Items {
  id: number;
  art3: any;
  art: number;
  cena0: string;
  cena4: any;
  cena_dos: any;
  cenaok: number;
  cena0r: number;
  cena4r: number;
  cena_dosr: number;
  cena_kyrs: any;
  naim: string;
  url: string;
  prim: any;
  img: string;
  idt: any;
  notfound: number;
  id_city: number;
  dat1: any;
  minQty: number;
  isNovelty: any;
  country_id: any;
  stuff: string;
  size: string;
  keep_package: any;
  is_paid_delivery: any;
  discountPercent: any;
  currencySign: string;
  supply_period: any;
  balance: string;
  id_post: number;
  id_cat: number;
  bazedin: string;
  id_cat1c: any;
  naim_cat1c: any;
  id_idcat: any;
  moder: number;
  id_tov: number;
  copy: any;
  weight: number;
  description: string;
  short_description: string;
  trademark: string;
  cert: string;
  pli: any;
  naim_word: any;
  img1sm: any;
  img2big: any;
  art_post: any;
  id_user_add: any;
  price_cost: string;
  price_update: any;
  naim_add: any;
  naim_add_manual: any;
  id_user_add_manual: any;
  id_status: string;
  video: any;
  pli_update: string;
  meta_title: any;
  meta_description: any;
  meta_keywords: any;
  trademark_id: any;
  in_box: string;
  box: string;
  img_url: string;
  status: number;
  id_micro_serv: number;
  d_min: string;
  d_max: string;
  show_price: number;
  show_opt: number;
  active_img: number;
  category_id: number;
  all_categories: number[];
  name: string;
  price_cost_som: number;
  price: number;
  apply_test_per: string;
  country: Country;
  slug: string;
  discount: number;
  discount_prc: number;
  promotions: any[];
  old_price: number;
  to_date: number;
  from_date: number;
  valuteVal: string;
  specification: string;
  photos: IPhotoProduct[];
  ddos: string;
  otz: any[];
  ocenka: number;
  vopl: Vopl[];
  viddost: Viddost[];
  service: any[];
  service_info: any[];
  banners_discount: any[];
}

export interface Country {
  name: string;
}

export interface IPhotoProduct {
  url_part: string;
}

export interface Vopl {
  id: number;
  naim: string;
  prim: string;
  sort?: number;
  id_city: number;
  id_city2: number;
  for_sumot: any;
  mess: string;
  icon: string;
  icon_opis: string;
}

export interface Viddost {
  id: number;
  naim: string;
  sort?: number;
  id_city: number;
  id_city2: number;
  for_sumot?: string;
  sum_dost?: string;
  mess: string;
  mess2: string;
  prim: string;
  id_tov?: number;
}
