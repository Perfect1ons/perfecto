import { DeliveryMethod } from "@/types/Basket/DeliveryMethod";
import styles from "../style.module.scss";
import cn from "clsx";

interface IPointDeliveryTypeProps {
  variableBuyer: { payment: string | number; delivery: string | number };

  variants: DeliveryMethod;
  selectDelivery: (value: string | number) => void;
}

const PointDeliveryType = ({
  variants,
  selectDelivery,
  variableBuyer,
}: IPointDeliveryTypeProps) => {
  return (
    <div className={styles.wrap_delivery}>
      <button
        onClick={() => selectDelivery(variants[1].id)}
        aria-label="choose delivery point"
        className={cn(
          styles.wrap_delivery_point,
          variableBuyer.delivery === variants[1].id &&
            styles.wrap_delivery_point_active
        )}
      >
        <span
          className={cn(
            styles.wrap_delivery_point_radio,
            variableBuyer.delivery === variants[1].id &&
              styles.wrap_delivery_point_radio_active
          )}
        >
          <span
            className={cn(
              styles.wrap_delivery_point_radio_dot,
              variableBuyer.delivery === variants[1].id &&
                styles.wrap_delivery_point_radio_dot_active
            )}
          ></span>
        </span>
        {variants[1].name}
      </button>
      <div
        className={cn(
          styles.wrap_delivery_desc,
          variableBuyer.delivery === variants[1].id &&
            styles.wrap_delivery_desc_active
        )}
      >
        <p className={styles.wrap_delivery_desc_workdays}>{variants[1].desc}</p>
      </div>
    </div>
  );
};

export default PointDeliveryType;
