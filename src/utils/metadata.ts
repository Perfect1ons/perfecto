import { Metadata } from "next";

export async function generatePageMetadata(getMetaData: () => Promise<Metadata>) {
  const data = await getMetaData();
  const title = data.title;
  const description = data.description;
  const keywords = data.keywords;
  const url = "https://max.kg/";
  const image = "https://max.kg/images/mobile-logo-colorized.svg";

  return {
    title: title,
    description: description,
    keywords: keywords,
    robots: "index, follow",
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
