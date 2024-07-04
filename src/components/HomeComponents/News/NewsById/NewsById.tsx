"use client";
import { NewsByPath, NewsResult } from "@/types/News/NewsById";
import styles from "./style.module.scss";
import Link from "next/link";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import { url } from "@/components/temporary/data";
import Card from "@/components/UI/Card/Card";
import DOMPurify from "isomorphic-dompurify";

export interface INewsByIdProps {
  news: NewsResult[];
  main: NewsByPath;
}

const NewsById = ({ news, main }: INewsByIdProps) => {
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
    <section className="news__by_path">
      <div className="container">
        <div className="all__directions">
          <Link href={"/"} className="all__directions_link">
            Главная
          </Link>
          <Link href={"/news?page=1"} className="all__directions_link">
            Новости
          </Link>
          <Link
            href={`${main.id}`}
            className={clsx(
              "all__directions_link",
              pathname === `/news/${main.id}` && "all__directions_linkActive"
            )}
          >
            {main.naim}
          </Link>
        </div>

        <div className={styles.newsById}>
          <h1 className="default__showMore_title">Новости</h1>
          <div className={styles.main__content}>
            <div className={styles.main__news}>
              <div className={styles.main__news_images}>
                <Image
                  onClick={() => router.push(`/news/${main.id}`)}
                  className={styles.main__news_image}
                  src={`${url}${main.logo}`}
                  width={450}
                  height={280}
                  data-fancybox="gallery"
                  alt={main.naim}
                />
              </div>

              <div className={styles.main__news_info}>
                <h1
                  onClick={() => router.push(`/news/${main.id}`)}
                  className="allNews__content_title"
                >
                  {main.naim}
                </h1>
                {main.text && (
                  <p
                    className={styles.newsParap}
                    dangerouslySetInnerHTML={{
                      __html: DOMPurify.sanitize(main.text),
                    }}
                  />
                )}
                <div className={styles.main__news_data}>
                  <span>{formatNewsDate(main.dat1)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="cards">
        {news.map((item, index) => {
          return <Card cardData={item} key={index} />;
        })}
      </div>
    </section>
  );
};

export default NewsById;
