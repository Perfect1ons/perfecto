import { getCatalogs, getSubCatalogs } from "@/api/requests";
import AllProducts from "@/components/CatalogComponents/AllProducts/AllProducts";
import CatalogOptions from "@/components/CatalogComponents/CatalogOptions/CatalogOptions";
import CatalogPageMain from "@/components/CatalogComponents/CatalogPageName/CatalogPageMain";
import HeaderCatalog from "@/components/CatalogComponents/HeaderCatalog/HeaderCatalog";
import {
  linksClients,
  linksCompany,
  linksHelp,
  linksPartners,
  linksSocials,
} from "@/components/Footer/Footer";

export interface IListItem {
  id: number;
  href: string;
  content: string;
}

export default async function catalog() {
  const catalogs = await getCatalogs();
  // const id = catalogs.filter((item) => item.id);
  const category = await getSubCatalogs(2000000464);
  // console.log(category);

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
