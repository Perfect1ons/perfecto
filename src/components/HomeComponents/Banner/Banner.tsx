"use client"
import cn from "clsx";
import styles from "./style.module.scss";
import BannerSwiper from "./BannerSwiper/BannerSwiper";
import useMediaQuery from "@/hooks/useMediaQuery";

export interface IBanner {
  id: number;
  img: string;
  name: string;
  href: string;
}

const bannerData: IBanner[] = [
  {
    id: 1,
    img: "https://max.kg/bimages/baner/baner_957.jpg",
    name: "Ламинаторы",
    href: "catalog/bytovaya-tehnika-i-elektronika/tehnika-dlya-ofisa/laminatory-i-rashodnye-materialy/laminatory",
  },
  {
    id: 2,
    img: "https://max.kg/bimages/baner/baner_951.jpg",
    name: "Очиститель воздуха KITFORT КТ-2813",
    href: "item/11461493/ochistitel-vozdukha-kt-2813",
  },
  {
    id: 3,
    img: "https://max.kg/bimages/baner/baner_956.jpg",
    name: "Шиномонтаж Sivik",
    href: "news/454",
  },
  {
    id: 4,
    img: "https://max.kg/bimages/baner/baner_958.jpg",
    name: "Автомобильные холодильники",
    href: "catalog/avto-i-moto/avtoelektronika/avtomobilnye-holodilniki",
  },
];

const banerMobileData: IBanner[] = [
  {
    id: 1,
    img: "https://max.kg/bimages/baner/mobile/baner_989.jpg",
    name: "Все виды онлайн платежей",
    href: "/",
  },
  {
    id: 2,
    img: "https://max.kg/bimages/baner/mobile/baner_988.jpg",
    name: "Мото доставка за 1 час",
    href: "/",
  },
];

const Banner = () => {
  // Используем useMediaQuery для проверки ширины экрана
  const isMobile = useMediaQuery("(max-width: 768px)");

  return (
    <section className="intro__banner">
      <div className={cn(styles.intro__banner_container, "container")}>
        {/* В зависимости от результата проверки выводим соответствующие данные */}
        <BannerSwiper slides={isMobile ? banerMobileData : bannerData} />
      </div>
    </section>
  );
};

export default Banner;
