"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Items } from "@/types/CardProduct/cardProduct";
import { MinusIcon, PlusIcon, TrashIcon } from "../../../../public/Icons/Icons";
import styles from "./style.module.scss";
import useMediaQuery from "@/hooks/useMediaQuery";
import {
  deleteBasketProduct,
  deleteBasketProductAuthed,
  patchBasketProductAuthed,
  postBasketProduct,
} from "@/api/clientRequest";
import { AuthContext } from "@/context/AuthContext";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductQuantity,
  removeItem,
} from "@/store/reducers/basket.reducer";
import { addProductQuantity } from "@/store/reducers/basket.reducer";

interface ICartReducerBtnProps {
  data: Items;
  onCartEmpty: () => void;
  shouldFocusInput: boolean;
  onFocusHandled: () => void;
  id_cart?: string | null | undefined;
  price?: string;
}

const CartReducerBtn = ({
  data,
  onCartEmpty,
  shouldFocusInput,
  onFocusHandled,
  id_cart,
  price,
}: ICartReducerBtnProps) => {
  const dispatch = useDispatch();
  const basket = useSelector((state: RootState) => state.basket.basket);
  const { token } = useContext(AuthContext);
  const [quantity, setQuantity] = useState<number>(data.kol || data.minQty);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    const item = basket.find((item) => item.id_tov === data.id_tov);
    if (item) {
      setQuantity(item.kol || item.quantity);
    } else {
      setQuantity(0);
    }
  }, [basket, data.id_tov, data.minQty]);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const value = e.target.value;
    const parsedValue = value ? parseInt(value) : 0;

    if (!isNaN(parsedValue)) {
      setQuantity(parsedValue);
    }
  };
  const handleBlur = async () => {
    setQuantity(data.minQty);
  };

  const addToCart = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    if (token && data.id_box) {
      await patchBasketProductAuthed(token, data.id_box, newQuantity);
      dispatch(addProductQuantity(data.id_tov));
    } else {
      await postBasketProduct(newQuantity, data.id_tov);
      dispatch(addProductQuantity(data.id_tov));
    }
  };
  const removeFromCart = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();

    if (quantity <= data.minQty) {
      setQuantity(0);

      try {
        if (token && data.id_box) {
          await deleteBasketProductAuthed(token, data.id_box, data.id_tov);
          dispatch(deleteProductQuantity(data.id_tov));
        } else {
          await deleteBasketProduct(id_cart, data.id_tov);
          dispatch(deleteProductQuantity(data.id_tov));
        }
        dispatch(removeItem(data.id_tov));
        onCartEmpty();
      } catch (error) {
        console.error("Failed to remove item from cart:", error);
      }
    } else {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);

      try {
        if (token && data.id_box) {
          await patchBasketProductAuthed(token, data.id_box, newQuantity);
        } else {
          await postBasketProduct(newQuantity, data.id_tov);
        }
      } catch (error) {
        console.error("Failed to update item quantity in cart:", error);
      }
    }
  };

  useEffect(() => {
    if (shouldFocusInput && inputRef.current && isDesktop) {
      inputRef.current.focus();
      onFocusHandled();
    }
  }, [shouldFocusInput, onFocusHandled, isDesktop]);
  return (
    <div className={styles.btn}>
      <button
        title={
          quantity <= data.minQty
            ? "удалить товар из корзины"
            : "уменьшить количество товара"
        }
        aria-label={
          quantity <= data.minQty
            ? "removing an item from the cart"
            : "decreasing items in cart"
        }
        onClick={removeFromCart}
        className={styles.btn_left}
      >
        {quantity <= data.minQty ? <TrashIcon /> : <MinusIcon />}
      </button>
      <input
        type="text"
        className={styles.btn_screen}
        value={quantity}
        onChange={handleChange}
        onBlur={handleBlur}
        min={0}
        ref={inputRef}
      />
      <button
        aria-label="increasing items in cart"
        title="увеличить количество товара"
        onClick={addToCart}
        className={styles.btn_right}
      >
        <PlusIcon />
      </button>
    </div>
  );
};

export default CartReducerBtn;
