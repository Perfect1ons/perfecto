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
import { Model } from "@/types/Basket/getBasketProduct";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import { removeItem } from "@/store/reducers/basket.reducer";

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
  const loadQuantityFromLocalStorage = () => {
    const carts: { id_tov: number; kol: number }[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );
    const cartItem = carts.find((item) => item.id_tov === data.id_tov);
    if (cartItem) {
      setQuantity(cartItem.kol);
    }
  };

  useEffect(() => {
    loadQuantityFromLocalStorage();
  }, [data.id_tov]);
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
  const updateLocalStorageCart = (itemId: number, newQuantity: number) => {
    let carts: { id_tov: number; kol: number }[] = JSON.parse(
      localStorage.getItem("cart") || "[]"
    );

    const existingItemIndex = carts.findIndex((item) => item.id_tov === itemId);

    if (existingItemIndex > -1) {
      if (newQuantity <= 0) {
        carts.splice(existingItemIndex, 1);
      } else {
        carts[existingItemIndex].kol = newQuantity;
      }
    } else if (newQuantity > 0) {
      carts.push({ id_tov: itemId, kol: newQuantity });
    }

    localStorage.setItem("cart", JSON.stringify(carts));
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
    } else {
      await postBasketProduct(newQuantity, data.id_tov);
    }
    updateLocalStorageCart(data.id_tov, newQuantity);
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
        } else {
          await deleteBasketProduct(id_cart, data.id_tov);
        }
        dispatch(removeItem(data.id_tov));
        updateLocalStorageCart(data.id_tov, 0);
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

        updateLocalStorageCart(data.id_tov, newQuantity);
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
        value={quantity === 0 ? "" : quantity}
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
