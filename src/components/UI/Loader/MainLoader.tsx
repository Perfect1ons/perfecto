import styles from "./style.module.scss";

const MainLoader = () => {
  return (
    <div className={styles.main__loader_container}>
      <div className={styles.main__loader}></div>
    </div>
  );
};

export default MainLoader;
