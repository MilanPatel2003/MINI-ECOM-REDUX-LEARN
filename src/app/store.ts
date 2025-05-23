import {configureStore} from "@reduxjs/toolkit";
import ProductReducer from "../features/products/ProductSlice"
import CartReducer from "@/features/cart/CartSlice";
import LoginReducer from "@/features/login/LoginSlice"
export const store = configureStore(
 {
reducer:{
ProductReducer,
CartReducer,
LoginReducer
}
 }   
);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
