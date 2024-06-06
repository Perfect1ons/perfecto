import { Items } from "@/types/CardProduct/cardProduct";
import { IMetaData } from "@/types/MetaData/MetaData";

interface IMetaProps{
  meta: IMetaData;
  data: Items
}

const DynamicJsonLd = ({ meta, data }: IMetaProps) => {
  const jsonLdData = {
    "@context": "http://schema.org",
    "@type": "meta",
    sku: data.id_tov,
    mpn: data.id_tov,
    url: meta.og_url,
    name: meta.title,
    image: meta.og_img,
    description: meta.description,
    itemCondition: "https://schema.org/NewCondition",
    offers: {
      "@type": "Offer",
      availability: "http://schema.org/InStock",
      url: meta.og_url,
      price: data.cenaok,
      priceCurrency: "KGS",
      shippingDetails: {
        "@type": "OfferShippingDetails",
        deliveryTime: {
          "@type": "ShippingDeliveryTime",
          businessDays: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: [
              "https://schema.org/Monday",
              "https://schema.org/Tuesday",
              "https://schema.org/Wednesday",
              "https://schema.org/Thursday",
              "https://schema.org/Friday",
              "https://schema.org/Saturday",
            ],
          },
          transitTime: {
            "@type": "QuantitativeValue",
            maxValue: "1",
            unitCode: "DAY",
          },
        },
        shippingRate: {
          "@type": "MonetaryAmount",
          value: "Бесплатная доставка",
          currency: "KGS",
        },
      },
    },
    brand: {
      "@type": "Brand",
      name: data.trademark,
      url: `/brand/${data.trademark}`,
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: data.ocenka,
      reviewCount: 24,
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

export default DynamicJsonLd;
