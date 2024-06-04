"use client";
import { Items } from "@/types/CardProduct/cardProduct";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface CartState {
  cart: Items[];
}

const initialState: CartState = {
  cart: [],
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<Items>) => {
      const product = action.payload;
      const existingProduct = state.cart.find((p) => p.id === product.id);
      if (existingProduct) {
        existingProduct.quantity =
          (existingProduct.quantity || 1) + product.minQty;
      } else {
        state.cart.push({ ...product, quantity: product.minQty });
      }
    },
    removeProductFromCart: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.cart = state.cart.filter((product) => product.id !== id);
    },
    addProductQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const product = state.cart.find((p) => p.id === id);
      if (product) {
        product.quantity = (product.quantity || 1) + 1;
      }
    },
    deleteProductQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const product = state.cart.find((p) => p.id === id);
      if (product && product.quantity) {
        const minQty = product.minQty || 1; // Используем 1, если minQty отсутствует
        if (product.quantity > minQty) {
          product.quantity -= 1;
        } else if (product.quantity === minQty) {
          state.cart = state.cart.filter((p) => p.id !== id);
        }
      }
    },
    updateProductQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const product = state.cart.find((p) => p.id === id);
      if (product) {
        product.quantity = quantity;
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
  updateProductQuantity,
} = cartSlice.actions;
export default cartSlice.reducer;
