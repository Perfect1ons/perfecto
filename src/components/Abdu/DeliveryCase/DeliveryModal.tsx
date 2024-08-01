import cn from "clsx";
import styles from "./style.module.scss";
import {
  DeliveryCurierIcon,
  DeliveryPlaceIcon,
} from "../../../../public/Icons/Icons";
import DeliveryToggler from "./DeliveryToggler";
import { IDeliveryMethod } from "@/types/Basket/DeliveryMethod";
import { IVariableBuyer } from "../Abdu";
import DeliveryInputs from "./DeliveryInputs/DeliveryInputs";

interface IDeliveryModalProps {
  variableBuyer: IVariableBuyer;
  setView: (view: "delivery" | "curier") => void;
  close: () => void;
  view: string;
  selectDelivery: (delivery: { name: string; id: string | number }) => void;
  saveDelivery: () => void;
  deliveryMethod: IDeliveryMethod;
}

const DeliveryModal = ({
  variableBuyer,
  selectDelivery,
  setView,
  close,
  saveDelivery,
  view,
  deliveryMethod,
}: IDeliveryModalProps) => {
  return (
    <div>
      <DeliveryToggler setView={setView} view={view} />
      <DeliveryInputs/>
      <div className={styles.delivery__ways}>
        {Object.values(deliveryMethod).map((item) => {
          return (
            <div key={item.id} style={{ width: "100%" }}>
              <button
                onClick={() =>
                  selectDelivery({
                    name: item.name,
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
                {item.name}
              </button>
              <div
                className={cn(
                  styles.wrap_courier_desc,
                  variableBuyer.delivery.id === item.id &&
                    styles.wrap_courier_desc_active
                )}
              >
                <p className={styles.wrap_courier_desc_workdays}>{item.desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DeliveryModal;
