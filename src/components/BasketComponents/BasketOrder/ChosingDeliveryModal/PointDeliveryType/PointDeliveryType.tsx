import { IDeliveryMethod } from "@/types/Basket/DeliveryMethod";
import styles from "../style.module.scss";
import cn from "clsx";

interface IPointDeliveryTypeProps {
  variableBuyer: {
    payment: {
      name: string;
      id: number | string;
    };
    delivery: {
      name: string;
      id: number | string;
    };
  };

  variants: IDeliveryMethod;
  selectDelivery: (delivery: { name: string; id: string | number }) => void;
}

const PointDeliveryType = ({
  variants,
  selectDelivery,
  variableBuyer,
}: IPointDeliveryTypeProps) => {
  return (
    <div className={styles.wrap_delivery}>
      {Object.entries(variants)
        .slice(0, 1)
        .map(([key, variant]) => (
          <div key={key}>
            <button
              onClick={() =>
                selectDelivery({
                  name: variant.name,
                  id: variant.id,
                })
              }
              aria-label="choose delivery point"
              className={cn(
                styles.wrap_courier_point,
                variableBuyer.delivery.id === variant.id &&
                  styles.wrap_courier_point_active
              )}
            >
              <span
                className={cn(
                  styles.wrap_courier_point_radio,
                  variableBuyer.delivery.id === variant.id &&
                    styles.wrap_courier_point_radio_active
                )}
              >
                <span
                  className={cn(
                    styles.wrap_courier_point_radio_dot,
                    variableBuyer.delivery.id === variant.id &&
                      styles.wrap_courier_point_radio_dot_active
                  )}
                ></span>
              </span>
              {variant.name}
            </button>
            <div
              className={cn(
                styles.wrap_courier_desc,
                variableBuyer.delivery.id === variant.id &&
                  styles.wrap_courier_desc_active
              )}
            >
              <p className={styles.wrap_courier_desc_workdays}>
                {variant.desc}
              </p>
            </div>
          </div>
        ))}
    </div>
  );
};

export default PointDeliveryType;
