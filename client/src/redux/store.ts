"use client"
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlices"
import productReducer from "./slices/productSlice"




export const store = configureStore({
    reducer:{
        userSlice:userReducer,
        productSlice:productReducer,
    }
})

export type RootState = ReturnType<typeof store.getState >
export type AppDispatch = typeof store.dispatch;