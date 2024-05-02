import { IFooterPage } from "@/types/footerPagesRequest/footerPages"
import styles from "./style.module.scss"

interface IAboutCompanyProps {
    about: IFooterPage | undefined;
}
const OKompanii = ({about}: IAboutCompanyProps) => {
    if (!about || !about.model.text) {
        return null;
    }
    const paragraphs = about.model.text.split('</p>\r\n<p>');
  return (
    <div className={styles.aboutCompany}>
        <aside className={styles.aboutCompanyLinksBar}></aside>
        <div className={styles.aboutCompanyInfo}>
            {paragraphs.map((paragraph: string, index: number) => (
                    <p className={styles.aboutCompanyItem} key={index} dangerouslySetInnerHTML={{ __html: paragraph }} />
                ))}
        </div>
    </div>
  )
}

export default OKompanii