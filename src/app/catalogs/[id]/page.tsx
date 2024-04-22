import { getSubCatalogs } from "@/api/requests";
import Catalogs from "../page";

interface Params {
  params: { id: number };
}

export default async function page({ params: { id } }: Params) {
  const data = await getSubCatalogs(id);
  return (
    <div>
      <Catalogs catalog={data} />
    </div>
  );
}
