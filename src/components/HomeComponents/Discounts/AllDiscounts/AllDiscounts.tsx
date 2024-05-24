"use client"
import { usePathname, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useRef } from "react";
import clsx from "clsx";
import { IDiscounts } from "@/types/discounts";
import styles from "../style.module.scss";
import DiscountCard from "./DiscountCard";

interface IDiscountsProps {
  discountsOne: IDiscounts[];
  discountsTwo: IDiscounts[];
}

const AllDiscounts = ({ discountsOne, discountsTwo }: IDiscountsProps) => {
  const searchParams = useSearchParams();
  const pageNumber = parseInt(searchParams.get("page") ?? "1");

  const pathname = usePathname();
  const topRef = useRef<HTMLDivElement>(null);

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
            href={"/discounts"}
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
            {(pageNumber === 1 ? discountsOne : discountsTwo).map(
              (item, index) => (
                <Link className="link" href={`discounts/${item.promotion_id}`} key={index}>
                    <DiscountCard item={item} />
                </Link>
              )
            )}
          </div>
        </div>
      </div>
      <div className="pagination">
        <Link className="link" href={`?page=${pageNumber - 1}`} passHref>
          <button
            disabled={pageNumber === 1}
            className={clsx(
              "pagination__button",
              pageNumber === 1 && "pagination__button_disactive"
            )}
          >
            {"<"}
          </button>
        </Link>
        {pageNumbers.map((page) => (
          <Link className="link" href={`?page=${page}`} key={page} passHref>
            <button
              className={clsx(
                "pagination__button",
                page === pageNumber && "pagination__button_active"
              )}
            >
              {page}
            </button>
          </Link>
        ))}
        <Link className="link" href={`?page=${pageNumber + 1}`} passHref>
          <button
            disabled={pageNumber === totalPages}
            className={clsx(
              "pagination__button",
              pageNumber === totalPages && "pagination__button_disactive"
            )}
          >
            {">"}
          </button>
        </Link>
      </div>
    </section>
  );
};

export default AllDiscounts;




