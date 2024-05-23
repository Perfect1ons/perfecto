"use client";
import { useState } from "react";
import styles from "./style.module.scss";

interface IReviewModal {
  func: () => void;
}

interface IUser {
  dost?: string;
  nedost?: string;
  name: string;
  comment: string;
}

const ReviewModal = ({ func }: IReviewModal) => {
  const [otz, setOtz] = useState<IUser>({
    dost: "",
    nedost: "",
    name: "",
    comment: "",
  });

  console.log(otz);

  const [isAnomim, setIsAnonim] = useState(false);

  const ChangeHandler = (event: any) => {
    setOtz((otz) => {
      return {
        ...otz,
        [event.target.name]: event.target.value,
      };
    });
  };

  const SendOtz = (e: any) => {
    e.preventDefault();
    setOtz(otz);
    func();
  };

  return (
    <div className={styles.modal}>
      <div className={styles.wrapper}>
        <button onClick={func} className={styles.wrapper_cross}>
          ×
        </button>
        <div className={styles.wrapper_ocenka}></div>
        <div className={styles.wrapper_areas}>
          <div className={styles.wrapper_areas_block}>
            <span className={styles.wrapper_areas_block_title}>
              Достоинства
            </span>
            <textarea
              onChange={ChangeHandler}
              name="dost"
              id="dost"
              className={styles.wrapper_areas_block_area}
            ></textarea>
          </div>
          <div className={styles.wrapper_areas_block}>
            <span className={styles.wrapper_areas_block_title}>Недостатки</span>
            <textarea
              onChange={ChangeHandler}
              name="nedost"
              id="nedost"
              className={styles.wrapper_areas_block_area}
            ></textarea>
          </div>
        </div>
        <div className={styles.wrapper_inputs}>
          <input
            name="name"
            placeholder="Ваше имя*"
            onChange={ChangeHandler}
            type="text"
            className={styles.wrapper_inputs_name}
          />
          <input
            name="comment"
            placeholder="Добавить комментарии*"
            onChange={ChangeHandler}
            type="text"
            className={styles.wrapper_inputs_comm}
          />
        </div>
        <button
          onClick={SendOtz}
          disabled={
            otz.name.length == 0 || otz.comment.length == 0 ? true : false
          }
          className={styles.wrapper_sendBtn}
        >
          Отправить
        </button>
      </div>
    </div>
  );
};

export default ReviewModal;
