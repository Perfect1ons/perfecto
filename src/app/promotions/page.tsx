import { getMetaPromoPage, getPromotion } from "@/api/requests";
import AllPromo from "@/components/HomeComponents/Promotion/AllPromo/AllPromo";
import { generatePageMetadata } from "@/utils/metadata";
import { Suspense } from "react";

export default async function promotions() {
  const delayedPromotionData = await getPromotion();
  return (
    <Suspense>
      <AllPromo allpromo={delayedPromotionData} />
    </Suspense>
  );
}

export async function generateMetadata() {
  return generatePageMetadata(getMetaPromoPage);
}
