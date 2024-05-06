"use client"
import { IFooterPage } from '@/types/footerPagesRequest/footerPages';
import { IFooterItem } from '@/types/footerRequest';
import React, { useEffect, useState } from 'react'
import styles from "./style.module.scss"
import LinksSidebar from '@/components/UI/LinksSidebar/LinksSidebar';
import NotFound from '../not-found';

interface IAboutCompanyProps {
    data: IFooterPage | undefined;
    links: IFooterItem[];
}

const FooterPage = ({ data, links }: IAboutCompanyProps) => {

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!data || !data.model || !data.model.text || (data.model.url && data.model.url.startsWith("socseti/"))) {
        return null;
    }

    const html = data.model.text.split("</p>\r\n<p>");

    return (
        <div className={styles.wrap}>
            <div className={styles.wrapSidebar}>
                <LinksSidebar links={links} />
            </div>
            <div className={styles.wrapInfo}>
                {isClient &&  
                    html.map((paragraph: string, index: number) => (
                        <div
                            className={styles.wrapInfoItem}
                            key={index}
                            dangerouslySetInnerHTML={{ __html: paragraph }}
                        />
                    ))}
            </div>
        </div>
    )
}

export default FooterPage
