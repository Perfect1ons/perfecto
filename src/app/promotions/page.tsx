import { getMetaPromoPage, getPromotion, getPromotionPagination } from "@/api/requests";
import AllPromo from "@/components/HomeComponents/Promotion/AllPromo/AllPromo";
import { generatePageMetadata } from "@/utils/metadata";
import NotFound from "../not-found";
import PromoPagination from "@/components/HomeComponents/Promotion/PromoPagination/PromoPagination";

interface PromotionsProps {
  searchParams: {
    page?: string;
  };
}

export default async function Page({ searchParams }: PromotionsProps) {
  const currentPage = parseInt(searchParams.page || "1", 10);
  const promotionData = await getPromotion();
  const promoData = await getPromotionPagination(currentPage);
  const pageCount = Math.ceil(promotionData.length / 10);
  

  if (currentPage > pageCount) {
    return <NotFound />;
  }
  return (
    <>
      <AllPromo allpromo={promoData} />
      <PromoPagination pageCount={pageCount} currentPage={currentPage} />
    </>
  );
}

export async function generateMetadata() {
  return generatePageMetadata(getMetaPromoPage);
}
