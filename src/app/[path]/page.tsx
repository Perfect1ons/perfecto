import { getSearchItem } from "@/api/requests";
import Seek from "@/components/Seek/Seek";
import NotFounded from "@/components/NotFound/NotFound";

export default async function PathPage({ params: { path } }: any) {
  const decodedPath = decodeURIComponent(path);
  const data = await getSearchItem(decodedPath);

  // Проверка наличия данных в ответе
  if (!data || (!data.catalog && !data.model)) {
    return <NotFounded />;
  }

  return <Seek catalog={data.catalog} product={data.model} />;
}
