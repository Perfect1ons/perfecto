export type IMainPageBrands = IBrandItem[];

export interface IBrandItem {
  id: number;
  name: string;
  description?: string;
  img?: string;
  url: string;
}
