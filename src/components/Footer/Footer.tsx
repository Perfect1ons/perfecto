import { getFooter, getFooterPages } from "@/api/requests";
import FooterSection from "./FooterSection/FooterSection";

export default async function Footer() {
    const footerData = await getFooter();
    
    const footerPageData = await getFooterPages();

    return(
        <FooterSection links={footerData} text={footerPageData}/>
    )
}