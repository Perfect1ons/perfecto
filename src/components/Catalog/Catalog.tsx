import { getCatalog, getCatalogSecond } from "@/api/requests";
import CatalogFirst from "./CatalogFirst";

const Catalog = async () => {
  const catalog = await getCatalog();
  const category = await getCatalogSecond(2000000464);
  return (
    <div>
      <CatalogFirst catalog={catalog} category={category} />
    </div>
  );
};

export default Catalog;
