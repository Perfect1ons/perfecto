"use client";
import React, { useContext, useEffect, useMemo, useRef, useState } from "react";
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
import {
  deleteAuthedTovars,
  deleteTovar,
  postAuthedTovar,
  postTovar,
} from "@/api/clientRequest";
import { AuthContext } from "@/context/AuthContext";

interface ICartReducerBtnProps {
  removeItem?: () => void;
  token?: any;
  cartId?: any;
  data: IItemItems;
  shouldFocusInput: boolean;
  onFocusHandled: () => void;
}

const ReducerBtn = ({
  removeItem,
  cartId: idCart,
  data,
  token,
  shouldFocusInput,
  onFocusHandled,
}: ICartReducerBtnProps) => {
  const dispatch = useDispatch();
  const { cartId } = useContext(AuthContext);
  const cart = useSelector((state: RootState) => state.cart.cart);
  const product = cart.find((item) => item.id === data.id);
  const [inputValue, setInputValue] = useState<string>(
    product?.quantity?.toString() ?? data.minQty.toString()
  );
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const debouncedUpdateTovar = useMemo(
    () =>
      debounce(async (id_tov: number, value: number) => {
        try {
          if (token) {
            await postAuthedTovar(token, id_tov, value);
          } else {
            await postTovar(id_tov, value);
          }
        } catch (error) {
          console.error("Error updating tovar:", error);
          // Можно добавить обработку ошибок, например, уведомления пользователю
        }
      }, 300),
    [token]
  );

  const debounceUpdateTovar = useMemo(
    () =>
      debounce(async (id_tov: number, value: number) => {
        try {
          if (!token) {
            await postTovar(id_tov, value);
          }
        } catch (error) {
          console.error("Error updating tovar:", error);
        }
      }, 300),
    [token]
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    e.preventDefault();

    const value = e.target.value === "" ? 0 : parseInt(e.target.value);

    if (isNaN(value) || value < 0) return;

    // Ограничение значения ввода не больше чем доступное количество
    const finalQuantity = Math.min(value, Number(product?.balance) || value);

    setInputValue(e.target.value);

    if (value >= data.minQty) {
      if (product) {
        dispatch(
          updateProductQuantity({ id: data.id, quantity: finalQuantity })
        );
        debouncedUpdateTovar(data.id_tov, finalQuantity);
      } else {
        const newProduct = { ...data, quantity: finalQuantity };
        dispatch(addProductToCart(newProduct));
        debouncedUpdateTovar(data.id_tov, finalQuantity);
      }
    }
  };

  const handleBlur = useMemo(
    () =>
      debounce(() => {
        const numericInputValue = Number(inputValue);
        let finalQuantity: number;

        if (product) {
          finalQuantity = Math.min(
            Number(product.balance) || 0,
            Math.max(numericInputValue, data.minQty)
          );
          if (product.quantity !== finalQuantity) {
            dispatch(
              updateProductQuantity({ id: data.id, quantity: finalQuantity })
            );
          }
        } else {
          finalQuantity = Math.min(Number(data.balance) || 0, data.minQty);
          if (numericInputValue !== finalQuantity) {
            dispatch(
              updateProductQuantity({ id: data.id, quantity: finalQuantity })
            );
          }
        }

        setInputValue(finalQuantity.toString());
      }, 500),
    [product, data.minQty, inputValue, dispatch, data.id, data.balance]
  );

  const addToCart = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();

    if (product) {
      const newQuantity = Math.min(
        (product.quantity ?? 0) + 1,
        Number(product.balance) || (product.quantity ?? 0) + 1
      );
      dispatch(addProductQuantity(data.id));
      setInputValue(newQuantity.toString());
      if (token) {
        debouncedUpdateTovar(data.id_tov, newQuantity);
      } else {
        debounceUpdateTovar(data.id_tov, newQuantity);
      }
    } else {
      const newProduct = { ...data, quantity: data.minQty };
      dispatch(addProductToCart(newProduct));
      setInputValue(data.minQty.toString());
      if (token) {
        debouncedUpdateTovar(data.id_tov, data.minQty);
      } else {
        debounceUpdateTovar(data.id_tov, data.minQty);
      }
    }
  };

  const removeFromCart = async () => {
    try {
      if (product) {
        const currentQuantity = product.quantity ?? 0;
        if (currentQuantity <= data.minQty) {
          dispatch(removeProductFromCart(data.id));
          if (token) {
            await deleteAuthedTovars(token, data.id_tov.toString());
          } else {
            await deleteTovar(cartId, data.id_tov);
          }
          setInputValue(data.minQty.toString()); // Устанавливаем значение инпута в минимальное количество
        } else {
          const newQuantity = Math.max(currentQuantity - 1, data.minQty);
          dispatch(deleteProductQuantity(data.id));
          setInputValue(newQuantity.toString()); // Обновляем значение инпута после уменьшения количества
          if (token) {
            debouncedUpdateTovar(data.id_tov, newQuantity);
          } else {
            debounceUpdateTovar(data.id_tov, newQuantity);
          }
        }
      }
    } catch (error) {
      console.error("Error removing from cart:", error);
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (shouldFocusInput && inputRef.current && isDesktop) {
      inputRef.current.focus();
      onFocusHandled(); // Сброс состояния фокуса
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
        value={inputValue}
        onChange={handleChange}
        onBlur={() => handleBlur()}
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
