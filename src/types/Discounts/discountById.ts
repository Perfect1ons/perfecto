export interface IDiscountsById {
  product: IDiscountProduct[];
  page: number;
  count: number;
  id: string;
  promotion: Promotion;
}

export interface IDiscountProduct {
  id: number;
  art3: any;
  art: number;
  cena0: number;
  cena4: any;
  cena_dos: string;
  cenaok: number;
  cena0r: any;
  cena4r: any;
  cena_dosr: any;
  cena_kyrs: any;
  naim: string;
  url: string;
  prim: string;
  img: string;
  idt: any;
  notfound: number;
  id_city: number;
  dat1: any;
  minQty: number;
  isNovelty: number;
  country_id: any;
  country: string;
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
  weight: any;
  description: string;
  short_description: string;
  trademark: string;
  cert: string;
  pli: number;
  naim_word: any;
  img1sm: string;
  img2big: string;
  art_post: string;
  id_user_add: any;
  price_cost: string;
  price_update: string;
  naim_add: any;
  naim_add_manual: string;
  id_user_add_manual: number;
  id_status: string;
  video: string;
  pli_update: string;
  meta_title: string;
  meta_description: string;
  meta_keywords: string;
  trademark_id: any;
  in_box: any;
  box: any;
  img_url: any;
  status: number;
  id_micro_serv: any;
  d_min: any;
  d_max: any;
  apply_test_per: string;
  active_img: number;
  discount: number;
  discount_prc: string;
  promotions: any[];
  old_price: number;
  to_date: string;
  from_date: string;
  timer: number;
  valuteVal: string;
  price: number;
  ddos: string;
  photos: Photo[];
  ocenka: number;
}

export interface Photo {
  url_part: string;
}

export interface Promotion {
  promotion_id: number;
  name: string;
  short_description: string;
  description: string;
  conditions: string;
  bonuses: Bonuses;
  to_date: number;
  from_date: number;
  priority: number;
  stop: string;
  zone: string;
  conditions_hash: any;
  status: string;
  number_of_usages: number;
  users_conditions_hash: any;
  image: string;
  banner: any;
  banner_cat: string;
  timer: number;
  timer_continue: number;
  days: number;
  hours: number;
  word_day: string;
  word: string;
  message: string;
}

export interface Bonuses {
  "1": N1;
}

export interface N1 {
  bonus: string;
  type: string;
  discount_value: string;
  discount_bonuse: string;
}
