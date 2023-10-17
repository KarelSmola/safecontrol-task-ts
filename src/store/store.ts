import { configureStore } from "@reduxjs/toolkit";
import itemSlice from "../features/itemSlice";
export const store = configureStore({
  reducer: { item: itemSlice },
});
