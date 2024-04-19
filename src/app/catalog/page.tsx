import { getCatalogs } from "@/api/requests";
import HeaderCatalog from "@/components/CatalogComponents/HeaderCatalog/HeaderCatalog";

const CatalogeHome = async () => {
  const catalogs = await getCatalogs();
  return <HeaderCatalog catalog={catalogs} />;
};

export default CatalogeHome;
