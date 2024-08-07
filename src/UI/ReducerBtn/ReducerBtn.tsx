"use client";
import React, { useEffect, useMemo, useRef } from "react";
import { MinusIcon, PlusIcon, TrashIcon } from "../../../public/Icons/Icons";
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
import { IItemItems } from "@/types/CardProduct/cardProduct";
import debounce from "lodash.debounce";
import { deleteAuthedTovars, postAuthedTovar } from "@/api/clientRequest";
interface ICartReducerBtnProps {
  removeItem?: () => void;
  token?: any;
  data: IItemItems;
  shouldFocusInput: boolean;
  onFocusHandled: () => void;
}

const ReducerBtn = ({
  removeItem,
  data,
  token,
  shouldFocusInput,
  onFocusHandled,
}: ICartReducerBtnProps) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: RootState) => state.cart.cart);
  const product = cart.find((item) => item.id === data.id);
  const quantity = product?.quantity ?? data.minQty;
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const debouncedUpdateTovar = useMemo(
    () =>
      debounce(async (id_tov: number, value: number) => {
        if (token) {
          await postAuthedTovar(token, id_tov, value);
        }
      }, 300),
    [token] // Здесь все зависимости, от которых зависит функция
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const value = e.target.value === "" ? 0 : parseInt(e.target.value); // Обрабатываем пустую строку как 0

    if (isNaN(value) || value < 0) return;

    if (value >= data.minQty) {
      if (product) {
        dispatch(updateProductQuantity({ id: data.id, quantity: value }));
        debouncedUpdateTovar(data.id_tov, value);
      } else {
        const newProduct = { ...data, quantity: value };
        dispatch(addProductToCart(newProduct));
        debouncedUpdateTovar(data.id_tov, value);
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
      const newQuantity = (product.quantity ?? 0) + 1;
      dispatch(addProductQuantity(data.id));
      debouncedUpdateTovar(data.id_tov, newQuantity);
    } else {
      const newProduct = { ...data, quantity: data.minQty };
      dispatch(addProductToCart(newProduct));
      debouncedUpdateTovar(data.id_tov, data.minQty);
    }
  };

  // remove from redux cart storage function
  const removeFromCart = async () => {
    if (product) {
      const currentQuantity = product.quantity ?? 0;
      if (currentQuantity <= data.minQty) {
        dispatch(removeProductFromCart(data.id));
        await deleteAuthedTovars(token, data.id_tov.toString());
      } else {
        dispatch(deleteProductQuantity(data.id));
        debouncedUpdateTovar(data.id_tov, currentQuantity - 1);
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

export default ReducerBtn;
