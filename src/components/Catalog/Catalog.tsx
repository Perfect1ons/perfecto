import { getCatalog, getCatalogSecond } from "@/api/requests";
import CatalogFirst from "./CatalogFirst";
import { ICatalogFirst } from "@/types/catalogFirst";
import { ICatalogSecond } from "@/types/catalogSecond";
import { CatalogProps } from "@/app/catalog/page";

const Catalog = ({ catalog, category }: CatalogProps) => {
  return (
    <div>
      <CatalogFirst catalog={catalog} category={category} />
    </div>
  );
};

export default Catalog;
