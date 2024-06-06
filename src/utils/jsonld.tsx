import { Items } from "@/types/CardProduct/cardProduct";
import { IMetaData } from "@/types/MetaData/MetaData";

interface IMetaProps {
  meta: IMetaData;
  data: Items;
}

const DynamicJsonLd = ({ meta, data }: IMetaProps) => {
  if (!meta || !data) return null;

  const jsonLdData: any = {
    "@context": "http://schema.org",
    "@type": "Product",
  };

  if (data.id_tov) {
    jsonLdData.sku = data.id_tov;
    jsonLdData.mpn = data.id_tov;
  }
  if (meta.og_url) {
    jsonLdData.url = meta.og_url;
  }
  if (meta.title) {
    jsonLdData.name = meta.title;
  }
  if (meta.og_img) {
    jsonLdData.image = meta.og_img;
  }
  if (meta.description) {
    jsonLdData.description = meta.description;
  }

  jsonLdData.itemCondition = "https://schema.org/NewCondition";

  jsonLdData.offers = {
    "@type": "Offer",
    availability: "http://schema.org/InStock",
  };

  if (meta.og_url) {
    jsonLdData.offers.url = meta.og_url;
  }
  if (data.cenaok) {
    jsonLdData.offers.price = data.cenaok;
    jsonLdData.offers.priceCurrency = "KGS";
  }

  jsonLdData.offers.shippingDetails = {
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
  };

  if (data.trademark) {
    jsonLdData.brand = {
      "@type": "Brand",
      name: data.trademark,
      url: `/brand/${data.trademark}`,
    };
  }

  if (data.ocenka) {
    jsonLdData.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: data.ocenka,
      reviewCount: 24,
    };
  }

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
