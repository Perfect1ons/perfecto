import { getDiscountsPageOne, getDiscountsPageTwo } from "@/api/requests";
import dynamic from "next/dynamic";

const AllDiscount = dynamic(() => import("@/components/HomeComponents/Discounts/AllDiscounts/AllDiscounts"));
const App = dynamic(
  () => import("@/components/HomeComponents/Application/Application")
);

export default async function page() {
  const [discountsOne, discountsTwo] = await Promise.all([
    getDiscountsPageOne(),
    getDiscountsPageTwo(),
  ]);

  return (
    <>
      <AllDiscount discountsOne={discountsOne} discountsTwo={discountsTwo} />
      <App />
    </>
  );
}
