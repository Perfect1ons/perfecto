import { getCatalogsProducts, getFiltersBrand } from "@/api/requests";
import ProductsPage from "../page";

interface Params {
  params: { path: string };
}

export default async function page({ params: { path } }: Params) {
  const brand = await getFiltersBrand(path);
  const data = await getCatalogsProducts(path);
  return (
    <div>
      <ProductsPage product={data} brand={brand} />
    </div>
  );
}
