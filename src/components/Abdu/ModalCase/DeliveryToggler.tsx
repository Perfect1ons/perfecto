import {
  DeliveryCurierIcon,
  DeliveryPlaceIcon,
} from "../../../../public/Icons/Icons";
import styles from "./style.module.scss";
import cn from "clsx";

interface IDeliveryTogglerProps {
  setView: (view: "delivery" | "curier") => void;
  view: string;
  close: () => void;
}

const DeliveryToggler = ({ setView, view, close }: IDeliveryTogglerProps) => {
  const changeView = () => {
    close();
    setView("delivery");
  };

  return (
    <div className={styles.buttons}>
      <button
        onClick={() => setView("curier")}
        className={cn(styles.button, view === "curier" && styles.active)}
      >
        <DeliveryCurierIcon />
        Курьером
      </button>
      <button
        onClick={changeView}
        className={cn(styles.button, view === "delivery" && styles.active)}
      >
        <DeliveryPlaceIcon />
        Пункт выдачи
      </button>
    </div>
  );
};

export default DeliveryToggler;
