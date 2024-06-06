import { Items } from "@/types/CardProduct/cardProduct";
import styles from "./style.module.scss";

interface IBuyBtnProps {
  data: Items;
}

const MobileBuyBtn = ({ data }: IBuyBtnProps) => {
  return (
    <div className={styles.container}>
      <button className={styles.btn}>
        Купить за: {data.cenaok.toLocaleString("ru-Ru")}{" "}
        <span className={styles.btn_simbol}>с</span>
      </button>
    </div>
  );
};

export default MobileBuyBtn;
