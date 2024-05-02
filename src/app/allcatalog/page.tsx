import { getCatalogs, getSubCatalogs } from "@/api/requests";
import AllProducts from "@/components/CatalogComponents/AllProducts/AllProducts";
const page = async () => {
  const catgoriesFirs = await getCatalogs();
  const catalogs = await getCatalogs();
  const category = await getSubCatalogs(2000000464);

  return (
    <div>
      <AllProducts catalog={catalogs} category={category} />
    </div>
  );
};

export default page;
