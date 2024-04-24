import { getDiscounts } from "@/api/requests";
import Application from "@/components/HomeComponents/Application/Application";
import AllDiscounts from "@/components/HomeComponents/Discounts/AllDiscounts/AllDiscounts";

export default async function page() {
  const discounts = await getDiscounts();
    
  return (
    <>
        <AllDiscounts discounts={discounts}/>
        <Application/>
    </>
  )
}
