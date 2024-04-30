import { getCatalogs, getSubCatalogs } from "@/api/requests";
import AllProducts from "@/components/CatalogComponents/AllProducts/AllProducts";
import CatalogOptions from "@/components/CatalogComponents/CatalogOptions/CatalogOptions";
import CatalogPageMain from "@/components/CatalogComponents/CatalogPageName/CatalogPageMain";

import {
  linksClients,
  linksCompany,
  linksHelp,
  linksPartners,
  linksSocials,
} from "@/components/Footer/FooterSection/FooterSection";

export interface IListItem {
  id: number;
  href: string;
  content: string;
}

export default async function catalog() {
  const catalogs = await getCatalogs();
  const category = await getSubCatalogs(2000000464);

  return (
    <CatalogPageMain>
      <CatalogOptions
        links={linksCompany}
        clients={linksClients}
        help={linksHelp}
        partners={linksPartners}
        socials={linksSocials}
      />
      {/* <HeaderCatalog catalog={catalogs} /> */}
      <AllProducts catalog={catalogs} category={category} />
    </CatalogPageMain>
  );
}
