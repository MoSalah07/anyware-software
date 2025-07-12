// store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import storage from "redux-persist/lib/storage"; // يستخدم localStorage بشكل تلقائي
import { persistReducer, persistStore } from "redux-persist";
import { announcementApiSlice } from "./services/announcement.api.slice";
import authSlice from "./authSlice";

const rootReducer = combineReducers({
  auth: authSlice,
  [announcementApiSlice.reducerPath]: announcementApiSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["auth"], // فقط auth سيتم حفظه
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat(announcementApiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();

export const persistor = persistStore(store);

export default store;
