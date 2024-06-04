"use client";
import React, { useState } from "react";
import { Items } from "@/types/CardProduct/cardProduct";
import { MinusIcon, PlusIcon, TrashIcon } from "../../../../public/Icons/Icons";
import styles from "./style.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductQuantity,
  addProductToCart,
  deleteProductQuantity,
  removeProductFromCart,
  updateProductQuantity,
} from "@/store/reducers/cart.reducer";
import { RootState } from "@/store";

interface ICartReducerBtnProps {
  data: Items;
  onCartEmpty: () => void;
}

const CartReducerBtn = ({ data, onCartEmpty }: ICartReducerBtnProps) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const product = cart.find((item) => item.id === data.id);
  const [quantity, setQuantity] = useState(product?.quantity || data.minQty);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value ? parseInt(e.target.value) : 0;
    if (isNaN(value) || value < 0) return;

    setQuantity(value);
    if (value >= data.minQty) {
      if (product) {
        dispatch(updateProductQuantity({ id: data.id, quantity: value }));
      } else {
        const newProduct = { ...data, quantity: value };
        dispatch(addProductToCart(newProduct));
      }
    }
  };

  const addToCart = () => {
    if (product) {
      dispatch(addProductQuantity(data.id));
      setQuantity((prevQuantity) => prevQuantity + 1);
    } else {
      const newProduct = { ...data, quantity: data.minQty };
      dispatch(addProductToCart(newProduct));
      setQuantity(data.minQty);
    }
  };

  const removeFromCart = () => {
    if (product) {
      if (product.quantity && product.quantity <= data.minQty) {
        dispatch(removeProductFromCart(data.id));
        onCartEmpty();
        setQuantity(0);
      } else {
        dispatch(deleteProductQuantity(data.id));
        setQuantity((prevQuantity) => prevQuantity - 1);
      }
    }
  };

  return (
    <div className={styles.btn}>
      <button onClick={removeFromCart} className={styles.btn_left}>
        {product?.quantity && product.quantity <= data.minQty ? (
          <TrashIcon />
        ) : (
          <MinusIcon />
        )}
      </button>
      <input
        type="text"
        className={styles.btn_screen}
        value={quantity}
        onChange={handleChange}
        min={0}
      />
      <button onClick={addToCart} className={styles.btn_right}>
        <PlusIcon />
      </button>
    </div>
  );
};

export default CartReducerBtn;
