import React from "react";
import { ChevronRightIconCatalog } from "../../../../public/Icons/Icons";
import Link from "next/link";
import styles from "./style.module.scss";

interface Props {
  item: any;
  isActive: boolean;
  onMouseEnter: (id: number) => void;
  onClick: (slug: string) => void;
}

const MemoizedCatalogItem: React.FC<Props> = React.memo(function CatalogItem({
  item,
  isActive,
  onMouseEnter,
  onClick,
}) {
  return (
    <div
      className={`${styles.catalogLinkContainer} ${
        isActive ? styles.catalogActive : ""
      }`}
      onMouseEnter={() => onMouseEnter(item.id)}
    >
      <span className={styles.triangle}></span>
      <Link
        href={`/catalog/${item.full_slug}`}
        className={styles.catalogs__h2}
        onClick={() => onClick(item.full_slug)}
      >
        {item.name}
        <span className={styles.chevronRightIconCatalog}>
          {ChevronRightIconCatalog()}
        </span>
      </Link>
    </div>
  );
});

MemoizedCatalogItem.displayName = "MemoizedCatalogItem";

export default MemoizedCatalogItem;
