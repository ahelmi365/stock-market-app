// persist
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
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web

// reducer
import tickersSlice from "./tickers/tickersSlice.ts";
import searchTickersSlice from "./searchTickers/searchTickersSlice.ts";

// Persist configurations for each slice
const tickersPersistConfig = {
  key: "tickers",
  storage,
};

const searchTickersPersistConfig = {
  key: "searchTickers",
  storage,
};

// Combine reducers with persist configurations
export const rootReducer = combineReducers({
  tickers: persistReducer(tickersPersistConfig, tickersSlice),
  searchTickers: persistReducer(searchTickersPersistConfig, searchTickersSlice),
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});
const presistor = persistStore(store);

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export { store, presistor };
