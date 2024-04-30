"use client";
import styles from "./style.module.scss";
import cn from "clsx";
import TextTruncate from "../../UI/TruncatedText/TruncatedText";
import { IFooter, IFooterItem } from "@/types/footerRequest";
import { useEffect, useState } from "react";
import useMediaQuery from "@/hooks/useMediaQuery";
import Image from "next/image";
import Link from "next/link";
import { ITruncate } from "@/types/truncatedText";

interface IFooterSectionProps {
  links: IFooterItem[];
  text: ITruncate;
}

const FooterSection = ({ links, text }: IFooterSectionProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [openSectionId, setOpenSectionId] = useState<number | null>(null);
  const [currentYear, setCurrentYear] = useState<number>(
    new Date().getFullYear()
  );
  const isMobile = useMediaQuery("(max-width: 1200px)");

  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentYear(new Date().getFullYear());
    }, 60000);
    return () => clearInterval(interval);
  }, []);

  const openToggler = (itemId: number) => {
    if (isMobile) {
      setOpenSectionId(openSectionId === itemId ? null : itemId);
      setIsOpen(!isOpen);
    }
  };

  return (
    <footer className={cn(styles.footer)}>
      <nav className={cn(styles.footerNav, "container")}>
        {!isMobile &&
          links.map((item) => {
            return (
              <div key={item.id} className={styles.footerNavItem}>
                <div className={styles.footerNavItemTitleContainer}>
                  <h6 className={styles.footerNavItemTitle}>{item.name}</h6>
                  <Image
                    className={cn(
                      styles.footerNavItemArrowIsActive,
                      isOpen && styles.footerNavItemArrow
                    )}
                    src="/img/footerArrow.svg"
                    width={30}
                    height={30}
                    alt="footerArrow"
                  />
                </div>
                <div
                  className={cn(
                    styles.footerNavItemContainer,
                    !isOpen && styles.hidden
                  )}
                >
                  {item.pod_menu.map((podItem) => {
                    const url = podItem.url.startsWith("https://")
                      ? podItem.url
                      : `/page/${podItem.url}`;

                    return (
                      <div
                        key={podItem.id}
                        className={styles.footerNavItemLinks}
                      >
                        <Link className={styles.footerNavItemLink} href={url}>
                          {podItem.naim}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        {isMobile &&
          links.map((item) => {
            const isOpen = openSectionId === item.id;
            return (
              <div key={item.id} className={styles.footerNavItem}>
                <div
                  onClick={() => openToggler(item.id)}
                  className={styles.footerNavItemTitleContainer}
                >
                  <h6 className={styles.footerNavItemTitle}>{item.name}</h6>
                  <Image
                    className={cn(
                      styles.footerNavItemArrowIsActive,
                      isOpen && styles.footerNavItemArrow
                    )}
                    src="/img/footerArrow.svg"
                    width={30}
                    height={30}
                    alt="footerArrow"
                  />
                </div>
                <div
                  className={cn(
                    styles.footerNavItemContainer,
                    !isOpen && styles.hidden
                  )}
                >
                  {item.pod_menu.map((podItem) => {
                    const url = podItem.url.startsWith("https://")
                      ? podItem.url
                      : `/page/${podItem.url}`;

                    return (
                      <div
                        key={podItem.id}
                        className={styles.footerNavItemLinks}
                      >
                        <Link className={styles.footerNavItemLink} href={url}>
                          {podItem.naim}
                        </Link>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </nav>
      <div className={cn(styles.footerDescBlock, "container")}>
        <p className={styles.footerDescBlockTitle}>{text.model.text}</p>
        <div className={styles.textTruncate}>
          <TextTruncate text={text.model.text} maxLength={248} />
        </div>
        <hr className={styles.footerDescBlockHr} />
        <p className={styles.footerDescBlockCOPYRIGHT}>
          Авторские права © max.kg 2016-{currentYear} — Все права защищены
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
