"use client"
import { usePathname} from "next/navigation";
import Link from "next/link";
import { useRef } from "react";
import clsx from "clsx";
import { IDiscounts } from "@/types/discounts";
import styles from "../style.module.scss";
import DiscountCard from "./DiscountCard";

interface IDiscountsProps {
  discounts: IDiscounts[];
}

const AllDiscounts = ({ discounts}: IDiscountsProps) => {

  const pathname = usePathname();
  const topRef = useRef<HTMLDivElement>(null);

  return (
    <section className="AllDiscounts">
      <div ref={topRef} className="container">
        <div className="all__directions">
          <Link href={"/"} className="all__directions_link">
            Главная
          </Link>
          <Link
            href={"/discount"}
            className={clsx(
              "all__directions_link",
              pathname === "/discount" && "all__directions_linkActive"
            )}
          >
            Скидки
          </Link>
        </div>

        <div className={styles.all__discounts_container}>
          <h1 className="default__showMore_title">Скидки</h1>
          <div className={styles.discount__container}>
            {discounts.map((item, index) => (
              <Link
                className="link"
                href={`discount/${item.promotion_id}`}
                key={index}
              >
                <DiscountCard item={item} />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllDiscounts;




