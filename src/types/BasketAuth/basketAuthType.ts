export type Root = BasketAuth[];

export interface BasketAuth {
  id: number;
  art3: any;
  art: number;
  cena0: string;
  cena4: any;
  cena_dos: string;
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
  isNovelty: number;
  country_id: any;
  stuff: any;
  size: string;
  keep_package: any;
  is_paid_delivery: any;
  discountPercent: any;
  currencySign: string;
  supply_period: any;
  balance: number;
  id_post: number;
  id_cat: number;
  bazedin: string;
  id_cat1c: any;
  naim_cat1c: any;
  id_idcat: any;
  moder: number;
  id_tov: number;
  copy: any;
  weight: any;
  description: string;
  short_description: string;
  trademark: string;
  cert: any;
  pli: number;
  naim_word: any;
  img1sm: string;
  img2big: string;
  art_post: string;
  id_user_add: any;
  price_cost: string;
  price_update: string;
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
  in_box: any;
  box: any;
  img_url: any;
  status: number;
  id_micro_serv: any;
  d_min: any;
  d_max: any;
  bar_code: any;
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
  id_box: number;
  kol: number;
  ddos: string;
  photos: any[];
  ocenka: number;
}

export interface Country {
  name: any;
}
