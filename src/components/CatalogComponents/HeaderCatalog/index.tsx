import { getCatalogsMenu } from "@/api/requests";
import CatalogMenu from "./CatalogMenu";

export default async function IMenu() {
  const menu = await getCatalogsMenu();
  return <CatalogMenu catalog={menu} />;
}
