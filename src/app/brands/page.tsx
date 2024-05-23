import { getBrandsData, getMetaBrandPage } from "@/api/requests";
import BrandsList from "@/components/Brands/BrandList";
import { generatePageMetadata } from "@/utils/metadata";

export default async function page() {
    const brands = await getBrandsData();
  return (
    <>
        <BrandsList brands={brands}/>
    </>
  )
}

export async function generateMetadata() {
  return generatePageMetadata(getMetaBrandPage);
}