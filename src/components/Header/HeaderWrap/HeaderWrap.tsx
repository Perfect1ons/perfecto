"use server";
import { getCatalogsMenu } from "@/api/requests";
import Header from "../Header";

export default async function HeaderWrap() {
  const catalogs = await getCatalogsMenu();
  return (
    <>
      <Header catalog={catalogs} />
    </>
  );
}
