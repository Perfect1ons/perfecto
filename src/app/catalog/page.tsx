import React from "react";
import CatalogsLeaf from "@/components/CatalogComponents/Catalogs/CatalogsLeaf";
import { ICatalogsProducts } from "@/types/Catalog/catalogProducts";
import CatalogProducts from "@/components/CatalogComponents/CatalogProducts/CatalogProducts";
import { getFiltersBrand } from "@/api/requests";

interface IProps {
  catalog: ICatalogsProducts;
  path: string;
}

const Catalogs = async ({ catalog, path }: IProps) => {
  const filterProduct = await getFiltersBrand(catalog.category.id);
  const filteredCatalog = () => {
    if (catalog.category.is_leaf === 1) {
      return <CatalogProducts catalog={catalog} filter={filterProduct} />;
    } else {
      return <CatalogsLeaf catalog={catalog} path={path} />;
    }
  };
  return <div>{filteredCatalog()}</div>;
};

export default Catalogs;
