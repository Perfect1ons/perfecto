import { IListItem } from "@/app/catalog/page";
import React from "react";
import styles from "./style.module.scss";

interface IOptionsProps {
  options: IListItem[];
}

const CatalogOptions: React.FC<IOptionsProps> = ({ options }) => {
  return (
    <section className={styles.section}>
      {options.map((section, index) => (
        <div className={styles.content_wrap} key={index}>
          <h2 className={styles.sectionTitle}>{section.title}</h2>
          <ul>
            {section.items.map((item, itemIndex) => (
              <li key={itemIndex}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
    </section>
  );
};

export default CatalogOptions;
