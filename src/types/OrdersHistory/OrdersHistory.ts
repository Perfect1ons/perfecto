export interface IOrderHistory {
  items: Item[];
  _links: Links;
  _meta: Meta;
}

export interface Item {
  id: number;
  id_user: number;
  fio: string;
  name: string;
  second_name: string;
  tel: string;
  adres: string;
  email: string;
  org: string;
  org_inn: string;
  prim: string;
  dat1: string;
  status: number;
  idses: string;
  dat_dos: string;
  inbox: number;
  opl: string;
  opl2: string;
  rashod: string;
  id_city: number;
  naim_city: string;
  id_vopl: number;
  id_manager: any;
  id_manager2: any;
  id_sms: number;
  sms: number;
  sum_dost: any;
  vid_dost: number;
  shop_point: any;
  sum_skid: any;
  skid_proc: any;
  dat_dos2: string;
  supply_period: number;
  endperiod: any;
  id_city2: any;
  naim_city2: string;
  summa_zakaza: string;
  summa_ref: any;
  ref: any;
  summa_refskid: any;
  summa_visa: any;
  status_visa: any;
  status_balance: any;
  summa_balance: any;
  summa_bonus: string;
  summa_men: string;
  credit: any;
  dat_vid: string;
  id_bank: any;
  id_elsom: any;
  skidka_tov: any;
  fiz_ur: any;
  nds: number;
  nsp: any;
  type: number;
  comment_cancel: string;
  service_info: string;
  send_logist: any;
  valute: string;
  order_comment: any;
  dost_time: any;
  del_type: number;
}

export interface Links {
  self: Self;
  first: First;
  last: Last;
}

export interface Self {
  href: string;
}

export interface First {
  href: string;
}

export interface Last {
  href: string;
}

export interface Meta {
  totalCount: number;
  pageCount: number;
  currentPage: number;
  perPage: number;
}
