"use server";
import { getCatalogsMenu } from "@/api/requests";
import Header from "../Header";

export default async function HeaderWrap() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const catalogs = await getCatalogsMenu();
  return (
    <>
      <Header catalog={catalogs} />
    </>
  );
}
