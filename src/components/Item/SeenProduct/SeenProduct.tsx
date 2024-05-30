import Image from "next/image";
import {
  CartIcon,
  GrayFavoritesIcon,
  GrayStar,
  SwiperNextArrow,
  SwiperPrevArrow,
  VioletFavoritesIcon,
  YellowStar,
} from "../../../../public/Icons/Icons";
import styles from "./style.module.scss";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Items } from "@/types/CardProduct/cardProduct";
import { ISimilarItem } from "@/types/SimilarProduct/similarProduct";
import { url } from "@/components/temporary/data";
import cn from "clsx";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
const staticItems = [
  {
    id: 1,
    art: 12345,
    cena0: "1000",
    cenaok: 1000,
    naim: "Продукт 1",
    url: "product-1",
    img: "https://example.com/image1.jpg",
    idt: null,
    notfound: 0,
    id_city: 1,
    dat1: null,
    minQty: 1,
    country: "Кыргызстан",
    stuff: "Материал 1",
    size: "M",
    currencySign: "₽",
    balance: "10",
    id_post: 1,
    id_cat: 1,
    bazedin: "Категория 1",
    moder: 1,
    id_tov: 1,
    copy: null,
    weight: 1.0,
    description: "Описание продукта 1",
    short_description: "Краткое описание продукта 1",
    trademark: "Бренд 1",
    cert: "Сертификат 1",
    price_cost: "900",
    id_status: "available",
    in_box: "1",
    box: "Коробка 1",
    img_url: "https://example.com/image1.jpg",
    status: 1,
    id_micro_serv: 1,
    d_min: "2024-01-01",
    d_max: "2024-12-31",
    apply_test_per: "12 мес",
    active_img: 1,
    discount: 0,
    discount_prc: 0,
    promotions: [],
    old_price: 1200,
    to_date: 0,
    from_date: 0,
    valuteVal: "RUB",
    price: 1000,
    ddos: "Быстрая доставка",
    photos: [{ url_part: "https://example.com/image1.jpg" }],
    ocenka: 4,
  },
  {
    id: 1,
    art: 12345,
    cena0: "5000",
    cenaok: 5900,
    naim: "Продукт 1",
    url: "product-1",
    img: "https://example.com/image1.jpg",
    idt: null,
    notfound: 0,
    id_city: 1,
    dat1: null,
    minQty: 1,
    country: "Кыргызстан",
    stuff: "Материал 1",
    size: "M",
    currencySign: "₽",
    balance: "10",
    id_post: 1,
    id_cat: 1,
    bazedin: "Категория 1",
    moder: 1,
    id_tov: 1,
    copy: null,
    weight: 1.0,
    description: "Описание продукта 1",
    short_description: "Краткое описание продукта 1",
    trademark: "Бренд 1",
    cert: "Сертификат 1",
    price_cost: "900",
    id_status: "available",
    in_box: "1",
    box: "Коробка 1",
    img_url: "https://example.com/image1.jpg",
    status: 1,
    id_micro_serv: 1,
    d_min: "2024-01-01",
    d_max: "2024-12-31",
    apply_test_per: "12 мес",
    active_img: 1,
    discount: 0,
    discount_prc: 0,
    promotions: [],
    old_price: 1200,
    to_date: 0,
    from_date: 0,
    valuteVal: "RUB",
    price: 5090,
    ddos: "Быстрая доставка",
    photos: [{ url_part: "https://example.com/image1.jpg" }],
    ocenka: 3,
  },
  {
    id: 1,
    art: 12345,
    cena0: "5000",
    cenaok: 5900,
    naim: "Продукт 1",
    url: "product-1",
    img: "https://example.com/image1.jpg",
    idt: null,
    notfound: 0,
    id_city: 1,
    dat1: null,
    minQty: 1,
    country: "Кыргызстан",
    stuff: "Материал 1",
    size: "M",
    currencySign: "₽",
    balance: "10",
    id_post: 1,
    id_cat: 1,
    bazedin: "Категория 1",
    moder: 1,
    id_tov: 1,
    copy: null,
    weight: 1.0,
    description: "Описание продукта 1",
    short_description: "Краткое описание продукта 1",
    trademark: "Бренд 1",
    cert: "Сертификат 1",
    price_cost: "900",
    id_status: "available",
    in_box: "1",
    box: "Коробка 1",
    img_url: "https://example.com/image1.jpg",
    status: 1,
    id_micro_serv: 1,
    d_min: "2024-01-01",
    d_max: "2024-12-31",
    apply_test_per: "12 мес",
    active_img: 1,
    discount: 0,
    discount_prc: 0,
    promotions: [],
    old_price: 1200,
    to_date: 0,
    from_date: 0,
    valuteVal: "RUB",
    price: 5090,
    ddos: "Быстрая доставка",
    photos: [{ url_part: "https://example.com/image1.jpg" }],
    ocenka: 3,
  },
  {
    id: 1,
    art: 12345,
    cena0: "5000",
    cenaok: 5900,
    naim: "Продукт 1",
    url: "product-1",
    img: "https://example.com/image1.jpg",
    idt: null,
    notfound: 0,
    id_city: 1,
    dat1: null,
    minQty: 1,
    country: "Кыргызстан",
    stuff: "Материал 1",
    size: "M",
    currencySign: "₽",
    balance: "10",
    id_post: 1,
    id_cat: 1,
    bazedin: "Категория 1",
    moder: 1,
    id_tov: 1,
    copy: null,
    weight: 1.0,
    description: "Описание продукта 1",
    short_description: "Краткое описание продукта 1",
    trademark: "Бренд 1",
    cert: "Сертификат 1",
    price_cost: "900",
    id_status: "available",
    in_box: "1",
    box: "Коробка 1",
    img_url: "https://example.com/image1.jpg",
    status: 1,
    id_micro_serv: 1,
    d_min: "2024-01-01",
    d_max: "2024-12-31",
    apply_test_per: "12 мес",
    active_img: 1,
    discount: 0,
    discount_prc: 0,
    promotions: [],
    old_price: 1200,
    to_date: 0,
    from_date: 0,
    valuteVal: "RUB",
    price: 5090,

    ddos: "Быстрая доставка",
    photos: [{ url_part: "https://example.com/image1.jpg" }],
    ocenka: 3,
  },
  {
    id: 1,
    art: 12345,
    cena0: "5000",
    cenaok: 5900,
    naim: "Продукт 1",
    url: "product-1",
    img: "https://example.com/image1.jpg",
    idt: null,
    notfound: 0,
    id_city: 1,
    dat1: null,
    minQty: 1,
    country: "Кыргызстан",
    stuff: "Материал 1",
    size: "M",
    currencySign: "₽",
    balance: "10",
    id_post: 1,
    id_cat: 1,
    bazedin: "Категория 1",
    moder: 1,
    id_tov: 1,
    copy: null,
    weight: 1.0,
    description: "Описание продукта 1",
    short_description: "Краткое описание продукта 1",
    trademark: "Бренд 1",
    cert: "Сертификат 1",
    price_cost: "900",
    id_status: "available",
    in_box: "1",
    box: "Коробка 1",
    img_url: "https://example.com/image1.jpg",
    status: 1,
    id_micro_serv: 1,
    d_min: "2024-01-01",
    d_max: "2024-12-31",
    apply_test_per: "12 мес",
    active_img: 1,
    discount: 0,
    discount_prc: 0,
    promotions: [],
    old_price: 1200,
    to_date: 0,
    from_date: 0,
    valuteVal: "RUB",
    price: 5090,
    ddos: "Быстрая доставка",
    photos: [{ url_part: "https://example.com/image1.jpg" }],
    ocenka: 3,
  },
  // Добавьте еще 4 статичных товара аналогично первому
];
const SeenProduct = () => {
  const [data, setData] = useState(staticItems);
  const router = useRouter();

  const [rating, setRating] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const imageUrls =
    "https://megabike74.ru/wp-content/themes/chlzuniversal/assets/images/placeholder/placeholder-250x250.jpg";

  useEffect(() => {
    // Проверяем, доступен ли localStorage (только на клиентской стороне)
    const isLocalStorageAvailable =
      typeof window !== "undefined" && window.localStorage;

    // Используем localStorage только если он доступен
    if (isLocalStorageAvailable) {
      const favoriteStatus = localStorage.getItem(
        data.map((item) => item.id).toString()
      );
      setIsFavorite(favoriteStatus === "true");
    }
  }, [data]);

  const handleFavoriteClick = () => {
    setIsFavorite((prevIsFavorite) => {
      const newIsFavorite = !prevIsFavorite;
      // Проверяем, доступен ли localStorage (только на клиентской стороне)
      const isLocalStorageAvailable =
        typeof window !== "undefined" && window.localStorage;
      if (isLocalStorageAvailable) {
        localStorage.setItem(
          data.map((item) => item.id).toString(),
          newIsFavorite.toString()
        );
      }
      return newIsFavorite;
    });
  };

  useEffect(() => {
    const totalRating = data.reduce((acc, item) => acc + item.ocenka, 0);
    setRating(Math.floor(totalRating / data.length));
  }, [data]);
  return (
    <section className={styles.container}>
      <h1 className="sections__title">Вы смотрели</h1>
      <Swiper
        pagination={{ clickable: true }}
        spaceBetween={15}
        slidesPerView={5}
        modules={[Pagination, Navigation]}
        // navigation={{
        //   nextEl: ".my-swiper-button-next",
        //   prevEl: ".my-swiper-button-prev",
        //   disabledClass: "swiper-button-disabled",
        // }}
        className={cn("customSwiper", styles.swiper)}
        loop={true}
      >
        {data.map((item, index) => (
          <SwiperSlide key={index}>
              <div
                onClick={() => router.push(`/item/${item.art}/${item.url}`)}
                className="default__card"
              >
                <div className="default__card_images">
                  <Image
                    className="default__card_image"
                    src={imageUrls}
                    width={200}
                    height={200}
                    alt={item.naim}
                    quality={100}
                    loading="lazy"
                  />
                </div>
                <div className="default__card_info">
                  <span className="default__card_price">
                    {item.cenaok.toLocaleString("ru-RU")}
                    <span className="default__card_price_custom"> с</span>
                  </span>
                  <h2 className="default__card_name">{item.naim}</h2>
                  <div className="ocenka">
                    {[...Array(5)].map((_, index) => (
                      <span key={index}>
                        {index < rating ? <YellowStar /> : <GrayStar />}
                      </span>
                    ))}
                  </div>
                  <div className="ddos">
                    <Image
                      src={`${url}images/delivery_icon.svg`}
                      width={20}
                      height={20}
                      alt="delivery_icon"
                    />
                    <p className="ddos__text">{item.ddos}</p>
                  </div>
                  <div className="add__to">
                    <button
                      title="Добавить в избранное"
                      className={cn("add__to_fav", {
                        ["add__to_fav_active"]: isFavorite,
                      })}
                      onClick={handleFavoriteClick}
                    >
                      <span className="add__to_fav_icon">
                        {isFavorite ? (
                          <VioletFavoritesIcon />
                        ) : (
                          <GrayFavoritesIcon />
                        )}
                      </span>
                    </button>
                  </div>
                </div>
              </div>
          </SwiperSlide>
        ))}
        <button
          className={cn(
            styles.sliderArrow,
            styles.sliderArrow_left,
            "my-swiper-button-prev"
          )}
        >
          <SwiperPrevArrow />
        </button>
        <button
          className={cn(
            styles.sliderArrow,
            styles.sliderArrow_right,
            "my-swiper-button-next"
          )}
        >
          <SwiperNextArrow />
        </button>
      </Swiper>
    </section>
  );
};

export default SeenProduct;
