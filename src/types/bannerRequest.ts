export type IBanner = IBannerItem[]

export interface IBannerItem {
  id: number
  naim: string
  url: string
  sid_cat: number
  ids_cat?: string
  show_all: number
  enable: number
  sort?: number
  open_new_window: number
  web_mob_type: number
  position_id?: number
  from_date?: string
  to_date?: string
  show_type: number
  code_web?: string
  code_mob?: string
  comment?: string
  alt?: string
  status: number
  country?: number
  city: any
  cat_type: number
  type: string
  id_v: any
  parent: number
}
