"use client"
import { IFooterPage } from '@/types/footerPagesRequest/footerPages';
import { IFooterItem } from '@/types/footerRequest';
import React, { useEffect, useState } from 'react'
import styles from "./style.module.scss"
import LinksSidebar from '@/components/UI/LinksSidebar/LinksSidebar';
import Link from 'next/link';
import cn from "clsx"
interface IAboutCompanyProps {
    data: IFooterPage | undefined;
    links: IFooterItem[];
    breadcrumb: string | undefined
}

const FooterPage = ({ data, links, breadcrumb }: IAboutCompanyProps) => {

    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
    }, []);

    if (!data || !data.model || !data.model.text || (data.model.url && data.model.url.startsWith("socseti/"))) {
        return null;
    }

    const html = data.model.text.split("</p>\r\n<p>");


    const filterBreadcrumb = () => {
        return links.filter(item => item.pod_menu.some(subitem => subitem.url === breadcrumb));
    }
    
    const breadcrumbNames = filterBreadcrumb().map(item => {
        const subitem = item.pod_menu.find(subitem => subitem.url === breadcrumb);
        return subitem ? subitem.naim : ''; // Возвращаем только naim подходящего элемента или пустую строку, если элемент не найден
    });
    return (
        <div className='container'>
          <div className="all__directions">
          <Link href={"/"} className="all__directions_link">
            Главная
          </Link>
          <Link
            href={"/news"}
            className={cn(
              "all__directions_link",
                "all__directions_linkActive"
            )}
          >
           {breadcrumbNames.join(', ')}
          </Link>
        </div>
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
        </div>
    )
}

export default FooterPage
