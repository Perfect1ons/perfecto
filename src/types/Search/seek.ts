export interface ISeek {
  catalog: ISeekCatalog[];
  model: ISeekItems;
  id_qseek: number;
}

export interface ISeekCatalog {
  idd: number;
  id: number;
  sid: number;
  name: string;
  priority?: number;
  priority_home?: number;
  priority_menu?: number;
  is_hidden_in_menu?: number;
  path: string;
  path_for_pli: string;
  level: number;
  type?: number;
  photo: any;
  icon: string;
  top_image: any;
  is_leaf: number;
  full_slug_old?: string;
  full_slug: string;
  level1?: number;
  level2?: number;
  level3?: number;
  level4?: number;
  level5?: number;
  level6?: number;
  level7?: number;
  level8?: number;
  level9?: number;
  level10?: number;
  nal?: number;
  opis?: string;
  html: any;
  nazv?: string;
  title?: string;
  description?: string;
  keywords?: string;
  count_skid?: number;
  count_hit?: number;
  parent: number;
  e_id?: number;
  main_type: any;
  sort: number;
  sort_menu?: number;
  manual: number;
  enable: number;
  sim_enable: number;
  status: any;
  seo_title?: string;
  seo_description: any;
  seo_keyword: any;
  parent_for_pli: any;
}

export interface ISeekItems {
  items: ISeekItem[];
  _meta: Meta;
  searchModel: any[];
}

export interface ISeekItem {
  id: number;
  art3: any;
  art: number;
  cena0: string;
  cena4: any;
  cena_dos?: string;
  cenaok: number;
  cena0r: any;
  cena4r: any;
  cena_dosr: any;
  cena_kyrs: any;
  naim: string;
  url: string;
  prim?: string;
  img?: string;
  idt: any;
  notfound: number;
  id_city: number;
  dat1: any;
  minQty: number;
  isNovelty?: number;
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
  weight?: number;
  description: string;
  short_description?: string;
  trademark: string;
  cert?: string;
  pli?: number;
  naim_word: any;
  img1sm?: string;
  img2big?: string;
  art_post?: string;
  id_user_add: any;
  price_cost?: string;
  price_update?: string;
  naim_add: any;
  naim_add_manual?: string;
  id_user_add_manual?: number;
  id_status: string;
  video?: string;
  pli_update?: string;
  meta_title?: string;
  meta_description?: string;
  meta_keywords?: string;
  trademark_id: any;
  in_box?: string;
  box?: string;
  img_url?: string;
  status: number;
  id_micro_serv?: number;
  d_min?: string;
  d_max?: string;
  percent_sum: string;
  update_period?: number;
  show_price: number;
  show_opt: number;
  active_img?: number;
  active_percent_sum: number;
  images: Image[];
  price: number;
  before_markup: number;
  discount: number;
  discount_prc: number;
  promotions: any[];
  old_price: number;
  to_date: number;
  from_date: number;
  valuteVal: string;
  ddos: string;
  photos: Photo[];
  ocenka: number;
  apply_test_per?: string;
}

export interface Image {
  id: number;
  id_tov: number;
  img: string;
  sort: number;
  id_post: number;
  id_tovv: number;
}

export interface Photo {
  url_part: string;
}

export interface Meta {
  totalCount: number;
}
