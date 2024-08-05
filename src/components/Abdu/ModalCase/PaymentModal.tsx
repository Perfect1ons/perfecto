import { IPaymentMethod } from "@/types/Basket/PaymentMethod";
import styles from "./style.module.scss";
import cn from "clsx";
import { IVariableBuyer } from "@/interfaces/baskets/basketModal";

interface IDeliveryModalProps {
  paymentMethod: IPaymentMethod;
  selectPayment: (payment: { name: string; id: string | number }) => void;
  variableBuyer: IVariableBuyer;
}

const PaymentModal = ({
  paymentMethod,
  selectPayment,
  variableBuyer,
}: IDeliveryModalProps) => {
  return (
    <div className={styles.delivery__ways}>
      {Object.values(paymentMethod).map((item) => {
        return (
          <div key={item.id} style={{ width: "100%" }}>
            <button
              onClick={() =>
                selectPayment({
                  name: item.name,
                  id: item.id,
                })
              }
              aria-label="choose delivery point"
              className={cn(
                styles.wrap_courier_point,
                variableBuyer.payment.id === item.id &&
                  styles.wrap_courier_point_active
              )}
            >
              <span
                className={cn(
                  styles.wrap_courier_point_radio,
                  variableBuyer.payment.id === item.id &&
                    styles.wrap_courier_point_radio_active
                )}
              >
                <span
                  className={cn(
                    styles.wrap_courier_point_radio_dot,
                    variableBuyer.payment.id === item.id &&
                      styles.wrap_courier_point_radio_dot_active
                  )}
                ></span>
              </span>
              {item.name}
            </button>
            {item.desc && item.desc.length > 0 && (
              <div
                className={cn(
                  styles.wrap_courier_desc,
                  variableBuyer.payment.id === item.id &&
                    styles.wrap_courier_desc_active
                )}
              >
                <p className={styles.wrap_courier_desc_workdays}>{item.desc}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default PaymentModal;
