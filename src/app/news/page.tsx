import { getMetaNewsPage, getNews } from "@/api/requests";
import AllNews from "@/components/HomeComponents/News/AllNews/AllNews";
import { generatePageMetadata } from "@/utils/metadata";

export default async function news() {
  const newsData = await getNews();
  // {searchParams: {page}}

  return <AllNews allnews={newsData} />;
}

export async function generateMetadata() {
  return generatePageMetadata(getMetaNewsPage);
}