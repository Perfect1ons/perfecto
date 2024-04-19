import { ICatalogHome } from "@/types/catalogsHome";
import React from "react";
interface ICatalogProps {
  catalog: ICatalogHome[];
}
const HeaderCatalog = ({ catalog }: ICatalogProps) => {
  return (
    <div>
      {catalog.map((catalog) => (
        <div key={catalog.id}>
          <h1>{catalog.name}</h1>
        </div>
      ))}
    </div>
  );
};

export default HeaderCatalog;
