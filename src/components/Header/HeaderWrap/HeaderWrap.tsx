"use server";
import { getCatalogsMenu } from "@/api/requests";
import Header from "../Header";

export default async function HeaderWrap() {
  try {
    const catalogs = await getCatalogsMenu();
    return (
      <>
        <Header catalog={catalogs} />
      </>
    );
  } catch (error) {
    console.log(error);
  }
}
