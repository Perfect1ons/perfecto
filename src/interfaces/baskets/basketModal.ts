export interface IVariableBuyer {
  payment: {
    name: string;
    id: number | string;
  };
  delivery: {
    name: string;
    id: number | string;
  };
}
export interface IBuyer {
  tel: number;
  vid_dost: number | string;
  id_vopl: number | string;
  fio: string;
  name: string;
  org?: string;
  org_inn?: string;
  id_city?: number | null;
  id_city2?: number | null;
  directory?: string;
  dost?: string;
  oplata?: string | number;
  city?: string;
}

export interface ICityBuyer {
  id_city: {
    name: string;
    id: number | null;
  };
  //region
  id_city2: {
    name: string;
    id: number | null;
  };
  // street
  directory: {
    street: string;
    house: string;
    apartament: string;
  };
}
export interface BasketOrdersWarnings {
  delivery: string;
  payment: string;
  phone: string;
  surname: string;
  name: string;
}
