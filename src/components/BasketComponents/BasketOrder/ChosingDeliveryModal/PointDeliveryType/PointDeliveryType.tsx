import styles from "../style.module.scss";
import cn from "clsx";

interface IPointDeliveryTypeProps {
  openPoint: string;
  setOpenPoint: React.Dispatch<React.SetStateAction<string>>;
}

const PointDeliveryType = ({
  openPoint,
  setOpenPoint,
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
        ПВЗ г. Бишкек, Медерова 8\2
      </button>
      <div
        className={cn(
          styles.wrap_delivery_desc,
          openPoint === "mederova" && styles.wrap_delivery_desc_active
        )}
      >
        <p className={styles.wrap_delivery_desc_schedule}>График работы:</p>
        <p className={styles.wrap_delivery_desc_workdays}>
          В будние дни: с 9:00 до 18:00, без перерыва
        </p>
        <p className={styles.wrap_delivery_desc_workdays}>
          Воскресенье: с 9:00 до 18:00, обеденный перерыв: с 13:00 до 14:00
        </p>
        <p className={styles.wrap_delivery_desc_info}>
          Предварительно свяжитесь с вашим менеджером для <br />
          подвержения о готовности выдачи заказа.
        </p>
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
        ПВЗ г. Бишкек, Матыева 148
      </button>
      <div
        className={cn(
          styles.wrap_delivery_desc,
          openPoint === "matyeva" && styles.wrap_delivery_desc_active
        )}
      >
        <p className={styles.wrap_delivery_desc_schedule}>График работы:</p>
        <p className={styles.wrap_delivery_desc_workdays}>
          В будние дни: с 9:00 до 18:00, без перерыва
        </p>
        <p className={styles.wrap_delivery_desc_workdays}>
          Воскресенье: Выходной
        </p>
        <p className={styles.wrap_delivery_desc_info}>
          Предварительно свяжитесь с вашим менеджером для <br />
          подвержения о готовности выдачи заказа.
        </p>
      </div>
    </div>
  );
};

export default PointDeliveryType;
