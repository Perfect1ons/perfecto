export interface IIntroBanner {
  width: string;
  height: string;
  product: IIntro[];
}

export interface IIntroBannerDekstop {
  width: string;
  height: string;
  baner: IIntro[];
}

export interface IIntro {
  id: number;
  naim: string;
  url: string;
  sid_cat: any;
  ids_cat: string;
  show_all: number;
  enable: number;
  sort: any;
  open_new_window: number;
  web_mob_type: number;
  position_id: number;
  from_date: string;
  to_date: string;
  show_type: number;
  code_web: string;
  code_mob: string;
  comment: string;
  alt: string;
  status: number;
  country: number;
  city: any;
  cat_type: number;
}





