"use client";
import React, { useContext, useEffect, useRef, useState } from "react";
import { Items } from "@/types/CardProduct/cardProduct";
import { MinusIcon, PlusIcon, TrashIcon } from "../../../../public/Icons/Icons";
import styles from "./style.module.scss";
import useMediaQuery from "@/hooks/useMediaQuery";
import {
  deleteBasketProduct,
  deleteBasketProductAuthedIdTov,
  patchBasketProductAuthed,
  postBasketProduct,
  postBasketProductAuthedIdTov,
} from "@/api/clientRequest";
import { AuthContext } from "@/context/AuthContext";
import { postProductAuthResponse } from "@/types/Basket/postProductAuthResponse";
import { ResponsePostBasket } from "@/types/Basket/ResponsePostBasket";

interface ICartReducerBtnProps {
  data: Items;
  onCartEmpty: () => void;
  shouldFocusInput: boolean;
  onFocusHandled: () => void;
  id_cart?: string | null | undefined;
}

const CartReducerBtn = ({
  data,
  onCartEmpty,
  shouldFocusInput,
  onFocusHandled,
  id_cart,
}: ICartReducerBtnProps) => {
  const { token } = useContext(AuthContext);
  const [quantity, setQuantity] = useState<number>(0);
  const isDesktop = useMediaQuery("(min-width: 768px)");
  const inputRef = useRef<HTMLInputElement>(null);

  const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");
  const cartItemsGuest = JSON.parse(
    localStorage.getItem("cartItemsGuest") || "[]"
  );

  // Fetch and set the quantity from localStorage or basket
  useEffect(() => {
    const getStoredBasket = (key: string) => {
      return JSON.parse(localStorage.getItem(key) || "[]");
    };
    const findCardInBasket = (basket: any[], id: number) => {
      return basket.find((res: any) => parseInt(res.id_tov) === id);
    };
    const storedBasket = token
      ? getStoredBasket("cartItems")
      : getStoredBasket("cartItemsGuest");
    const kolCard = findCardInBasket(storedBasket, data.id_tov);
    if (kolCard) {
      setQuantity(parseInt(kolCard.quantity) || parseInt(kolCard.kol) || 0);
    } else {
      setQuantity(0);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.id_tov, data.minQty, token]);

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
    const updatedQuantity = Math.max(quantity, data.minQty);

    // Update the local state if needed
    if (token) {
      if (quantity !== updatedQuantity) {
        setQuantity(updatedQuantity);
      }
      // Update localStorage and server
      const itemIndex = cartItems.findIndex(
        (cartItem: any) => cartItem.id_tov === data.id_tov
      );

      if (itemIndex !== -1) {
        cartItems[itemIndex].quantity = updatedQuantity;
        cartItems[itemIndex].kol = updatedQuantity.toString();
        updateLocalStorage(cartItems);
      }
    } else {
      if (quantity !== updatedQuantity) {
        setQuantity(updatedQuantity);
      }
      // Update localStorage and server
      const itemIndex = cartItemsGuest.findIndex(
        (cartItem: any) => cartItem.id_tov === data.id_tov
      );

      if (itemIndex !== -1) {
        cartItemsGuest[itemIndex].quantity = updatedQuantity;
        cartItemsGuest[itemIndex].kol = updatedQuantity.toString();
        updateLocalStorage(cartItemsGuest);
      }
    }

    try {
      if (token && data.id_box) {
        await patchBasketProductAuthed(token, data.id_box, updatedQuantity);
      } else if (token && data.id_tov) {
        const item = await postBasketProductAuthedIdTov(
          token,
          data.id_tov,
          updatedQuantity
        );
        if (item) {
          const itemIndex = cartItems.findIndex(
            (cartItem: postProductAuthResponse) =>
              cartItem.id_tov === item.id_tov
          );
          if (itemIndex !== -1) {
            cartItems[itemIndex] = item;
          } else {
            cartItems.push(item);
          }
          updateLocalStorage(cartItems);
        }
      } else {
        const item = await postBasketProduct(updatedQuantity, data.id_tov);
        const itemIndex = cartItemsGuest.findIndex(
          (cartItem: ResponsePostBasket) => cartItem.id_tov === item.id_tov
        );
        if (itemIndex !== -1) {
          cartItemsGuest[itemIndex] = item;
        } else {
          cartItemsGuest.push(item);
        }
        updateLocalStorage(cartItemsGuest);
      }
    } catch (error) {
      console.error("Failed to update item quantity:", error);
    }
  };

  const updateLocalStorage = (updatedItems: any[]) => {
    if (token) {
      localStorage.setItem("cartItems", JSON.stringify(updatedItems));
    } else {
      localStorage.setItem("cartItemsGuest", JSON.stringify(updatedItems));
    }
  };

  const addToCart = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);

    try {
      if (token && data.id_tov) {
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
          } else {
            cartItems.push(item);
          }
          updateLocalStorage(cartItems);
        }
      } else {
        const item = await postBasketProduct(newQuantity, data.id_tov);
        const itemIndex = cartItemsGuest.findIndex(
          (cartItem: ResponsePostBasket) => cartItem.id_tov === item.id_tov
        );
        if (itemIndex !== -1) {
          cartItemsGuest[itemIndex] = item;
        } else {
          cartItemsGuest.push(item);
        }
        updateLocalStorage(cartItemsGuest);
      }
    } catch (error) {
      console.error("Failed to add item to cart:", error);
    }
  };

  const removeItemFromCart = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();

    if (quantity > 0) {
      const newQuantity = Math.max(0, quantity - 1);
      setQuantity(newQuantity);

      try {
        if (token && data.id_tov) {
          await deleteBasketProductAuthedIdTov(token, data.id_tov);
          const updatedItems = cartItems.filter(
            (cartItem: any) => cartItem.id_tov !== data.id_tov
          );
          updateLocalStorage(updatedItems);
        } else {
          await deleteBasketProduct(id_cart, data.id_tov);
          const updatedItems = cartItemsGuest.filter(
            (cartItem: any) => cartItem.id_tov !== data.id_tov
          );
          updateLocalStorage(updatedItems);
        }

        if (newQuantity === 0) {
          onCartEmpty();
        }
      } catch (error) {
        console.error("Failed to remove item from cart:", error);
      }
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

  const updateItemQuantityInCart = async (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.stopPropagation();
    event.preventDefault();

    const newQuantity = quantity - 1;
    setQuantity(newQuantity);

    try {
      if (token && data.id_tov) {
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
          updateLocalStorage(cartItems);
        }
      } else {
        const item = await postBasketProduct(newQuantity, data.id_tov);
        const itemIndex = cartItemsGuest.findIndex(
          (cartItem: ResponsePostBasket) =>
            cartItem.id_tov === item.id_tov.toString()
        );
        if (itemIndex !== -1) {
          cartItemsGuest[itemIndex] = item;
        }
        updateLocalStorage(cartItemsGuest);
      }
    } catch (error) {
      console.error("Failed to update item quantity in cart:", error);
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
