export interface ICard {
  id: number;
  art3: any;
  art: number;
  cena0: any;
  cena4: any;
  cena_dos?: string; // Сделано необязательным
  cenaok: number;
  cena0r: any;
  cena4r: any;
  cena_dosr: any;
  cena_kyrs: any;
  naim: string;
  url: string;
  prim?: string;
  img: string;
  idt?: string;
  notfound: number;
  id_city: number;
  dat1: any;
  minQty: number;
  isNovelty?: number; // Сделано необязательным
  country_id: any;
  country?: string;
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
  pli?: number; // Сделано необязательным
  naim_word?: string;
  img1sm?: string;
  img2big?: string;
  art_post?: string;
  id_user_add?: number;
  price_cost?: string; // Сделано необязательным
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
  apply_test_per?: string;
  active_img?: any;
  discount: number;
  discount_prc: any;
  promotions: any[];
  old_price: number;
  to_date: any;
  from_date: any;
  valuteVal: string;
  price: number;
  ddos: string;
  photos: Photo[];
  ocenka: number;
  timer?: number;
  id_box?: number;
}

export interface Photo {
  url_part: string;
}
