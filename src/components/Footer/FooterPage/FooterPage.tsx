"use client";
import { IFooterPage } from "@/types/footerPagesRequest/footerPages";
import { IFooterItem } from "@/types/footerRequest";
import React from "react";
import styles from "./style.module.scss";
import LinksSidebar from "@/components/UI/LinksSidebar/LinksSidebar";
import Link from "next/link";
import cn from "clsx"
import DOMPurify from "isomorphic-dompurify";

interface IAboutCompanyProps {
  data: IFooterPage;
  links: IFooterItem[];
  breadcrumb: string | undefined;
}

const FooterPage = ({ data, links, breadcrumb }: IAboutCompanyProps) => {
  const textHtml = DOMPurify.sanitize(data?.model.text);

  const filterBreadcrumb = () => {
    return links.filter((item) =>
      item.pod_menu.some((subitem) => subitem.url === breadcrumb)
    );
  };

  const breadcrumbNames = filterBreadcrumb().map((item) => {
    const subitem = item.pod_menu.find((subitem) => subitem.url === breadcrumb);
    return subitem ? subitem.naim : "";
  });

  return (
    <div className="container">
      <div className="all__directions">
        <Link href={"/"} className="all__directions_link">
          Главная
        </Link>
        <Link
          href={`/page/${breadcrumb}`}
          className={cn("all__directions_link", "all__directions_linkActive")}
        >
          {breadcrumbNames.join(", ")}
        </Link>
      </div>
      <div className={styles.wrap}>
        <LinksSidebar links={links} />
        <div
          className="wrapInfoItem"
          dangerouslySetInnerHTML={{ __html: textHtml }}
        />
      </div>
    </div>
  );
};

export default FooterPage;
