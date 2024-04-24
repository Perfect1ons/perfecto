import { getFiltersBrand, getSubCatalogs } from "@/api/requests";
import ProductsPage from "../page";

interface Params {
  params: { id: number };
}

export default async function page({ params: { id } }: Params) {
  const brand = await getFiltersBrand(id);
  const data = await getSubCatalogs(id);
  return (
    <div>
      <ProductsPage product={data} brand={brand} />
    </div>
  );
}
