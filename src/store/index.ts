import { configureStore, combineReducers } from "@reduxjs/toolkit";
import machineReducer from "./machine";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
const persistConfig = {
  key: "root", // storage key
  storage, // storage engine
  // other options (e.g., blacklist/whitelist) if needed
};

// Create a persisted reducer
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    machine: machineReducer,
  })
);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

// Create the persistor
const persistor = persistStore(store);

export { store, persistor };

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
