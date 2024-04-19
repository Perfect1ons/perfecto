import cn from "clsx";
import styles from "./style.module.scss";
import BannerSwiper from "./BannerSwiper/BannerSwiper";

export interface IBanner{
  id: number,
  img: string,
  name: string,
  href: string,
}

const bannerData: IBanner[] = [
  {
    id: 1,
    img: "https://max.kg/bimages/baner/baner_951.jpg",
    name: "Очиститель воздуха KITFORT КТ-2813",
    href: "https://max.kg/item/11461493/ochistitel-vozdukha-kt-2813",
  },
  {
    id: 2,
    img: "https://max.kg/bimages/baner/baner_956.jpg",
    name: "Шиномонтаж Sivik",
    href: "https://max.kg/news/454",
  },
  {
    id: 3,
    img: "https://max.kg/bimages/baner/baner_958.jpg",
    name: "Автомобильные холодильники",
    href: "https://max.kg/catalog/avto-i-moto/avtoelektronika/avtomobilnye-holodilniki",
  },
  {
    id: 4,
    img: "https://max.kg/bimages/baner/baner_949.jpg",
    name: "Кулер для воды с чайником VATTEN L50REAT Tea Bar, напольный, охлаждение электронное, шкаф, 1 кран",
    href: "https://max.kg/item/177018/kuler-dlya-vody-s-chaynikom-vatten-l50reat-tea-bar-napolny",
  },
];


const Banner = () => {
  return (
    <section className={styles.intro__banner}>
      <div className={cn(styles.intro__banner_container, "container")}>
        <BannerSwiper slides={bannerData}/>
      </div>
    </section>
  );
};

export default Banner;
