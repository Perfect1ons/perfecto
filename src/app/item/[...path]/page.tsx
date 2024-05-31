import { getBreadCrumbs, getCardProduct, getSimilarProduct } from "@/api/requests";
import ItemPage from "@/components/Item/Item";

interface Params {
  params: { path: string };
}

export async function generateMetadata({ params: { path } }: Params) {
    const data = await getCardProduct(path[0]);

  const title = data.meta.title;
  const description = data.meta.description;
  const keywords = data.meta.keywords;
  const url = "https://max.kg/";
  const image = "https://max.kg/images/mobile-logo-colorized.svg";

  return {
    title: title,
    description: description,
    keywords: keywords,
    openGraph: {
      title: title,
      description: description,
      url: url,
      images: [
        {
          url: image,
          width: 800,
          height: 600,
          alt: "Logo",
        },
      ],
      type: "article",
    },
  };
}


export default async function item({ params: { path } }: Params) {
    const data = await getCardProduct(path[0]);

    const [breadCrumbs, similarData] = await Promise.all([
      getBreadCrumbs(data.items.id_cat),
      getSimilarProduct(path[0])
    ]);

    return <ItemPage data={data.items} similar={similarData} breadCrumbs={breadCrumbs} />;
}
