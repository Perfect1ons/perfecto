import { getMetaPopularPage, getPopularGoods } from "@/api/requests";
import AllPopularGoods from "@/components/HomeComponents/PopularGoods/AllPopularGoods/AllPopularGoods";
import { generatePageMetadata } from "@/utils/metadata";
import ErrorPage from "@/components/ErrorPage/ErrorPage"; // Импортируем компонент для отображения ошибок

export default async function PopularPage() {
  try {
    const allGoodsData = await getPopularGoods(1);
    return <AllPopularGoods goods={allGoodsData} />;
  } catch (error) {
    console.error("Error fetching popular goods:", error);
    return <ErrorPage />;
  }
}

export async function generateMetadata() {
  try {
    return generatePageMetadata(getMetaPopularPage);
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Error",
      description: "An error occurred while generating metadata.",
      keywords: "error",
    };
  }
}
