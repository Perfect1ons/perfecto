import React from "react";
import CatalogsLeaf from "@/components/CatalogComponents/Catalogs/CatalogsLeaf";
import { ICatalogsProducts } from "@/types/Catalog/catalogProducts";
import CatalogProducts from "@/components/CatalogComponents/CatalogProducts/CatalogProducts";
import { getFiltersBrand } from "@/api/requests";
import { BreadCrumbs } from "@/types/BreadCrums/breadCrums";
import { IIntroBannerDekstop } from "@/types/Home/banner";

interface IProps {
  banner: IIntroBannerDekstop
  catalog: ICatalogsProducts;
  path: string;
  breadCrumbs: BreadCrumbs[];
}

const Catalogs = async ({ banner, catalog, path, breadCrumbs }: IProps) => {
  const filterProduct = await getFiltersBrand(catalog.category.id);
  const filteredCatalog = () => {
    if (catalog.category.is_leaf === 1) {
      return <CatalogProducts banner={banner} catalog={catalog} filter={filterProduct} breadCrumbs={breadCrumbs}/>;
    } else {
      return (
        <CatalogsLeaf catalog={catalog} path={path} breadCrumbs={breadCrumbs} />
      );
    }
  };
  return <>{filteredCatalog()}</>;
};

export default Catalogs;
