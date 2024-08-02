import cn from "clsx";
import styles from "./style.module.scss";
import DeliveryToggler from "./DeliveryToggler";
import { IVariableBuyer } from "../Abdu";

interface ICurierModalProps {
  setView: (view: "delivery" | "curier") => void;
  close: () => void;
  selectDelivery: (delivery: { name: string; id: string | number }) => void;
  view: string;
  variableBuyer: IVariableBuyer;
}

const deliveryPlace = [
  {
    id: 1,
    title: "ПВЗ г. Бишкек, Медерова 8\\2",
    desc: (
      <>
        В будние дни: с 9:00 до 18:00, без перерыва
        <br />
        Воскресенье: с 9:00 до 18:00, обеденный перерыв: с 13:00 до 14:00
      </>
    ),
  },
  {
    id: 2,
    title: "ПВЗ г. Бишкек, Матыева 148",
    desc: (
      <>
        В будние дни: с 9:00 до 18:00, без перерыва
        <br />
        Воскресенье: Выходной
      </>
    ),
  },
];




const DeliveryModal = ({
  variableBuyer,
  setView,
  selectDelivery,
  close,
  view,
}: ICurierModalProps) => {
  return (
    <div>
      <DeliveryToggler setView={setView} view={view} />
      <div className={styles.delivery__ways}>
        {deliveryPlace.map((item) => {
          return (
            <div key={item.id} style={{ width: "100%" }}>
              <button
                onClick={() =>
                  selectDelivery({
                    name: item.title,
                    id: item.id,
                  })
                }
                aria-label="choose delivery point"
                className={cn(
                  styles.wrap_courier_point,
                  variableBuyer.delivery.id === item.id &&
                    styles.wrap_courier_point_active
                )}
              >
                <span
                  className={cn(
                    styles.wrap_courier_point_radio,
                    variableBuyer.delivery.id === item.id &&
                      styles.wrap_courier_point_radio_active
                  )}
                >
                  <span
                    className={cn(
                      styles.wrap_courier_point_radio_dot,
                      variableBuyer.delivery.id === item.id &&
                        styles.wrap_courier_point_radio_dot_active
                    )}
                  ></span>
                </span>
                {item.title}
              </button>
              <div
                className={cn(
                  styles.wrap_courier_desc,
                  variableBuyer.delivery.id === item.id &&
                    styles.wrap_courier_desc_active
                )}
              >
                <p className={styles.schedule}>График работы:</p>
                <p className={styles.wrap_courier_desc_workdays}>{item.desc}</p>
                <p className={styles.wrap_courier_desc_workdays}>
                  Предварительно свяжитесь с вашим менеджером для подвержения о
                  готовности выдачи заказа.
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeliveryModal;
