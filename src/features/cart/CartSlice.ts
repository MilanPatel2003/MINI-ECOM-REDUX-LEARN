import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "@/features/products/ProductSlice";

export interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  items: CartItem[];
  totalQuantity: number;
  totalPrice: number;
  showCart: boolean;
}

const initialState: CartState = {
  items: [],
  totalQuantity: 0,
  totalPrice: 0,
  showCart: false,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const newItem = action.payload;
      state.items.push({ ...newItem, quantity: 1 });
      state.totalQuantity++;
      state.totalPrice += newItem.price;
    },

    increaseQuantity: (state, action: PayloadAction<number>) => {
      const idToIncrease = action.payload;
      const existingItem = state.items.find(item => item.id === idToIncrease);
      if (existingItem) {
        existingItem.quantity++;
        state.totalQuantity++;
        state.totalPrice += existingItem.price;
      }
    },
    decreaseQuantity: (state, action: PayloadAction<number>) => {
      const idToDecrease = action.payload;
      const existingItemIndex = state.items.findIndex(item => item.id === idToDecrease);

      if (existingItemIndex !== -1) {
        const existingItem = state.items[existingItemIndex];

        if (existingItem.quantity > 1) {
          existingItem.quantity--;
          state.totalQuantity--;
          state.totalPrice -= existingItem.price;
        } else {
          state.items.splice(existingItemIndex, 1);
          state.totalQuantity--;
          state.totalPrice -= existingItem.price;
        }
      }
    },
    toggleCart: (state) => {
      state.showCart = !state.showCart;
    },
    resetCart: (state) => {
      state.items = [];
      state.totalQuantity = 0;
      state.totalPrice = 0;
      state.showCart = false;
    },
  },
});

export const { addToCart, increaseQuantity, decreaseQuantity, toggleCart, resetCart } = cartSlice.actions;
export default cartSlice.reducer;
