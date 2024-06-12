import { ICatalogsProducts } from "@/types/Catalog/catalogProducts";
import { IFiltersBrand } from "@/types/filtersBrand";

interface ICatalogFiltresProps {
  filter: IFiltersBrand;
  catalog: ICatalogsProducts;
}
const CatalogFiltres = ({ filter, catalog }: ICatalogFiltresProps) => {
  return <div className="filtres"></div>;
};

export default CatalogFiltres;
