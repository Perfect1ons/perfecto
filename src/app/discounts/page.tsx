import { getDiscountsPageOne, getDiscountsPageTwo } from "@/api/requests";
import Application from "@/components/HomeComponents/Application/Application";
import AllDiscounts from "@/components/HomeComponents/Discounts/AllDiscounts/AllDiscounts";

export default async function page() {
  const [discountsOne, discountsTwo] = await Promise.all([
    getDiscountsPageOne(),
    getDiscountsPageTwo(),
  ]);

  return (
    <>
      <AllDiscounts discountsOne={discountsOne} discountsTwo={discountsTwo} />
      <Application />
    </>
  );
}
