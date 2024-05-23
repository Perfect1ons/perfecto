import { getMetaKorzinaPage } from "@/api/requests";
import { generatePageMetadata } from "@/utils/metadata";

export default function page() {
  return <div>cart page</div>;
}

export async function generateMetadata() {
  return generatePageMetadata(getMetaKorzinaPage);
}
