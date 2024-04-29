export interface ICatalogsChild {
  parent: Parent;
  child: Child[];
}

export interface Parent {
  idd: number;
  id: number;
  name: string;
  level: number;
  is_leaf: number;
  full_slug: string;
  icon: string;
  enable: number;
  path: string;
}

export interface Child {
  idd: number;
  id: number;
  name: string;
  level: number;
  is_leaf: number;
  full_slug: string;
  icon: string;
  enable: number;
  path: string;
}
