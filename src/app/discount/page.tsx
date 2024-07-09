import {  getDiscounts, getMetaSkidPage } from "@/api/requests";
import AllDiscounts from "@/components/HomeComponents/Discounts/AllDiscounts/AllDiscounts";
import DiscountPagination from "@/components/HomeComponents/Discounts/AllDiscounts/DiscountPagination/DiscountPagination";
import { generatePageMetadata } from "@/utils/metadata";
interface DiscountsProps {
  searchParams: {
    page?: string;
  };
}


export default async function page({ searchParams }: DiscountsProps) {
    const currentPage = parseInt(searchParams.page || "1", 10);
    const discountsData = await getDiscounts(currentPage);
    const pageCount = 2;


  return (
    <>
        <AllDiscounts discounts={discountsData} />
        <DiscountPagination pageCount={pageCount} currentPage={currentPage}/>
    </>
  );
}

export async function generateMetadata() {
  return generatePageMetadata(getMetaSkidPage);
}