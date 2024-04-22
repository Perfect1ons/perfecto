import { getCatalogs, getSubCatalogs } from "@/api/requests";
import HeaderCatalog from "@/components/CatalogComponents/HeaderCatalog/HeaderCatalog";

const CatalogeHome = async () => {
  const catalogs = await getCatalogs();
  const category = await getSubCatalogs(2000000464);

  return <HeaderCatalog catalog={catalogs} category={category} />;
};

export default CatalogeHome;
