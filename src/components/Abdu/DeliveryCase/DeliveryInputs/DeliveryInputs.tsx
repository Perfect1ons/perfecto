import styles from "./style.module.scss";

const DeliveryInputs = () => {
  return (
    <>
      <div style={{ marginTop: "15px" }} className="containerInputLabel">
        <div className="mail__label">
          <input
            className="mail__inputField"
            name="street"
            type="text"
            required
          />
          <label className="mail__inputLabel">Улица</label>
        </div>
      </div>
      <div className={styles.inputs}>
        <div style={{ marginTop: "15px" }} className="containerInputLabel">
          <div className="mail__label">
            <input
              className="mail__inputField"
              name="house"
              type="text"
              required
            />
            <label className="mail__inputLabel">Дом</label>
          </div>
        </div>

        <div style={{ marginTop: "15px" }} className="containerInputLabel">
          <div className="mail__label">
            <input
              className="mail__inputField"
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
