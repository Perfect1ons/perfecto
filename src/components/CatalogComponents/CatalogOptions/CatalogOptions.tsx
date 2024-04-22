import { IListItem } from "@/app/catalog/page";
import React from "react";
import styles from "./style.module.scss";
import CatalogNav from "./CatalogNav";

export interface IOptionsProps {
  links: IListItem[];
  clients: IListItem[];
  help: IListItem[];
  partners: IListItem[];
  socials: IListItem[];
}

const CatalogOptions: React.FC<IOptionsProps> = ({
  links,
  clients,
  help,
  partners,
  socials,
}) => {
  return (
    <nav className={styles.section}>
      <CatalogNav links={links} title="Компания" />
      <CatalogNav links={clients} title="Покупателям" />
      <CatalogNav links={help} title="Помощь" />
      <CatalogNav links={partners} title="Партнерам" />
      <CatalogNav links={socials} title="Мы в соцсетях" />
    </nav>
  );
};

export default CatalogOptions;
