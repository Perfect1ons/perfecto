"use server";
import MobileNav from "./MobileNav/MobileNav";

import styles from "./style.module.scss";

export default async function MobileMenu() {
  return (
    <>
      <MobileNav />
    </>
  );
}
