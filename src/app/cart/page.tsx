import { getMetaKorzinaPage } from "@/api/requests";
import Basket from "@/components/BasketComponents/Basket";
import ClientSearchHistory from "@/components/UI/Cookies/Cooke/Cooke";
import SearchComponent from "@/components/UI/Cookies/Cookies";
import { generatePageMetadata } from "@/utils/metadata";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies();
  const searchHistory: string[] = JSON.parse(
    cookieStore.get("searchHistory")?.value || "[]"
  );

  return (
    <>
      <SearchComponent />
      <h1>Your Search History</h1>
      <ClientSearchHistory searchHistory={searchHistory} />
      <Basket />
    </>
  );
}

export async function generateMetadata() {
  return generatePageMetadata(getMetaKorzinaPage);
}
