import {
  getBreadCrumbs,
  getCardProduct,
  getSimilarProduct,
} from "@/api/requests";
import ItemPage from "@/components/Item/Item";
import DynamicJsonLd from "@/utils/jsonld";
import { Metadata } from "next";
interface Params {
  params: { path: string };
}

export default async function item({ params: { path } }: Params) {
  const data = await getCardProduct(path[0]);

  const [breadCrumbs, similarData] = await Promise.all([
    getBreadCrumbs(data.items.id_cat),
    getSimilarProduct(path[0]),
  ]);

  return (
    <>
      <DynamicJsonLd meta={data.meta} data={data.items} />
      <ItemPage
        // banner={banner}
        data={data}
        similar={similarData}
        breadCrumbs={breadCrumbs}
      />
    </>
  );
}

export async function generateMetadata({
  params: { path },
}: Params): Promise<Metadata> {
  try {
    const data = await getCardProduct(path[0]);

    // Check if data.meta.title exists and fallback to a default value if it doesn't
    const title = data.meta.title;
    const ogtitle = data.meta.og_title;
    const description = data.meta.description;
    const ogdescription = data.meta.og_description;
    const keywords = data.meta.keywords || "";
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
    // If an error occurs, return default metadata or handle it accordingly
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
