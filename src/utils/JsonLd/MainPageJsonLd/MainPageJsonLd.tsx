import React from 'react'

const MainPageJsonLd = () => {

      const jsonLdData: any = {
        "@context": "http://www.schema.org",
        "@type": "Store",
        priceRange: "KGS",
        name: "Компания max.kg",
        url: "https://max.kg/",
        sameAs: [
          "https://api.whatsapp.com/send?phone=996500931111",
          "http://instagram.com/max.kg_",
          "https://www.facebook.com/www.max.kg",
        ],
        logo: "https://max.kg/images/logo-max.svg",
        image: "https://max.kg/images/logo-max.svg",
        description:
          "Интернет-магазин MAX был образован в 2015 году. Он представляет собой торговую интернет-площадку, которая позволят клиентам из Центральной Азии и стран СНГ приобрести широкий спектр товаров народного потребления от ведущих производителей. Интернет-магазин объединяет десятки товарных направлений и стремится к предоставлению качественного сервиса для многочисленных поставщиков товаров, производителей и покупателей.",
        address: {
          "@type": "PostalAddress",
          streetAddress: "ул. Матыева  148",
          addressLocality: "Бишкек",
          addressRegion: "Чуй",
          postalCode: "720007",
          addressCountry: "Кыргызстан",
          telephone: "+996 553 931111",
        },
        geo: {
          "@type": "GeoCoordinates",
          latitude: "42.852656",
          longitude: "74.565675",
        },
        hasMap: "https://goo.gl/maps/f5Y69DsoVKybTfWb7",
        openingHours: "Mo, Tu, We, Th, Fr, Sa, Su 09:00-19:00",
        contactPoint: {
          "@type": "ContactPoint",
          telephone: [
            "+996 553 931111",
            "+996 777 931111",
            "+996 500 931111",
            "+996 312 986760",
          ],
          contactType: "mobile",
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
}

export default MainPageJsonLd