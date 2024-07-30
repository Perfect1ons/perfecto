export interface ICardProductItems {
  items: Items;
  seller: Seller;
  meta: Meta;
}

export interface Items {
  id: number;
  art3: any;
  art: number;
  cena0: number;
  cena4: any;
  cena_dos?: string;
  cenaok: number;
  cena0r: number;
  cena4r: number;
  cena_dosr: number;
  cena_kyrs: any;
  naim: string;
  url: string;
  prim?: string;
  img: string;
  idt?: any;
  notfound: number;
  id_city: number;
  dat1: any;
  minQty: number;
  isNovelty?: number;
  country_id: any;
  stuff?: string;
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
  weight?: any;
  description?: string;
  short_description?: string;
  trademark?: string;
  cert?: string;
  pli?: number;
  naim_word?: any;
  img1sm?: string;
  img2big?: string;
  art_post?: string;
  id_user_add?: any;
  price_cost?: string;
  price_update?: string;
  naim_add?: any;
  naim_add_manual?: string;
  id_user_add_manual?: number;
  id_status: string;
  video?: string;
  pli_update?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  trademark_id: any;
  in_box?: any;
  box?: any;
  img_url?: any;
  status: number;
  id_micro_serv?: any;
  d_min?: any;
  d_max?: any;
  show_price?: number;
  show_opt?: number;
  active_img?: number;
  category_id?: number;
  all_categories?: number[];
  name?: string;
  price_cost_som?: number;
  price: number;
  before_round?: number;
  round_test?: string;
  apply_test_per?: string;
  country?: string;
  slug?: string;
  discount: number;
  discount_prc: number;
  promotions: any[];
  old_price: number;
  to_date: string;
  from_date: string;
  timer?: number | undefined;
  valuteVal: string;
  specification?: string;
  photos: Photo[];
  ddos: string;
  otz?: Otz[];
  ocenka: number;
  vopl?: Vopl[];
  viddost?: Viddost[];
  service?: any[];
  service_info?: any[];
  banners_discount?: any[];
  quantity?: number;
  selected?: boolean;
  kol?: number;
  id_box: number;
}

export interface Seller {
  full_name: string;
  inn: string;
  name: string;
  balance_warehouse: any;
}

export interface Country {
  name?: string;
}

export interface Photo {
  url_part: string;
}

export interface Otz {
  id: number;
  id_user: number;
  id_tovar: number;
  name: string;
  text: string;
  dat1: string;
  moder: number;
  ocenka: number;
  is_nal: number;
  naim_tovar: string;
  naim_city: string;
  url_tovar: string;
  all_otz: number;
  tel: string;
  type: number;
  carusel: number;
  service_type: any;
  id_zakaz: any;
  dostoinsva: any;
  nedostatki: any;
  anonim: any;
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
export interface Meta {
  title: string;
  description: string;
  keywords: string;
  og_title: string;
  og_description: string;
  og_url: string;
  og_img: string;
}
