"use client"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useRef } from "react";
import clsx from "clsx";
import DiscountCard from "./DiscountCard";
import { IDiscounts } from "@/types/discounts";
import styles from '../style.module.scss'

interface IDiscountsProps {
  discountsOne: IDiscounts[];
  discountsTwo: IDiscounts[];
}

const AllDiscounts = ({ discountsOne, discountsTwo }: IDiscountsProps) => {
  const searchParams = useSearchParams();
  const pageNumber = parseInt(searchParams.get("page") ?? "1");

  const router = useRouter();
  const pathname = usePathname();
  const topRef = useRef<HTMLDivElement>(null);

  const goToPage = (page: number) => {
    router.push(`?page=${page}`);
  };

  const totalPages = Math.max(Math.ceil(discountsOne.length / 10), 1);
  const pageNumbers = Array.from(
    { length: totalPages },
    (_, index) => index + 1
  );

  return (
    <section className="AllDiscounts">
      <div ref={topRef} className="container">
        <div className="all__directions">
          <Link href={"/"} className="all__directions_link">
            Главная
          </Link>
          <Link
            href={"/news"}
            className={clsx(
              "all__directions_link",
              pathname === "/discounts" && "all__directions_linkActive"
            )}
          >
            Скидки
          </Link>
        </div>

        <div className={styles.all__discounts_container}>
          <h1 className="default__showMore_title">Скидки</h1>
          <div className={styles.discount__container}>
            {(pageNumber === 1 ? discountsOne : discountsTwo).map((item, index) => (
              <DiscountCard
                key={index}
                item={item}
                onClick={() => router.push(`discounts/${item.promotion_id}`)}
              />
            ))}
          </div>
        </div>
      </div>
      <div className="pagination">
        <button
          onClick={() => goToPage(pageNumber - 1)}
          disabled={pageNumber === 1}
          className={clsx(
            "pagination__button",
            pageNumber === 1 && "pagination__button_disactive"
          )}
        >
          {"<"}
        </button>
        {pageNumbers.map((page) => (
          <button
            key={page}
            onClick={() => goToPage(page)}
            className={clsx(
              "pagination__button",
              page === pageNumber && "pagination__button_active"
            )}
          >
            {page}
          </button>
        ))}
        <button
          onClick={() => goToPage(pageNumber + 1)}
          disabled={pageNumber === totalPages}
          className={clsx(
            "pagination__button",
            pageNumber === totalPages && "pagination__button_disactive"
          )}
        >
          {">"}
        </button>
      </div>
    </section>
  );
};

export default AllDiscounts;



