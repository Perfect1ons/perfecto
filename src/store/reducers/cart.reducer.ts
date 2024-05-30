"use client";
import { BasketProduct } from "@/types/CardProduct/cardProduct";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface CartState {
  cart: BasketProduct[];
}

const initialState: CartState = {
  cart: [] || null,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<BasketProduct>) => {
      state.cart.push(action.payload);
    },
    removeProductFromCart: (state, action: PayloadAction<BasketProduct>) => {
      state.cart = state.cart.filter(
        (product: any) => product.id !== action.payload
      );
    },
    addProductQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const product = state.cart.find((p) => p.id === id);
      if (product) {
        product.number += 1;
      }
    },
    deleteProductQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const product = state.cart.find((p) => p.id === id);
      if (product && product.number > 0) {
        product.number -= 1;
        if (product.number === 0) {
          state.cart = state.cart.filter((p) => p.id !== id);
        }
      }
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});
export const {
  addProductToCart,
  clearCart,
  removeProductFromCart,
  addProductQuantity,
  deleteProductQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
