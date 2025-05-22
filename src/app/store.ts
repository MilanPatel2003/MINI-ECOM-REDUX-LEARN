import {configureStore} from "@reduxjs/toolkit";
import ProductReducer from "../features/products/ProductSlice"
import CartReducer from "@/features/cart/CartSlice";
export const store = configureStore(
 {
reducer:{
ProductReducer,
CartReducer
}
 }   
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
