"use client";
import React from "react";
import styles from "./style.module.scss";
import Link from "next/link";
import { IFooterAccordionProps } from "@/components/UI/FooterAccordion/FooterAccordion";

const CatalogNav = ({ links, title }: IFooterAccordionProps) => {
  return (
    <div className={styles.content_wrap}>
      <h2 className={styles.sectionTitle}>{title}</h2>
      <ul className={styles.list}>
        {links.map((item) => (
          <li key={item.id}>
            <Link className={styles.link} href={item.href}>
              <span>{item.content}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CatalogNav;
