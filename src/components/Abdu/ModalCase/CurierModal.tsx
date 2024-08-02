import cn from "clsx";
import styles from "./style.module.scss";
import { IDeliveryMethod } from "@/types/Basket/DeliveryMethod";
import { IBuyer, ICityBuyer, IVariableBuyer } from "../Abdu";
import DeliveryInputs from "./DeliveryInputs/DeliveryInputs";
import { ICityFront } from "@/types/Basket/cityfrontType";
import { DeliveryArrowIcon } from "../../../../public/Icons/Icons";
import dynamic from "next/dynamic";
const CurierCitiesModal = dynamic(
  () => import("./CurierCitiesModal/CurierCitiesModal"),
  {
    ssr: false,
  }
);

interface IDeliveryModalProps {
  buyer: IBuyer;
  location: ICityBuyer;
  setCity: (newCity: { name: string; id: number }) => void;
  variableBuyer: IVariableBuyer;
  cities: ICityFront;
  selectDelivery: (delivery: { name: string; id: string | number }) => void;
  deliveryMethod: IDeliveryMethod;
  isCityModalVisible: boolean;
  closeCityModal: () => void;
  openCityModal: () => void;
  saveCity: () => void;
}

const CurierModal = ({
  buyer,
  saveCity,
  location,
  setCity,
  openCityModal,
  closeCityModal,
  isCityModalVisible,
  variableBuyer,
  selectDelivery,
  cities,
  deliveryMethod,
}: IDeliveryModalProps) => {
  return (
    <>
      <div className={styles.city}>
        <div className="containerInputLabel">
          <div
            style={{ cursor: "pointer" }}
            className="mail__label"
            onClick={() => openCityModal()}
          >
            <input
              className="mail__inputField"
              autoComplete="off"
              name="street"
              style={{ cursor: "pointer" }}
              value={
                buyer.id_city !== 0
                  ? buyer.city
                  : buyer.id_city !== location.id_city.id
                  ? buyer.city
                  : "Не выбрано"
              }
              type="text"
              required
            />
            <label className="mail__inputLabel">Город</label>
            <span
              className={cn(
                styles.arrow,
                isCityModalVisible && styles.arrow__active
              )}
            >
              <DeliveryArrowIcon />
            </span>
          </div>
        </div>
      </div>
      <CurierCitiesModal
        buyer={buyer}
        saveCity={saveCity}
        location={location}
        setCity={setCity}
        close={closeCityModal}
        isVisible={isCityModalVisible}
        cities={cities}
      />
      <DeliveryInputs />
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
              {item.desc && item.desc.length > 0 && (
                <div
                  className={cn(
                    styles.wrap_courier_desc,
                    variableBuyer.delivery.id === item.id &&
                      styles.wrap_courier_desc_active
                  )}
                >
                  <p className={styles.wrap_courier_desc_workdays}>
                    {item.desc}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </>
  );
};

export default CurierModal;
