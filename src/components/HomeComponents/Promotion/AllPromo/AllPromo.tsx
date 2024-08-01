"use client";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import clsx from "clsx";
import styles from "./style.module.scss";
import { INews } from "@/types/news";
import { url } from "@/components/temporary/data";
import DOMPurify from "isomorphic-dompurify";

interface IAllNewsProps {
  allpromo: INews[];
}

const AllPromo: React.FC<IAllNewsProps> = ({ allpromo }) => {
  const router = useRouter();
  const pathname = usePathname();

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
    <div className="container">
      <div className="all__directions">
        <Link href={"/"} className="all__directions_link">
          Главная
        </Link>
        <Link
          href={"/news"}
          className={clsx(
            "all__directions_link",
            pathname === "/promotions" && "all__directions_linkActive"
          )}
        >
          Акции
        </Link>
      </div>
      <h1 className="default__showMore_title">Акции</h1>
      <div className={styles.allNews__container_content}>
        {allpromo.map((news) => (
          <div key={news.id} className={styles.allNews__content}>
            <div className={styles.allNews__content_images}>
              <Link className="link" href={`/promotions/${news.id}`}>
                <Image
                  className={styles.allNews__content_image}
                  src={`${url}${news.logo}`}
                  width={450}
                  height={280}
                  title={news.naim}
                  alt={news.naim}
                />
              </Link>
            </div>

            <div className={styles.allNews__content_info}>
              <Link className="link" href={`/promotions/${news.id}`}>
                <h1 className="allNews__content_title">{news.naim}</h1>
              </Link>

              <div className={styles.allNews__desc}>
                <div
                  onClick={() => router.push(`/news/${news.id}`)}
                  className={styles.textFade}
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(news.anons),
                  }}
                />
                <Link
                  className={styles.allNews__desc_link}
                  href={`/promotions/${news.id}`}
                  title="Нажмите чтобы получить подробную информацию"
                >
                  Подробнее
                </Link>
              </div>
              <div className={styles.allNews__content_data}>
                <span>{formatNewsDate(news.dat1)}</span>
                <span>Просмотров: {news.view}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllPromo;
