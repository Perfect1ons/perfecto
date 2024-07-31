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
} = basketSlice.actions;
export default basketSlice.reducer;
