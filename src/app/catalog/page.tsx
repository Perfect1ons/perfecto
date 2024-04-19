import { getCatalogs, getSubCatalogs } from "@/api/requests";
import HeaderCatalog from "@/components/CatalogComponents/HeaderCatalog/HeaderCatalog";

const CatalogeHome = async () => {
  const catalogs = await getCatalogs();
  // const id = catalogs.filter((item) => item.id);
  const category = await getSubCatalogs(16);
  // console.log(category);

  return <HeaderCatalog catalog={catalogs} />;
};

export default CatalogeHome;
