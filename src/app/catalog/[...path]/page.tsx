import {
  getBreadCrumbs,
  getCatalogBanner,
  getCatalogProductsFilteredByAbdulaziz,
  getCatalogsProducts,
} from "@/api/requests";
import Catalogs from "@/components/Catalog/Catalog";
interface Params {
  params: { path: string | string[] };
}

export default async function page({ params: { path } }: Params) {
  try {
    let fullPath: string;
    if (Array.isArray(path)) {
      // Если path является массивом строк, объединяем их в одну строку
      fullPath = path.join("/");
    } else {
      // Если path уже является строкой, используем его как есть
      fullPath = path;
    }
    try {
      const catalogs = await getCatalogsProducts(fullPath);
      const breadCrumbs = await getBreadCrumbs(catalogs.category.id);
      const init = await getCatalogProductsFilteredByAbdulaziz(
        catalogs.category.id
      );
      const banner = await getCatalogBanner();
      return (
        <Catalogs
          init={init}
          banner={banner}
          catalog={catalogs}
          path={fullPath}
          breadCrumbs={breadCrumbs}
        />
      );
    } catch (error) {
      console.error("Ошибка:", error);
      return (
        <div>
          Ошибка при выборе каталогов. Пожалуйста, повторите попытку позже.
        </div>
      );
    }
  } catch (error) {
    console.error("Ошибка:", error);
    return <div>Произошла ошибка. Пожалуйста, попробуйте еще раз позже.</div>;
  }
}

export async function generateMetadata({ params: { path } }: Params) {
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
    };
  } catch (error) {
    console.error("Error occurred while generating metadata:", error);
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
    };
  }
}
