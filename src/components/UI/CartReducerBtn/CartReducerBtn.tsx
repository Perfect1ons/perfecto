"use client";
import { Items } from "@/types/CardProduct/cardProduct";
import { TrashIcon } from "../../../../public/Icons/Icons";
import styles from "./style.module.scss";
import { useDispatch } from "react-redux";
import { addProductToCart } from "@/store/reducers/cart.reducer";

interface ICartReducerBtnProps {
  data: Items;
}

const CartReducerBtn = ({ data }: ICartReducerBtnProps) => {
  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(addProductToCart(data));
  };

  return (
    <div className={styles.btn}>
      <button className={styles.btn_left}>
        <TrashIcon />
      </button>
      <span className={styles.btn_screen}></span>
      <button onClick={addToCart} className={styles.btn_right}>
        +
      </button>
    </div>
  );
};

export default CartReducerBtn;
