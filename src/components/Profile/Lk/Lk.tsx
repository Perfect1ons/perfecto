import ChangePassword from "./ChangePassword/ChangePassword";
import UserPersonalData from "./UserPersonalData/UserPersonalData";
import styles from "./style.module.scss";

const Lk = () => {
  return (
    <section className={styles.lk}>
      <div className="container">
        <div className={styles.informationContainer}>
          <UserPersonalData />
          <ChangePassword />
        </div>
      </div>
    </section>
  );
};

export default Lk;
