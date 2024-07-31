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

interface ICartReducerBtnProps {
  data: Items;
  onCartEmpty: () => void;
  shouldFocusInput: boolean;
  onFocusHandled: () => void;
  id_cart?: string | null | undefined;
  price?: string;
  setItems?: React.Dispatch<React.SetStateAction<Model[]>>;
}

const CartReducerBtn = ({
  data,
  onCartEmpty,
  shouldFocusInput,
  onFocusHandled,
  id_cart,
  price,
  setItems,
}: ICartReducerBtnProps) => {
  const { token } = useContext(AuthContext);
  const [quantity, setQuantity] = useState<number>(data.kol || data.minQty);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const value = e.target.value;
    const parsedValue = value ? parseInt(value) : 0;

    if (!isNaN(parsedValue)) {
      setQuantity(parsedValue);
    }
  };
  useEffect(() => {
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");
    setQuantity(cart[data.id_tov] || data.minQty);
  }, [data.id_tov]);

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
    } else {
      await postBasketProduct(newQuantity, data.id_tov);
    }
    // Обновляем localStorage
    const cart = JSON.parse(localStorage.getItem("cart") || "{}");
    cart[data.id_tov] = newQuantity;
    localStorage.setItem("cart", JSON.stringify(cart));
  };

  const removeFromCart = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    if (quantity <= data.minQty) {
      const cart = JSON.parse(localStorage.getItem("cart") || "{}");
      delete cart[data.id_tov]; // Remove the item
      localStorage.setItem("cart", JSON.stringify(cart));
      setQuantity(0);
      if (token) {
        if (setItems && data.id_box) {
          await deleteBasketProductAuthed(token, data.id_box, data.id_tov)
            .then(() => {
              setItems((prevItems) =>
                prevItems.filter((i) => i.id_tov !== data.id_tov)
              );
            })
            .catch((error) => {
              console.error("Failed to remove item from cart:", error);
            });
        }
      } else {
        if (setItems) {
          await deleteBasketProduct(id_cart, data.id_tov)
            .then(() => {
              setItems((prevItems) =>
                prevItems.filter((i) => i.id_tov !== data.id_tov)
              );
            })
            .catch((error) => {
              console.error("Failed to remove item from cart:", error);
            });
        }
      }
      onCartEmpty();
    } else {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      const cart = JSON.parse(localStorage.getItem("cart") || "{}");
      cart[data.id_tov] = newQuantity;
      localStorage.setItem("cart", JSON.stringify(cart));

      if (token && data.id_box) {
        await patchBasketProductAuthed(token, data.id_box, newQuantity);
      } else {
        await postBasketProduct(newQuantity, data.id_tov);
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
