import React, { useEffect, useRef, useState } from "react";
import { Items } from "@/types/CardProduct/cardProduct";
import { MinusIcon, PlusIcon, TrashIcon } from "../../../../public/Icons/Icons";
import styles from "./style.module.scss";
import useMediaQuery from "@/hooks/useMediaQuery";
import { deleteBasketProduct, postBasketProduct } from "@/api/clientRequest";

interface ICartReducerBtnProps {
  data: Items;
  onCartEmpty: () => void;
  shouldFocusInput: boolean;
  onFocusHandled: () => void;
}

const CartReducerBtn = ({
  data,
  onCartEmpty,
  shouldFocusInput,
  onFocusHandled,
}: ICartReducerBtnProps) => {
  const [quantity, setQuantity] = useState<number>(data.minQty);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const value = e.target.value;
    const parsedValue = value ? parseInt(value) : 0;

    if (!isNaN(parsedValue) && parsedValue >= data.minQty) {
      setQuantity(parsedValue);
      await postBasketProduct(parsedValue, data.id_tov);
    } else {
      setQuantity(0);
      await postBasketProduct(0, data.id_tov);
    }
  };

  const handleBlur = async () => {
    if (quantity === 0) {
      setQuantity(data.minQty);
      await postBasketProduct(data.minQty, data.id_tov);
    }
  };

  const addToCart = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    await postBasketProduct(newQuantity, data.id_tov);
  };

  const removeFromCart = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    if (quantity <= data.minQty) {
      setQuantity(0);
      await deleteBasketProduct("162138", data.id_tov);
      onCartEmpty();
    } else {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      await deleteBasketProduct("162138", data.id_tov);
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
        value={quantity === 0 ? "" : data.kol}
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
