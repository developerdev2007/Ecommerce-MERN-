import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query/react";
import { apiSlice } from "./api/apiSlice.js";
import authReducer from "./features/auth/authSlice.js";
import favoritesReducer from "./features/favorites/favoriteSlice.js";
import cartSliceReducer from "./features/cart/cartSlice.js";
import shopSliceReducer from "./features/shop/shopSlice.js";

import { getFavoritesFromLocalStorage } from "../utils/localStorage.js";
import { get } from "mongoose";

const initialFavorites = getFavoritesFromLocalStorage() || [];
const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducer,
    favorites: favoritesReducer,
    cart: cartSliceReducer,
    shop: shopSliceReducer,
  },
  preloadedState: {
    favorites: initialFavorites,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

setupListeners(store.dispatch);
export default store;
