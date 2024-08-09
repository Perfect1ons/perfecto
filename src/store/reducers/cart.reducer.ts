import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IItemItems } from "@/types/CardProduct/cardProduct";

interface CartState {
  cart: IItemItems[];
  selected?: boolean;
}

const loadCartFromLocalStorage = (cartData: IItemItems[] = []): IItemItems[] => {
  if (typeof window === "undefined") {
    return [];
  }
  const savedCart = localStorage.getItem("basket");
  return savedCart ? JSON.parse(savedCart) : cartData;
};


const initialState: CartState = {
  cart: loadCartFromLocalStorage(), // Без аргумента
  selected: false,
};


const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<IItemItems>) => {
      const product = action.payload;
      const existingProduct = state.cart.find((p) => p.id === product.id);
      if (existingProduct) {
        existingProduct.quantity = product.minQty;
      } else {
        state.cart.push({ ...product, quantity: product.minQty });
      }
      localStorage.setItem("basket", JSON.stringify(state.cart));
    },

    removeProductFromCart: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      state.cart = state.cart.filter((product) => product.id !== id); // Фильтруем и удаляем товар
      localStorage.setItem("basket", JSON.stringify(state.cart)); // Сохраняем новое состояние в localStorage
    },

    addProductQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const product = state.cart.find((p) => p.id === id);
      if (product) {
        const quantity = product.quantity || 0;
        const balance = Number(product.balance) || 0;
        const minQty = product.minQty || 1;
        if (quantity < balance) {
          product.quantity = Math.max(quantity + 1, minQty);
          localStorage.setItem("basket", JSON.stringify(state.cart));
        }
      }
    },

    deleteProductQuantity: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const product = state.cart.find((p) => p.id === id);
      if (product && product.quantity) {
        const minQty = product.minQty || 1;
        if (product.quantity > minQty) {
          product.quantity -= 1;
        } else if (product.quantity === minQty) {
          state.cart = state.cart.filter((p) => p.id !== id);
        }
        localStorage.setItem("basket", JSON.stringify(state.cart));
      }
    },

    clearCart: (state) => {
      state.cart = [];
      localStorage.removeItem("basket");
    },

    clearSelectedProducts: (state) => {
      state.cart = state.cart.filter((product) => !product.selected);
      localStorage.setItem("basket", JSON.stringify(state.cart));
    },

    updateProductQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>
    ) => {
      const { id, quantity } = action.payload;
      const product = state.cart.find((p) => p.id === id);
      if (product) {
        const balance = Number(product.balance) || 0;
        if (quantity <= balance) {
          product.quantity = quantity;
          localStorage.setItem("basket", JSON.stringify(state.cart));
        }
      }
    },

    toggleProductSelection: (state, action: PayloadAction<number>) => {
      const id = action.payload;
      const product = state.cart.find((p) => p.id === id);
      if (product) {
        product.selected = !product.selected;
        localStorage.setItem("basket", JSON.stringify(state.cart));
      }
    },

    toggleSelectAllProducts: (state) => {
      const allSelected = state.cart.every((product) => product.selected);
      state.cart.forEach((product) => {
        product.selected = !allSelected;
      });
      localStorage.setItem("basket", JSON.stringify(state.cart));
    },

    updateCartFromLocalStorage: (
      state,
      action: PayloadAction<IItemItems[]>
    ) => {
      state.cart = action.payload.map((product) => ({
        ...product,
        quantity: product.kol || 1,
      }));
      localStorage.setItem("basket", JSON.stringify(state.cart));
    },
  },
});

export const {
  toggleSelectAllProducts,
  toggleProductSelection,
  addProductToCart,
  clearCart,
  removeProductFromCart,
  addProductQuantity,
  deleteProductQuantity,
  updateProductQuantity,
  clearSelectedProducts,
  updateCartFromLocalStorage,
} = cartSlice.actions;

export default cartSlice.reducer;
