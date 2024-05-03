"use client";
import { useState, useEffect } from "react";
import { IFooterPage } from "@/types/footerPagesRequest/footerPages";
import styles from "./style.module.scss";
import LinksSidebar from "../LinksSidebar/LinksSidebar";
import { IFooterItem } from "@/types/footerRequest";

interface IAboutCompanyProps {
  data: IFooterPage | undefined;
  links: IFooterItem[];
}
const FooterPageRenderer = ({ data, links }: IAboutCompanyProps) => {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!data || !data.model.text) {
    return null;
  }
  const html = data.model.text.split("</p>\r\n<p>");
  return (
    <div className={styles.aboutCompany}>
      <div className={styles.aboutCompanyLinksBar}>
        <LinksSidebar links={links} />
      </div>
      <div className={styles.aboutCompanyInfo}>
        {isClient &&
          html.map((paragraph: string, index: number) => (
            <div
              className={styles.aboutCompanyItem}
              key={index}
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
      </div>
    </div>
  );
};

export default FooterPageRenderer;
