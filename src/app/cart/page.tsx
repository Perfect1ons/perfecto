import { getMetaKorzinaPage, getSposobOplaty } from "@/api/requests";
import Basket from "@/components/BasketComponents/Basket";
import { generatePageMetadata } from "@/utils/metadata";
import { cookies } from "next/headers";

export default async function Page() {
  const cookieStore = cookies();
  const userId = cookieStore.get("userId")?.value;

  const sposobOplaty = await getSposobOplaty(userId);

  return <Basket variants={sposobOplaty} />;
}

export async function generateMetadata() {
  return generatePageMetadata(getMetaKorzinaPage);
}
