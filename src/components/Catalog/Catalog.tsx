import React from "react";
import CatalogsLeaf from "@/components/CatalogComponents/CatalogsLeaf/CatalogsLeaf";
import { ICatalogsProducts } from "@/types/Catalog/catalogProducts";
import CatalogProducts from "@/components/CatalogComponents/CatalogProducts/CatalogProducts";
import { getFiltersBrand, getFiltersBrandByAbdulaziz } from "@/api/requests";
import { BreadCrumbs } from "@/types/BreadCrums/breadCrums";
import { IIntroBannerDekstop } from "@/types/Home/banner";
import { ICategoryFilter } from "@/types/Catalog/catalogFilters";

interface IProps {
  init: ICategoryFilter;
  banner: IIntroBannerDekstop;
  catalog: ICatalogsProducts;
  path: string;
  breadCrumbs: BreadCrumbs[];
}

const Catalogs = async ({
  init,
  banner,
  catalog,
  path,
  breadCrumbs,
}: IProps) => {
  const filterProduct = await getFiltersBrand(catalog.category.id);
  const filtered = await getFiltersBrandByAbdulaziz(catalog.category.id);
  const filteredCatalog = () => {
    if (catalog.category.is_leaf === 1) {
      return (
        <CatalogProducts
          init={init}
          banner={banner}
          catalog={catalog}
          filter={filterProduct}
          breadCrumbs={breadCrumbs}
          filtered={filtered}
        />
      );
    } else {
      return (
        <CatalogsLeaf catalog={catalog} path={path} breadCrumbs={breadCrumbs} />
      );
    }
  };
  return <>{filteredCatalog()}</>;
};

export default Catalogs;
