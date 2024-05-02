import React, { useState } from "react";
import Image from "next/image";
import MobileSubCatalog from "../MobileSubCatalog/MobileSubCatalog";
import { useRouter } from "next/router";

import { MobNavProps } from "../MobileNav/MobileNav";

import styles from "./style.module.scss";

export default function MobileCatalog({ catalog }: MobNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const open = () => {
    setIsOpen(!isOpen);
  };

  // для роутинга
  // const router = useRouter();

  // при нажатии ведет на подкаталоги
  // const handleClick = (id: number) => {
  //   router.push(`/catalogs/${id}`);
  //   close();
  // };

  return (
    <>
      <div className={styles.grid}>
        <MobileSubCatalog open={isOpen} close={open} catalog={catalog} />
        {catalog.map((item) => {
          return (
            <div className={styles.grid_wrap} key={item.id}>
              <div className={styles.grid_item} onClick={open}>
                <div className={styles.item_title}>
                  <span>{item.name}</span>
                </div>
                <Image
                  src={
                    item.icon
                      ? `https://max.kg/${item.icon}`
                      : "https://max.kg/images/discount/empty-image.png"
                  }
                  width={100}
                  height={100}
                  alt={item.name}
                  className={styles.grid_img}
                />
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}
