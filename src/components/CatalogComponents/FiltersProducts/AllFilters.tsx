"use client";
import styles from "./style.module.scss";
import cn from "clsx";

import { IFiltersBrand } from "@/types/filtersBrand";
import { checkIcon } from "../../../../public/Icons/Icons";
import { useState } from "react";

interface IProps {
  filter: IFiltersBrand;
}
const AllFilters = ({ filter }: IProps) => {
  const [selectedBrands, setSelectedBrands] = useState<{
    [key: string]: boolean;
  }>({});
  return (
    <div className={styles.divAll}>
      {filter &&
        filter.filter &&
        Object.values(filter.filter).map((item) => (
          <ul key={item.type_name} className={styles.divAll__divUl}>
            <h5>{item.type_name}</h5>
            {filter &&
              filter.filter &&
              Object.values(item.filter).map((subItem: any) => (
                <ul
                  className={styles.showFiltersUlContainer}
                  key={subItem.id_filter}
                >
                  <span
                    className={cn(styles.showFiltersUlContainer__check, {
                      [styles.showFiltersUlContainer__checkActive]:
                        selectedBrands[item],
                    })}
                  >
                    {selectedBrands[item] && checkIcon()}
                  </span>
                  <li className={styles.showFiltersUlContainer__li}>
                    {subItem.name} ({subItem.kol})
                  </li>
                </ul>
              ))}
          </ul>
        ))}
    </div>
  );
};

export default AllFilters;
