import { getCatalogsMenu} from "@/api/requests";
import { MetadataRoute } from "next";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const catalogsData = await getCatalogsMenu();
  
  const catalogsEntries = catalogsData.map((catalog) => ({
    url: `${process.env.NEXT_PUBLIC_BASE_URL}/catalog/${catalog.full_slug}`,
    lastModified: new Date(),
    priority: 0.6, // Приоритет может быть задан по вашему усмотрению
  }));

  const subCatalogsEntries = catalogsData.flatMap((catalog) =>
    catalog.child_level2.map((level) => ({
      url: `${process.env.NEXT_PUBLIC_BASE_URL}/catalog/${level.full_slug}`,
      lastModified: new Date(),
      priority: 0.5, // Приоритет может быть задан по вашему усмотрению
    }))
  );


  return [
    {
      url: `${process.env.NEXT_PUBLIC_BASE_URL}`,
      lastModified: new Date(),
      priority: 1
    },
    ...catalogsEntries,
    ...subCatalogsEntries,
  ];
}
