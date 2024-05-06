import React from "react";

import { ChildLevel2, ICatalogMenu } from "@/types/Catalog/catalogMenu";
import CatalogsLeaf from "@/components/CatalogComponents/Catalogs/CatalogsLeaf";
import CatalogProducts from "@/components/CatalogComponents/CatalogProducts/CatalogProducts";

interface IProps {
  catalog: ICatalogMenu;
  path: string;
}

const Catalogs: React.FC<IProps> = ({ catalog, path }) => {
  const hasPathMatch = (item: any, path: string): boolean => {
    return (
      item.full_slug === path ||
      (item.child_level2 &&
        item.child_level2.some(
          (child: ChildLevel2) => child.full_slug === path
        ))
    );
  };

  const filteredCatalog = catalog.filter((item) => hasPathMatch(item, path));

  return (
    <>
      {filteredCatalog.map((item) => {
        if (item.is_leaf === 0) {
          return (
            <CatalogsLeaf
              key={item.id}
              catalog={item}
              path={path}
              leaf={item.is_leaf}
            />
          );
        } else if (item.is_leaf === 1) {
          return <CatalogProducts key={item.id} />;
        } else if (item.child_level2) {
          return item.child_level2.map((child) => {
            if (child.is_leaf === 0) {
              return (
                <CatalogsLeaf
                  key={child.id}
                  catalog={child}
                  path={path}
                  leaf={child.is_leaf}
                />
              );
            } else if (child.is_leaf === 1) {
              return <CatalogProducts key={child.id} />;
            }
            return null;
          });
        }
        return null;
      })}
    </>
  );
};

export default Catalogs;
