"use client"
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlices"
import productReducer from "./slices/productSlice"
import cartReducer from "./slices/cartSlice"
import orderReducer from "./slices/orderSlice"




export const store = configureStore({
    reducer:{
        userSlice:userReducer,
        productSlice:productReducer,
        orderSlice:orderReducer,
        cartSlice:cartReducer,
    }
})

export type RootState = ReturnType<typeof store.getState >
export type AppDispatch = typeof store.dispatch;