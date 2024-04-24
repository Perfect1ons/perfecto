"use server";

import { getCatalogs, getSubCatalogs } from "@/api/requests";
import Header from "../Header";

export default async function HeaderWrap() {
  const catalogs = await getCatalogs();
  // const id = catalogs.filter((item) => item.id);

  // на дочерниe каталоги главных каталогов
  const category = await getSubCatalogs(2000000464);
  // console.log(category);

  return (
    <>
      <Header catalog={catalogs} category={category} />
    </>
  );
}
