import styles from "./style.module.scss";

import { IFiltersBrand } from "@/types/filtersBrand";

interface IProps {
  filter: IFiltersBrand;
}
const AllFilters = ({ filter }: IProps) => {
  return (
    <div className={styles.div}>
      {filter &&
        filter.filter &&
        Object.values(filter.filter).map((item) => (
          <ul key={item.type_name}>
            <li>{item.type_name}</li>
            {filter &&
              filter.filter &&
              Object.values(item.filter).map((subItem: any) => (
                <li key={subItem.id_filter}>
                  {subItem.name} ({subItem.kol})
                </li>
              ))}
          </ul>
        ))}
    </div>
  );
};

export default AllFilters;
