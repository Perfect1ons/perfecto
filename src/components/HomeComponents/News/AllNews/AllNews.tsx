"use client";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";
import styles from "./style.module.scss";
import { INews } from "@/types/news";
import { url } from "@/components/temporary/data";
import DOMPurify from "isomorphic-dompurify";
import { useRouter } from "next/navigation";

interface IAllNewsProps {
  allnews: INews[];
}

const AllNews: React.FC<IAllNewsProps> = ({ allnews }) => {
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
    <section className="all__news" >
      <div className="container">
        <div className="all__directions">
          <Link href={"/"} className="all__directions_link">
            Главная
          </Link>
          <Link
            href={"/news"}
            className={clsx(
              "all__directions_link",
              "all__directions_linkActive"
            )}
          >
            Новости
          </Link>
        </div>
        <div className={styles.all__news_container}>
          <h1 className="default__showMore_title">Новости</h1>
          <div className={styles.allNews__container_content}>
            {allnews.map((news, index) => (
                <div key={news.id} className={styles.allNews__content}>
                  <div className={styles.allNews__content_images}>
                    <Link href={`/news/${news.id}`}>
                      <Image
                        className={styles.allNews__content_image}
                        src={`${url}${news.logo}`}
                        width={450}
                        height={280}
                        title={news.naim}
                        alt={news.naim}
                        loading="lazy"
                      />
                    </Link>
                  </div>
                  <div className={styles.allNews__content_info}>
                    <h1 className="allNews__content_title">
                      <Link
                        className={styles.allNews__content_link}
                        href={`/news/${news.id}`}
                      >
                        {news.naim}
                      </Link>
                    </h1>
                    <div className={styles.allNews__desc}>
                      <div
                        onClick={() => router.push(`/news/${news.id}`)}
                        className={styles.textFade}
                        dangerouslySetInnerHTML={{
                          __html: DOMPurify.sanitize(news.text),
                        }}
                      />
                      <Link
                        className={styles.allNews__desc_link}
                        href={`/news/${news.id}`}
                        title="Нажмите чтобы получить подробную информацию"
                      >
                        Подробнее
                      </Link>
                    </div>
                    <div className={styles.allNews__content_data}>
                      <span>{formatNewsDate(news.dat1)}</span>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllNews;
