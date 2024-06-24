"use client";
import styles from "./style.module.scss";
import Link from "next/link";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { url } from "@/components/temporary/data";
import { IPromoProduct } from "@/types/Promo/PromoById";
import { NewsByPath } from "@/types/News/NewsById";
import Card from "@/components/UI/Card/Card";

export interface INewsByIdProps {
  promo: IPromoProduct[];
  main: NewsByPath;
}

const PromoById = ({ promo, main }: INewsByIdProps) => {
    
  const pathname = usePathname();
  const router = useRouter();
  const formatNewsDate = (dateString: string) => {
    const dateObject = new Date(dateString);
    const day = dateObject.getDate();
    const month = dateObject.getMonth() + 1;
    const year = dateObject.getFullYear();
    return `${day < 10 ? "0" : ""}${day}.${
      month < 10 ? "0" : ""
    }${month}.${year}`;
  };

  return (
    <section className="promo__by_path">
      <div className="container">
        <div className="all__directions">
          <Link href={"/"} className="all__directions_link">
            Главная
          </Link>
          <Link href={"/promotions"} className="all__directions_link">
            Акции
          </Link>
          <Link
            href={`/`}
            className={clsx(
              "all__directions_link",
              pathname === `/promotions/${main.id}` &&
                "all__directions_linkActive"
            )}
          >
              {main.naim}
          </Link>
        </div>

        <div className={styles.promoById}>
          <h1 className="default__showMore_title">Акции</h1>
          <div className={styles.main__content}>
            <div className={styles.main__news}>
              <div className={styles.main__news_images}>
                <Image
                  onClick={() => router.push(`/promotions/${main.id}`)}
                  className={styles.main__news_image}
                  src={`${url}${main.logo}`}
                  width={450}
                  height={280}
                  alt={main.naim}
                />
              </div>

              <div className={styles.main__news_info}>
                <h1
                  onClick={() => router.push(`/promotions/${main.id}`)}
                  className="allNews__content_title"
                >
                  {main.naim}
                </h1>
                <div className={styles.main__news_desc}>
                  <Link
                    className={styles.main__news_desc_link}
                    href={`/news`}
                    title="Нажмите чтобы получить подробную информацию"
                  >
                    Подробнее
                  </Link>
                </div>
                <div className={styles.main__news_data}>
                  <span>{formatNewsDate(main.dat1)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cards">
        {promo.map((item, index) => {
          return <Card cardData={item} key={index} />;
        })}
      </div>
    </section>
  );
};

export default PromoById;
