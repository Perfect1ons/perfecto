import { getNewsById } from "@/api/requests";
import Application from "@/components/HomeComponents/Application/Application";
import NewsById from "@/components/HomeComponents/News/NewsById/NewsById";


export async function generateMetadata({ params: { id } }: any) {
    const data = await getNewsById(id);
    const title = data.news.naim
    return {
        title: title
    }
}

export default async function IDPage({ params: { id } }: any) {
  const data = await getNewsById(id);
  return (
    <>
      <NewsById news={data.result} main={data.news} />
      <Application/>
    </>
  );
}
