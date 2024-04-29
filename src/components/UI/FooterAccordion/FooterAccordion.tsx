
import styles from "./style.module.scss";
import cn from "clsx";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";
import useMediaQuery from "@/hooks/useMediaQuery";
import { IFooterItem } from "@/types/footerRequest";

export interface IFooterAccordionProps {
  links: IFooterItem[];
  title: string;
}

const FooterAccordion = ({ links, title }: IFooterAccordionProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const isMobile = useMediaQuery("(max-width: 1200px)");

  useEffect(() => {
    setIsOpen(!isMobile);
  }, [isMobile]);

  const openToggler = () => {
    if (isMobile) {
      setIsOpen(!isOpen);
    }
  };

  return (
    <div className={styles.footerNavItem}>
      <div onClick={openToggler} className={styles.footerNavItemTitleContainer}>
        <h6 key={title} className={styles.footerNavItemTitle}>
          {title}
        </h6>
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
        className={cn(styles.footerNavItemContainer, !isOpen && styles.hidden)}
      >
        {links.map((item) => {
          return (
            <div key={item.id} className={styles.footerNavItemLinks}>
              <Link className={styles.footerNavItemLink} href={item.href}>
                {item.content}
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FooterAccordion;
