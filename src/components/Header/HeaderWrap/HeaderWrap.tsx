"use server";
import { getCatalogsMenu } from "@/api/requests";
import Header from "../Header";
import dynamic from "next/dynamic";

export default async function HeaderWrap() {
  const MobileNav = dynamic(
    () => import("@/components/MobileMenu/MobileNav/MobileNav")
  );
  try {
    const catalogs = await getCatalogsMenu();
    return (
      <>
        <Header catalog={catalogs} />
        <MobileNav catalog={catalogs} />
      </>
    );
  } catch (error) {
    console.log(`Error in HeaderWrap: ${error}`);
  }
}
