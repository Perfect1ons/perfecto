"use client";
import { Items } from "@/types/CardProduct/cardProduct";
import { MinusIcon, PlusIcon, TrashIcon } from "../../../../public/Icons/Icons";
import styles from "./style.module.scss";
import { useDispatch } from "react-redux";
import { addProductToCart } from "@/store/reducers/cart.reducer";
import { useState } from "react";

interface ICartReducerBtnProps {
  data: Items;
  onCartEmpty: () => void;
}

const CartReducerBtn = ({ data, onCartEmpty }: ICartReducerBtnProps) => {
  const dispatch = useDispatch();

  const [count, setCount] = useState(1);

  const addToCart = () => {
    dispatch(addProductToCart(data));
    setCount((prevCount) => prevCount + 1);
  };

  const removeFromCart = () => {
    setCount((prevCount) => {
      const newCount = prevCount > 0 ? prevCount - 1 : 0;
      if (newCount === 0) {
        onCartEmpty();
      }
      return newCount;
    });
  };

  return (
    <div className={styles.btn}>
      <button onClick={removeFromCart} className={styles.btn_left}>
        {count <= 1 ? <TrashIcon /> : <MinusIcon />}
      </button>
      <span className={styles.btn_screen}>{count}</span>
      <button onClick={addToCart} className={styles.btn_right}>
        <PlusIcon />
      </button>
    </div>
  );
};

export default CartReducerBtn;
