import { getDiscountsPageOne, getDiscountsPageTwo, getMetaSkidPage } from "@/api/requests";
import AllDiscounts from "@/components/HomeComponents/Discounts/AllDiscounts/AllDiscounts";
import { generatePageMetadata } from "@/utils/metadata";
import { Suspense } from "react";

export default async function page() {
  const [discountsOne, discountsTwo] = await Promise.all([
    getDiscountsPageOne(),
    getDiscountsPageTwo(),
    ,
  ]);

  return (
    <>
      <Suspense>
        <AllDiscounts discountsOne={discountsOne} discountsTwo={discountsTwo} />
      </Suspense>
    </>
  );
}

export async function generateMetadata() {
  return generatePageMetadata(getMetaSkidPage);
}