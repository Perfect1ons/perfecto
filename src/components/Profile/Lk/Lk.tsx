import UserPersonalData from "./UserPersonalData/UserPersonalData";
import styles from "./style.module.scss";

const Lk = () => {
  return (
    <section className={styles.lk}>
      <div className="container">
        <div className={styles.informationContainer}>
          <UserPersonalData />
        </div>
      </div>
    </section>
  );
};

export default Lk;
