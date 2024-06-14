import { getMetaPromoPage, getPromotion } from "@/api/requests";
import AllPromo from "@/components/HomeComponents/Promotion/AllPromo/AllPromo";
import { generatePageMetadata } from "@/utils/metadata";
import ErrorPage from "@/components/ErrorPage/ErrorPage"; // импортируем компонент для отображения ошибок
import { Suspense } from "react";

export default async function Promotions() {
  try {
    const promotionData = await getPromotion();
    const metadata = await generatePageMetadata(getMetaPromoPage);

    return (
      <Suspense>
        <AllPromo allpromo={promotionData} />
      </Suspense>
    );
  } catch (error) {
    console.error("Error fetching promotion data:", error);
    return <ErrorPage />;
  }
}

export async function generateMetadata() {
  return generatePageMetadata(getMetaPromoPage);
}
