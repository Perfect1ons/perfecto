"use client";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { Model } from "@/types/Basket/getBasketProduct";

interface CartState {
  basket: Model[];
  selected?: boolean;
}
const initialState: CartState = {
  basket: [], // Initialize cart state from local storage
  selected: false,
};

const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    setBasket: (state, action: PayloadAction<Model[]>) => {
      state.basket = action.payload;
    },
    removeItem: (state, action: PayloadAction<number>) => {
      state.basket = state.basket.filter(
        (item) => item.id_tov !== action.payload
      );
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
          product.quantity = Math.max(quantity + 1, minQty); // Убедитесь, что количество не меньше минимального
          localStorage.setItem("basket", JSON.stringify(state.basket));
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
        localStorage.setItem("basket", JSON.stringify(state.basket));
      }
    },
    toggleProductSelection: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const product = state.basket.find((p) => p.id === id);
      if (product) {
        product.selected = !product.selected; // Toggle selected state
        localStorage.setItem("basket", JSON.stringify(state.basket));
      }
    },
    toggleSelectAllProducts: (state) => {
      const allSelected = state.basket.every((product) => product.selected);
      state.basket.forEach((product) => {
        product.selected = !allSelected;
      });
      localStorage.setItem("basket", JSON.stringify(state.basket));
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
} = basketSlice.actions;
export default basketSlice.reducer;
