import { getBrandsData, getBrandsPaginations, getMetaBrandPage } from "@/api/requests";
import BrandsList from "@/components/Brands/BrandList";
import { generatePageMetadata } from "@/utils/metadata";
import NotFound from "../not-found";
import BrandsPagination from "@/components/Brands/BrandsPaginations/BrandsPaginations";

interface BrandProps {
  searchParams: {
    page?: string;
  };
}

export async function generateMetadata() {
  return generatePageMetadata(getMetaBrandPage);
}

export default async function page({ searchParams }: BrandProps) {
    const brandsData = await getBrandsData();
    const currentPage = parseInt(searchParams.page || "1", 10);
    const brands = await getBrandsPaginations(currentPage);
    const pageCount = Math.ceil(brandsData.length / 20);

    if (currentPage > pageCount) {
      return <NotFound />;
    }

    return (
      <>
        <BrandsList brands={brands} />
        <BrandsPagination pageCount={pageCount} currentPage={currentPage} />
      </>
    );
}

