"use client"
import { useState, useEffect } from 'react'
import { IFooterPage } from "@/types/footerPagesRequest/footerPages"
import styles from "./style.module.scss"
import LinksSidebar from "../UI/LinksSidebar/LinksSidebar";
import {  IFooterItem } from "@/types/footerRequest";

interface IAboutCompanyProps {
    about: IFooterPage | undefined;
    links: IFooterItem[];
}
const OKompanii = ({about, links}: IAboutCompanyProps) => {
    const [isClient, setIsClient] = useState(false)

    useEffect(() => {
        setIsClient(true)
      }, [])


    if (!about || !about.model.text) {
        return null;
    }
    const paragraphs = about.model.text.split('</p>\r\n<p>');
  return (
    <div className={styles.aboutCompany}>
        <div className={styles.aboutCompanyLinksBar}>
            <LinksSidebar links={links}/>
        </div>
        <div className={styles.aboutCompanyInfo}>
            {isClient && paragraphs.map((paragraph: string, index: number) => (
                    <p className={styles.aboutCompanyItem} key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
        </div>
    </div>
  )
}

export default OKompanii