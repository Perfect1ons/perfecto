"use client";
import { Items } from "@/types/CardProduct/cardProduct";
import { MinusIcon, PlusIcon, TrashIcon } from "../../../../public/Icons/Icons";
import styles from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductQuantity,
  addProductToCart,
  deleteProductQuantity,
  removeProductFromCart,
} from "@/store/reducers/cart.reducer";
import { useState } from "react";
import { RootState } from "@/store";

interface ICartReducerBtnProps {
  data: Items;
  onCartEmpty: () => void;
}

const CartReducerBtn = ({ data, onCartEmpty }: ICartReducerBtnProps) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const product = cart.find((item) => item.id === data.id);

  const addToCart = () => {
    if (product) {
      dispatch(addProductQuantity(data.id));
    } else {
      dispatch(addProductToCart(data));
    }
  };

  const removeFromCart = () => {
    if (product) {
      if (product.quantity === 1) {
        dispatch(removeProductFromCart(data.id));
        onCartEmpty();
      } else {
        dispatch(deleteProductQuantity(data.id));
      }
    }
  };

  return (
    <div className={styles.btn}>
      <button onClick={removeFromCart} className={styles.btn_left}>
        {product?.quantity && product.quantity <= 1 ? (
          <TrashIcon />
        ) : (
          <MinusIcon />
        )}
      </button>
      <span className={styles.btn_screen}>{product?.quantity || 0}</span>
      <button onClick={addToCart} className={styles.btn_right}>
        <PlusIcon />
      </button>
    </div>
  );
};

export default CartReducerBtn;
