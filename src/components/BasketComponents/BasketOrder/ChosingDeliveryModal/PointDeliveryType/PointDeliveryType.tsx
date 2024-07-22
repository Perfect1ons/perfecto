import { DeliveryMethod } from "@/types/Basket/DeliveryMethod";
import styles from "../style.module.scss";
import cn from "clsx";

interface IPointDeliveryTypeProps {
  openPoint: string;
  setOpenPoint: React.Dispatch<React.SetStateAction<string>>;
  variants: DeliveryMethod;
}

const PointDeliveryType = ({
  openPoint,
  setOpenPoint,
  variants,
}: IPointDeliveryTypeProps) => {
  return (
    <div className={styles.wrap_delivery}>
      <button
        onClick={() => setOpenPoint("mederova")}
        aria-label="choose delivery point"
        className={cn(
          styles.wrap_delivery_point,
          openPoint === "mederova" && styles.wrap_delivery_point_active
        )}
      >
        <span
          className={cn(
            styles.wrap_delivery_point_radio,
            openPoint === "mederova" && styles.wrap_delivery_point_radio_active
          )}
        >
          <span
            className={cn(
              styles.wrap_delivery_point_radio_dot,
              openPoint === "mederova" &&
                styles.wrap_delivery_point_radio_dot_active
            )}
          ></span>
        </span>
        {variants[1].desc.slice(59, 111)}
      </button>
      <div
        className={cn(
          styles.wrap_delivery_desc,
          openPoint === "mederova" && styles.wrap_delivery_desc_active
        )}
      >
        <p className={styles.wrap_delivery_desc_workdays}>{variants[1].desc}</p>
      </div>
      <button
        onClick={() => setOpenPoint("matyeva")}
        aria-label="choose delivery point"
        className={cn(
          styles.wrap_delivery_point,
          openPoint === "matyeva" && styles.wrap_delivery_point_active
        )}
      >
        <span
          className={cn(
            styles.wrap_delivery_point_radio,
            openPoint === "matyeva" && styles.wrap_delivery_point_radio_active
          )}
        >
          <span
            className={cn(
              styles.wrap_delivery_point_radio_dot,
              openPoint === "matyeva" &&
                styles.wrap_delivery_point_radio_dot_active
            )}
          ></span>
        </span>
        {`г. Бишкек, ул. ${variants[1].desc.slice(113, 124)}`}
      </button>
      <div
        className={cn(
          styles.wrap_delivery_desc,
          openPoint === "matyeva" && styles.wrap_delivery_desc_active
        )}
      >
        <p className={styles.wrap_delivery_desc_workdays}>{variants[1].desc}</p>
      </div>
    </div>
  );
};

export default PointDeliveryType;
