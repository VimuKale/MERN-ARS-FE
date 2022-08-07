import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import appUserReducer from "../slices/appUserSlice";
import appBarReducer from "../slices/appBarSlice";
import rescueRequestReducer from "../slices/rescueRequestSlice";
import uruReducer from "../slices/uruSlice";

const rootReducer = combineReducers({
  appUser: appUserReducer,
  appBar: appBarReducer,
  rescueRequest: rescueRequestReducer,
  uru: uruReducer,
});

const persistConfig = {
  key: "root",
  version: 1,
  storage,
  whitelist: ["appUser", "appBar"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export default store;
