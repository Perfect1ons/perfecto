export interface IOrderById {
  tovary: ITovaryByID[];
  itogo: Itogo;
  count: number;
}

export interface ITovaryByID {
  id: number;
  sid: number;
  id_zakaz: number;
  cena0: string;
  kol: number;
  cena4: any;
  cena_dos: string;
  cenaok: string;
  cena0r: string;
  cena4r: string;
  cena_dosr: string;
  naim: string;
  url: string;
  prim: string;
  img: string;
  id_user: number;
  dat1: string;
  idt: number;
  inbox: number;
  inbox_dat: any;
  inbox_error: any;
  logist_id: any;
  cenaok1: string;
  dat_dos: string;
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
  balance: number;
  category_id: number;
  ed_izm: any;
  unit_id: number;
  id_post: number;
  id_tov: number;
  art: string;
  dat_dos2: string;
  cena_base: string;
  nds: number;
  sum_skid: string;
  skidka_tov: any;
  service: any;
  sebes: any;
  price_without_discount: number;
  price_skid: number;
  commission: number;
}

export interface Itogo {
  bez_skidka: string;
  skidka: string;
  nds: string;
  nsp: string;
  opl: string;
  total: string;
  ostatok: string;
  sdacha: number;
  vozvrasheni: number;
}
