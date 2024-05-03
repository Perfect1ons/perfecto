export type ICatalogMenu = Root2[];

export interface Root2 {
  id: number;
  name: string;
  path: string;
  level: number;
  icon: string;
  full_slug: string;
  parent?: number;
  enable: number;
  sort_menu: number;
  is_leaf: number;
  child_level2: ChildLevel2[];
}

export interface ChildLevel2 {
  id: number;
  name: string;
  path: string;
  level: number;
  icon: string;
  full_slug: string;
  parent: number;
  enable: number;
  sort_menu?: number;
  is_leaf: number;
  child_cat_level3?: ChildCatLevel3[];
}

export interface ChildCatLevel3 {
  id: number;
  name: string;
  path: string;
  level: number;
  icon: string;
  full_slug: string;
  parent: number;
  enable: number;
  sort_menu?: number;
  is_leaf: number;
}
