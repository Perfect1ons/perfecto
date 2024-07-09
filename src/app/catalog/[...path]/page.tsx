import {
  getBreadCrumbs,
  getCatalogBanner,
  getCatalogProductsFiltersServer,
  getCatalogsProducts,
} from "@/api/requests";
import NotFound from "@/app/not-found";
import Catalogs from "@/components/Catalog/Catalog";
import CatalogDynamicJsonLd from "@/utils/JsonLd/CatalogPageJsonLd/CatalogPageJsonLd";

import { Metadata as NextMetadata } from "next";

interface Metadata extends NextMetadata {
  canonical?: string;
}

interface Params {
  params: { path: string | string[] };
}

interface NewsProps {
  searchParams: {
    page?: string;
    path?: string;
  };
  params: { path: string | string[] };
}

export default async function page({
  searchParams,
  params: { path },
}: NewsProps) {
  try {
    let fullPath: string;
    if (Array.isArray(path)) {
      // Если path является массивом строк, объединяем их в одну строку
      fullPath = path.join("/");
    } else {
      // Если path уже является строкой, используем его как есть
      fullPath = path;
    }
  const currentPage = parseInt(searchParams.page || "1", 10);

    const catalogs = await getCatalogsProducts(fullPath);
    const breadCrumbs = await getBreadCrumbs(catalogs.category.id);
    const banner = await getCatalogBanner();
    const conditionals = await getCatalogProductsFiltersServer(fullPath, currentPage)
    
    if (conditionals.category.tov.length > 0) {
      return (
        <>
          <h1>{fullPath} path</h1>
          <h1>{searchParams.page} page</h1>
          <CatalogDynamicJsonLd meta={catalogs.meta} data={catalogs} />
          <Catalogs
            banner={banner}
            catalog={catalogs}
            path={fullPath}
            breadCrumbs={breadCrumbs}
          />
        </>
      );
    }
        if (conditionals.totalCount == 0) {
          return (
            <>
              <h1>{fullPath} path</h1>
              <h1>{searchParams.page} page</h1>
              <CatalogDynamicJsonLd meta={catalogs.meta} data={catalogs} />
              <Catalogs
                banner={banner}
                catalog={catalogs}
                path={fullPath}
                breadCrumbs={breadCrumbs}
              />
            </>
          );
        }
    
    return <NotFound/>
  } catch (error) {
    console.error("Ошибка при загрузке данных каталога:", error);
    return (
      <div>
        Ошибка при выборе каталогов. Пожалуйста, повторите попытку позже.
      </div>
    );
  }
}

export async function generateMetadata({
  params: { path },
}: Params): Promise<Metadata> {
  let fullPath: string;
  if (Array.isArray(path)) {
    fullPath = path.join("/");
  } else {
    fullPath = path;
  }
  try {
    const data = await getCatalogsProducts(fullPath);
    const title = data.meta.title;
    const ogtitle = data.meta.og_title;
    const description = data.meta.description;
    const ogdescription = data.meta.og_description;
    const keywords = data.meta.keywords || "";
    const canonical = `/catalog/${path[0]}/${path[1]}`;
    const url = `https://max.kg/item/${path[0]}`;
    const image =
      data.meta.og_img || "https://max.kg/images/mobile-logo-colorized.svg";
    return {
      title: title,
      description: description,
      keywords: keywords,
      robots: "index, follow",
      openGraph: {
        title: ogtitle || title, // Fallback to title if og_title is not defined
        description: ogdescription || description, // Fallback to description if og_description is not defined
        url: url,
        images: [
          {
            url: image,
            width: 800,
            height: 600,
            alt: title,
          },
        ],
        type: "article",
      },
      canonical: canonical,
    };
  } catch (error) {
    console.error("Ошибка при генерации метаданных:", error);
    return {
      title: "Default Title",
      description: "",
      keywords: "",
      robots: "index, follow",
      openGraph: {
        title: "Default Title",
        description: "",
        url: "",
        images: [
          {
            url: "https://max.kg/images/mobile-logo-colorized.svg",
            width: 800,
            height: 600,
            alt: "Default Title",
          },
        ],
        type: "article",
      },
      canonical: "",
    };
  }
}
