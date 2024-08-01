import cn from "clsx";
import styles from "./style.module.scss";
import { DeliveryCurierIcon, DeliveryPlaceIcon } from "../../../../public/Icons/Icons";
import DeliveryToggler from "./DeliveryToggler";

interface ICurierModalProps {
  setView: (view: "delivery" | "curier") => void;
  close: () => void;
  view: string;
}

const CurierModal = ({ setView, close, view }: ICurierModalProps) => {
  return (
    <div>
      <DeliveryToggler setView={setView} view={view} />
    </div>
  );
};

export default CurierModal;
