import { getBrandsData } from "@/api/requests";
import BrandsList from "@/components/Brands/BrandList";

export default async function page() {
    const brands = await getBrandsData();
  return (
    <>
        <BrandsList brands={brands}/>
    </>
  )
}
