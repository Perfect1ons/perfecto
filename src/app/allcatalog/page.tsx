import { getCatalogs } from "@/api/requests";
import AllProducts from "@/components/CatalogComponents/AllProducts/AllProducts";
const page = async () => {
  const catgoriesFirs = await getCatalogs();
  return (
    <div>
      <AllProducts />
    </div>
  );
};

export default page;
