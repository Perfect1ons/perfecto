"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CartState {
  basket: any[];
  selected?: boolean;
}

const initialState: CartState = {
  basket: [], // Initialize cart state from local storage
  selected: false,
};
const cartItems = JSON.parse(localStorage.getItem("cartItems") || "[]");

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action: PayloadAction<any>) => {
      const product = action.payload;
      const existingProduct = state.basket.find(
        (p) => p.id_tov === product.id_tov
      );
      if (existingProduct) {
        if (product.kol !== undefined) {
          existingProduct.quantity = product.kol;
        } else {
          existingProduct.quantity =
            (existingProduct.quantity || 1) + (product.minQty || 1);
        }
      } else {
        state.basket.push({
          ...product,
          quantity: product.minQty || 1,
        });
      }
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.basket = state.basket.filter(
        (item) => item.id_tov !== action.payload
      );
      const cartDelete = cartItems.filter(
        (dataLocal: any) => dataLocal.id_tov !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(cartDelete));
    },
    clearBasket: (state, action: PayloadAction<number[]>) => {
      state.basket = state.basket.filter(
        (item) => !action.payload.includes(item.id_tov)
      );
    },
    addProductQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const product = state.basket.find((p) => p.id_tov === id);

      if (product) {
        const quantity = product.quantity || 0;
        const balance = Number(product.balance) || 0;
        const minQty = product.minQty || 1; // Убедитесь, что minQty существует и имеет значение по умолчанию

        if (quantity < balance) {
          product.quantity = Math.max(quantity + 1, minQty);
        }
      }
    },

    deleteProductQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const product = state.basket.find((p) => p.id_tov === id);
      if (product && product.quantity) {
        const minQty = product.minQty || 1;
        if (product.quantity > minQty) {
          product.quantity -= 1;
        } else if (product.quantity === minQty) {
          state.basket = state.basket.filter((p) => p.id !== id);
        }
      }
    },
    clearSelectedProducts: (state) => {
      state.basket = state.basket.filter((product) => !product.selected);
    },
    toggleProductSelection: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const product = state.basket.find((p) => p.id === id);
      if (product) {
        product.selected = !product.selected;
      }
    },
    toggleSelectAllProducts: (state) => {
      const allSelected = state.basket.every((product) => product.selected);
      state.basket.forEach((product) => {
        product.selected = !allSelected;
      });
    },
  },
});

export const {
  setBasket,
  clearBasket,
  removeItem,
  toggleProductSelection,
  toggleSelectAllProducts,
  addProductQuantity,
  deleteProductQuantity,
  clearSelectedProducts,
} = basketSlice.actions;
export default basketSlice.reducer;
