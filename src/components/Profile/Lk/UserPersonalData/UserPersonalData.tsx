import styles from "./style.module.scss";

const UserPersonalData = () => {
  return (
    <div className={styles.containerPersonalData}>
      <div className={styles.inputContainer}>
        <input className={styles.inputField} type="text" required />
        <label className={styles.inputLabel}>Фамилия</label>
      </div>
      <div className={styles.inputContainer}>
        <input className={styles.inputField} type="text" required />
        <label className={styles.inputLabel}>Имя</label>
      </div>
      <div className={styles.inputContainer}>
        <input className={styles.inputField} type="text" required />
        <label className={styles.inputLabel}>Дата рождения</label>
      </div>
      <div className={styles.inputContainer}>
        <select defaultValue="" className={styles.cityContainer}>
          <option value="1">Бишкек</option>
          <option value="2">Ош</option>
          <option value="3">Чуйская область</option>
          <option value="4">Ошская область</option>
          <option value="5">Жалал-Абадская область</option>
          <option value="6">Баткенская область</option>
          <option value="7">Иссык-Кульская область</option>
          <option value="8">Нарынская область</option>
          <option value="9">Таласская область</option>
          <option value="10">Другое</option>
        </select>
      </div>
      <div className={styles.inputContainer}>
        <input className={styles.inputField} type="text" required />
        <label className={styles.inputLabel}>Адрес доставки</label>
      </div>
      <div className={styles.inputContainer}>
        <input className={styles.inputField} type="text" required />
        <label className={styles.inputLabel}>Мобильный номер</label>
      </div>
      <div className={styles.inputContainer}>
        <input className={styles.inputField} type="text" required />
        <label className={styles.inputLabel}>Место работы</label>
      </div>
      <div className={styles.inputContainer}>
        <input className={styles.inputField} type="text" required />
        <label className={styles.inputLabel}>Должность</label>
      </div>
      <div className={styles.inputContainer}>
        <input className={styles.inputField} type="text" required />
        <label className={styles.inputLabel}>Название организации, ИНН</label>
      </div>
      <div className={styles.inputContainer}>
        <input className={styles.inputField} type="text" required />
        <label className={styles.inputLabel}>Коментарии</label>
      </div>
      <div className={styles.inputContainer}>
        <input type="checkbox" required />
        <label className={styles.inputLabel}>Мне больше 18</label>
      </div>
      <p>* - поля, обязательные для заполнения.</p>
      <button>Сохранить</button>
    </div>
  );
};

export default UserPersonalData;
