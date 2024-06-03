import { Items } from "@/types/CardProduct/cardProduct";
import styles from "./style.module.scss";
import { XMark } from "../../../../public/Icons/Icons";
import Image from "next/image";
import { url } from "@/components/temporary/data";

interface IOrderModalProps {
  func: () => void;
  data: Items;
}

const OrderModal = ({ data, func }: IOrderModalProps) => {
  const getImageUrl = (photo: any) => {
    if (!photo || !photo.url_part) {
      // Если photo или url_part не определены, возвращаем URL placeholder
      return "https://megabike74.ru/wp-content/themes/chlzuniversal/assets/images/placeholder/placeholder-250x250.jpg";
    }

    if (photo.url_part.startsWith("https://goods-photos")) {
      return `${photo.url_part}280.jpg`;
    } else if (photo.url_part.startsWith("https://")) {
      return photo.url_part;
    } else {
      return `${url}nal/img/${data.id_post}/b_${data.img}`;
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.wrap}>
        <div className={styles.wrap_nav}>
          <h1 className={styles.wrap_nav_title}>Быстрый заказ</h1>
          <button onClick={func} className={styles.wrap_nav_cross}>
            <XMark />
          </button>
        </div>
        <div className={styles.wrap_product}>
          <div className={styles.wrap_product_imageContainer}>
            <Image
              className={styles.wrap_product_imageContainer_productImage}
              src={getImageUrl(data.photos[0])}
              width={150}
              height={150}
              alt={data.img}
            ></Image>
          </div>
          <div className={styles.wrap_product_info}>
            <h2 className={styles.wrap_product_name}>{data.naim}</h2>
            <p className={styles.wrap_product_price}>
              {data.cenaok.toLocaleString("ru-RU")}
              <span className={styles.wrap_product_price_cost}>c</span>
            </p>
            <p className={styles.wrap_product_delivery}>{data.ddos}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderModal;
