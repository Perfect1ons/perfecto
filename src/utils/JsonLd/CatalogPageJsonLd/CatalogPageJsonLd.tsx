import { Items } from "@/types/CardProduct/cardProduct";
import { ICatalogsProducts } from "@/types/Catalog/catalogProducts";
import { IMetaData } from "@/types/MetaData/MetaData";

interface IMetaProps {
  meta: IMetaData;
  data: ICatalogsProducts;
}

const CatalogDynamicJsonLd = ({ meta, data }: IMetaProps) => {
  if (!meta || !data) return null;

  const jsonLdData: any = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: data.category.name,
    aggregateRating: {
      "@type": "AggregateRating",
      bestRating: "5",
      ratingCount: "11",
      ratingValue: "4.45",
    },
    offers: {
      "@type": "AggregateOffer",
      offerCount: data.totalCount,
      lowPrice: "1",
      highPrice: "85397",
      priceCurrency: "KGS",
      offers: data.category.tov
        ? data.category.tov.map((item) => ({
            "@type": "Offer",
            url: `${process.env.NEXT_PUBLIC_BASE_URL}/item/${item.art}/${item.url}`,
          }))
        : [],
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(jsonLdData),
      }}
    />
  );
};

export default CatalogDynamicJsonLd;
