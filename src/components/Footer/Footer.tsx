import { getFooter } from "@/api/requests";
import FooterSection from "./FooterSection/FooterSection";

export default async function Footer() {
    const footerData = getFooter();
    return(
        <></>
        // <FooterSection links={footerData}/>
    )
}