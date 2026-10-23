
import { configureStore, combineReducers } from "@reduxjs/toolkit";

import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";

import productsReducer from "../features/products/productsSlice";
import cartReducer from "../features/cart/cartSlice";

// Browser localStorage adapter for Redux Persist
const storage = {
  getItem: (key) => {
    return Promise.resolve(localStorage.getItem(key));
  },

  setItem: (key, value) => {
    localStorage.setItem(key, value);
    return Promise.resolve(value);
  },

  removeItem: (key) => {
    localStorage.removeItem(key);
    return Promise.resolve();
  },
};

// Redux Persist configuration
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["cart"],
};

// Combine reducers
const rootReducer = combineReducers({
  products: productsReducer,
  cart: cartReducer,
});

// Persist cart data
const persistedReducer = persistReducer(
  persistConfig,
  rootReducer
);

// Configure Redux store
export const store = configureStore({
  reducer: persistedReducer,

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [
          FLUSH,
          REHYDRATE,
          PAUSE,
          PERSIST,
          PURGE,
          REGISTER,
        ],
      },
    }),
});

// Create persistor
export const persistor = persistStore(store);
