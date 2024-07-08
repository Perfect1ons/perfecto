import { Items } from "@/types/CardProduct/cardProduct";
import styles from "./style.module.scss";
import { GrayStar, YellowStar } from "../../../../public/Icons/Icons";
import Link from "next/link";
interface IOcenkaProps {
  data: Items;
}

const ItemOcenka = ({ data }: IOcenkaProps) => {

  return (
    <div className={styles.product_info__ocenka}>
      <span className={styles.product_info_ocenka__count}>{data.ocenka}</span>
      <div className="ocenku">
        {[...Array(5)].map((_, index) => (
          <span key={index}>
            {index < Math.floor(data.ocenka) ? <YellowStar /> : <GrayStar />}
          </span>
        ))}
      </div>
      <Link
        href={data?.otz?.length !== 0 ? "#otz" : ""}
        className={styles.product_info_ocenka__otzivy}
      >{`(${data?.otz?.length})`}</Link>
    </div>
  );
};

export default ItemOcenka;
