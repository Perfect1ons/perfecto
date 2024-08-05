import { ChangeEvent } from "react";
import styles from "./style.module.scss";
import { ICityBuyer } from "@/interfaces/baskets/basketModal";

interface IDeliveryInputsProps {
  changeAdress: (e: ChangeEvent<HTMLInputElement>) => void;
  location: ICityBuyer;
}

const DeliveryInputs = ({ changeAdress, location }: IDeliveryInputsProps) => {
  return (
    <>
      <div className={styles.inputs}>
        <div className="containerInputLabel">
          <div className="mail__label">
            <input
              className="mail__inputField"
              autoComplete="off"
              name="street"
              value={location.directory.street}
              type="text"
              required
              onChange={changeAdress}
            />
            <label className="mail__inputLabel">Улица</label>
          </div>
        </div>
      </div>
      <div className={styles.inputs}>
        <div className="containerInputLabel">
          <div className="mail__label">
            <input
              className="mail__inputField"
              value={location.directory.house}
              autoComplete="off"
              name="house"
              type="text"
              required
              onChange={changeAdress}
            />
            <label className="mail__inputLabel">Дом</label>
          </div>
        </div>
        <div className="containerInputLabel">
          <div className="mail__label">
            <input
              className="mail__inputField"
              autoComplete="off"
              name="apartament"
              value={location.directory.apartament}
              type="text"
              onChange={changeAdress}
              required
            />
            <label className="mail__inputLabel">Квартира</label>
          </div>
        </div>
      </div>
    </>
  );
};

export default DeliveryInputs;
