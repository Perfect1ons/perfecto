"use server";
import { getCatalogsMenu } from "@/api/requests";
import MobileNav from "./MobileNav/MobileNav";

import styles from "./style.module.scss";

// пометил серверной чтоб передать fetch запрос дальше
export default async function MobileMenu() {
  const catalogs = await getCatalogsMenu();

  return <MobileNav catalog={catalogs} />;
}
