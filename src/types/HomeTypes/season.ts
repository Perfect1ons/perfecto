export type IMainPageSeasonCategory = ISeasonCategoryItem[];

export interface ISeasonCategoryItem {
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
  photo?: string;
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
  e_id: any;
  main_type: string;
  sort: number;
  sort_menu: number;
  manual: number;
  enable: number;
  sim_enable: number;
  status: any;
  seo_title?: string;
  seo_description?: string;
  seo_keyword?: string;
  parent_for_pli?: number;
}
