import {
  getBreadCrumbs,
  getCardProduct,
  getSimilarProduct,
} from "@/api/requests";
import ItemPage from "@/components/Item/Item";
import ItemMainSkeleton from "@/components/Item/ItemMainSkeleton/ItemMainSkeleton";
import { Metadata } from "next";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";

const DynamicJsonLd = dynamic(() => import("@/utils/jsonld"));
const DynamicItemPage = dynamic(() => import("@/components/Item/Item"), {
  loading: () => <ItemMainSkeleton/>
})

interface Params {
  params: { path: string };
}

export default async function item({ params: { path } }: Params) {
  const data = await getCardProduct(path[0]);
  const cookieStore = cookies();
  const authToken = cookieStore.get("identify")?.value;
  const cart = cookieStore.get("cart")?.value;
  const match = cart?.match(/s:7:"cart_id";i:(\d+)/);
  const cartId = match && match[1];

  try {
    const breadCrumbs = await getBreadCrumbs(data.items.id_cat);
    const similarData = await getSimilarProduct(path[0]);

    return (
      <>
        <DynamicJsonLd meta={data.meta} data={data.items} />
        <DynamicItemPage
          authToken={authToken}
          data={data}
          similar={similarData}
          breadCrumbs={breadCrumbs}
          id_cart={cartId}
        />
      </>
    );
  } catch (error) {
    console.log(error);
  }
  return (
    <>
      <DynamicJsonLd meta={data.meta} data={data.items} />
      <DynamicItemPage authToken={authToken} data={data} />
    </>
  );
}

export async function generateMetadata({
  params: { path },
}: Params): Promise<Metadata> {
  try {
    const data = await getCardProduct(path[0]);
    const title = data.meta.title;
    const ogtitle = data.meta.og_title;
    const description = data.meta.description;
    const ogdescription = data.meta.og_description;
    const keywords = data.meta.keywords || "";
    const canonical = `https://max.kg/item/${data.items.id_tov}/${data.items.url}`; // Canonical URL
    const url = `https://max.kg/item/${path[0]}`;
    const image =
      data.meta.og_img || "https://max.kg/images/mobile-logo-colorized.svg";

    return {
      title: title,
      description: description,
      keywords: keywords,
      robots: "index, follow",
      alternates: {
        canonical: canonical,
      },
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
