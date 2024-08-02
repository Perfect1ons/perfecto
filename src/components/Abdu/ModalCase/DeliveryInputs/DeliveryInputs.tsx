import styles from "./style.module.scss";

const DeliveryInputs = () => {
  return (
    <>
      <div className={styles.inputs}>
        <div className="containerInputLabel">
          <div className="mail__label">
            <input
              className="mail__inputField"
              autoComplete="off"
              name="street"
              type="text"
              required
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
              autoComplete="off"
              name="house"
              type="text"
              required
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
              type="text"
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
