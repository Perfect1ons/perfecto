import { getCatalogsMenu } from "@/api/requests";
import Catalogs from "../page";

interface Params {
  params: { path: string };
}

export default async function page({ params: { path } }: Params) {
  const catalogs = await getCatalogsMenu();
  return (
    <div>
      <Catalogs catalog={catalogs} path={path} />
    </div>
  );
}
