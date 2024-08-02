"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Items } from "@/types/CardProduct/cardProduct";
import { MinusIcon, PlusIcon, TrashIcon } from "../../../../public/Icons/Icons";
import styles from "./style.module.scss";
import useMediaQuery from "@/hooks/useMediaQuery";
import {
  deleteBasketProduct,
  deleteBasketProductAuthed,
  deleteBasketProductAuthedIdTov,
  patchBasketProductAuthed,
  postBasketProduct,
  postBasketProductAuthedIdTov,
} from "@/api/clientRequest";
import { AuthContext } from "@/context/AuthContext";
import { RootState } from "@/store";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductQuantity,
  removeItem,
} from "@/store/reducers/basket.reducer";
import { addProductQuantity } from "@/store/reducers/basket.reducer";
import { postProductAuthResponse } from "@/types/Basket/postProductAuthResponse";

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

  let cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

  useEffect(() => {
    const storedBasket = JSON.parse(localStorage.getItem("cartItems") || "[]");
    const kolCard = storedBasket.find((res: any) => res.id_tov === data.id_tov);
    if (kolCard) {
      setQuantity(kolCard.quantity || kolCard.kol || 0);
    } else {
      setQuantity(0);
    }
  }, [data.id_tov, data.minQty]);
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
    } else if (token && data.id_tov) {
      const item = await postBasketProductAuthedIdTov(
        token,
        data.id_tov,
        newQuantity
      );
      if (item) {
        const itemIndex = cartItems.findIndex(
          (cartItem: postProductAuthResponse) => cartItem.id_tov === item.id_tov
        );

        if (itemIndex !== -1) {
          cartItems[itemIndex] = item;
        }

        localStorage.setItem("cartItems", JSON.stringify(cartItems));
      }
    } else {
      await postBasketProduct(newQuantity, data.id_tov);
    }
  };

  const removeItemFromCart = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();

    if (quantity >= data.minQty) {
      setQuantity(0);

      try {
        if (token && data.id_tov) {
          const item = await deleteBasketProductAuthedIdTov(token, data.id_tov);
          if (item) {
            let cartItems = JSON.parse(
              localStorage.getItem("cartItems") || "[]"
            );

            const itemIndex = cartItems.findIndex(
              (cartItem: postProductAuthResponse) =>
                cartItem.id_tov === item.id_tov
            );

            if (itemIndex !== -1) {
              cartItems[itemIndex] = item;
            }

            localStorage.setItem("cartItems", JSON.stringify(cartItems));
          }
        } else {
          await deleteBasketProduct(id_cart, data.id_tov);
        }

        onCartEmpty();
      } catch (error) {
        console.error("Failed to remove item from cart:", error);
      }
    }
  };

  const updateItemQuantityInCart = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();

    const newQuantity = quantity - 1;
    setQuantity(newQuantity);

    try {
      if (token && data.id_box) {
        await postBasketProduct(newQuantity, data.id_tov);
      } else {
        const item = await postBasketProductAuthedIdTov(
          token,
          data.id_tov,
          newQuantity
        );
        if (item) {
          const itemIndex = cartItems.findIndex(
            (cartItem: postProductAuthResponse) =>
              cartItem.id_tov === item.id_tov
          );

          if (itemIndex !== -1) {
            cartItems[itemIndex] = item;
          }

          localStorage.setItem("cartItems", JSON.stringify(cartItems));
        }
      }
    } catch (error) {
      console.error("Failed to update item quantity in cart:", error);
    }
  };

  const handleCartAction = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    if (quantity <= data.minQty) {
      await removeItemFromCart(event);
    } else {
      await updateItemQuantityInCart(event);
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
        onClick={handleCartAction}
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
