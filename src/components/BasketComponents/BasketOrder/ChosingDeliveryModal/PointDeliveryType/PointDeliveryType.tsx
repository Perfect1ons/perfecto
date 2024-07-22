import { DeliveryMethod } from "@/types/Basket/DeliveryMethod";
import styles from "../style.module.scss";
import cn from "clsx";

interface IPointDeliveryTypeProps {
  variableBuyer: { payment: string; delivery: string };

  variants: DeliveryMethod;
  selectDelivery: (value: string) => void;
}

const PointDeliveryType = ({
  variants,
  selectDelivery,
  variableBuyer,
}: IPointDeliveryTypeProps) => {
  return (
    <div className={styles.wrap_delivery}>
      <button
        onClick={() => selectDelivery(variants[1].desc.slice(59, 87))}
        aria-label="choose delivery point"
        className={cn(
          styles.wrap_delivery_point,
          variableBuyer.delivery === variants[1].desc.slice(59, 87) &&
            styles.wrap_delivery_point_active
        )}
      >
        <span
          className={cn(
            styles.wrap_delivery_point_radio,
            variableBuyer.delivery === variants[1].desc.slice(59, 87) &&
              styles.wrap_delivery_point_radio_active
          )}
        >
          <span
            className={cn(
              styles.wrap_delivery_point_radio_dot,
              variableBuyer.delivery === variants[1].desc.slice(59, 87) &&
                styles.wrap_delivery_point_radio_dot_active
            )}
          ></span>
        </span>
        {variants[1].desc.slice(59, 111)}
      </button>
      <div
        className={cn(
          styles.wrap_delivery_desc,
          variableBuyer.delivery === variants[1].desc.slice(59, 87) &&
            styles.wrap_delivery_desc_active
        )}
      >
        <p className={styles.wrap_delivery_desc_workdays}>{variants[1].desc}</p>
      </div>
      <button
        onClick={() =>
          selectDelivery(`г. Бишкек, ул. ${variants[1].desc.slice(113, 124)}`)
        }
        aria-label="choose delivery point"
        className={cn(
          styles.wrap_delivery_point,
          variableBuyer.delivery ===
            `г. Бишкек, ул. ${variants[1].desc.slice(113, 124)}` &&
            styles.wrap_delivery_point_active
        )}
      >
        <span
          className={cn(
            styles.wrap_delivery_point_radio,
            variableBuyer.delivery ===
              `г. Бишкек, ул. ${variants[1].desc.slice(113, 124)}` &&
              styles.wrap_delivery_point_radio_active
          )}
        >
          <span
            className={cn(
              styles.wrap_delivery_point_radio_dot,
              variableBuyer.delivery ===
                `г. Бишкек, ул. ${variants[1].desc.slice(113, 124)}` &&
                styles.wrap_delivery_point_radio_dot_active
            )}
          ></span>
        </span>
        {`г. Бишкек, ул. ${variants[1].desc.slice(113, 124)}`}
      </button>
      <div
        className={cn(
          styles.wrap_delivery_desc,
          variableBuyer.delivery ===
            `г. Бишкек, ул. ${variants[1].desc.slice(113, 124)}` &&
            styles.wrap_delivery_desc_active
        )}
      >
        <p className={styles.wrap_delivery_desc_workdays}>{variants[1].desc}</p>
      </div>
    </div>
  );
};

export default PointDeliveryType;
