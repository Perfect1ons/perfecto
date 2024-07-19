"use client";
import React, { useEffect, useRef } from "react";
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
import useMediaQuery from "@/hooks/useMediaQuery";

interface ICartReducerBtnProps {
  data: Items;
  onCartEmpty: () => void;
  shouldFocusInput: boolean; // Changed from function to boolean
  onFocusHandled: () => void; // Callback to reset focus state
}

const CartReducerBtn = ({
  data,
  onCartEmpty,
  shouldFocusInput,
  onFocusHandled,
}: ICartReducerBtnProps) => {
  // логика добавления в корзину
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const product = cart.find((item) => item.id === data.id);
  const quantity = product?.quantity ?? data.minQty;

  const isDesktop = useMediaQuery("(min-width: 768px)");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();
    const value = e.target.value;
    const parsedValue = value ? parseInt(value) : 0;

    // Если инпут пустой, устанавливаем значение в 0
    if (value === "" && product) {
      dispatch(updateProductQuantity({ id: data.id, quantity: 0 }));
    } else if (!isNaN(parsedValue) && parsedValue >= data.minQty) {
      if (product) {
        dispatch(updateProductQuantity({ id: data.id, quantity: parsedValue }));
      } else {
        const newProduct = { ...data, quantity: parsedValue };
        dispatch(addProductToCart(newProduct));
      }
    }
  };
  const handleBlur = () => {
    if (product && product.quantity === 0) {
      dispatch(updateProductQuantity({ id: data.id, quantity: data.minQty }));
    }
  };
  // add to redux cart storage function
  const addToCart = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    if (product) {
      dispatch(addProductQuantity(data.id));
    } else {
      const newProduct = { ...data, quantity: data.minQty };
      dispatch(addProductToCart(newProduct));
    }
  };

  // remove from redux cart storage function
  const removeFromCart = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    if (product) {
      if (product.quantity && product.quantity <= data.minQty) {
        dispatch(removeProductFromCart(data.id));
        onCartEmpty();
      } else {
        dispatch(deleteProductQuantity(data.id));
      }
    }
  };

  // перевод фокуса на инпут
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (shouldFocusInput && inputRef.current && isDesktop) {
      inputRef.current.focus();
      onFocusHandled(); // Reset focus state
    }
  }, [shouldFocusInput, onFocusHandled, isDesktop]);

  return (
    <div className={styles.btn}>
      <button
        title={
          product?.quantity && product.quantity <= data.minQty
            ? "удалить товар из корзины"
            : "уменьшить количество товара"
        }
        aria-label={
          product?.quantity && product.quantity <= data.minQty
            ? "removing an item from the cart"
            : "decreasing items in cart"
        }
        onClick={removeFromCart}
        className={styles.btn_left}
      >
        {product?.quantity && product.quantity <= data.minQty ? (
          <TrashIcon />
        ) : (
          <MinusIcon />
        )}
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
