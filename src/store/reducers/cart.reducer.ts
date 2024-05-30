"use client";
import { BasketProduct, Items } from "@/types/CardProduct/cardProduct";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
interface CartState {
  cart: Items[];
}

const initialState: CartState = {
  cart: [] || null,
};
const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<Items>) => {
      state.cart.push(action.payload);
    },
    removeProductFromCart: (state, action: PayloadAction<Items>) => {
      state.cart = state.cart.filter(
        (product: any) => product.id !== action.payload
      );
    },
    clearCart: (state) => {
      state.cart = [];
    },
  },
});
export const { addProductToCart, clearCart, removeProductFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
