import { configureStore } from "@reduxjs/toolkit";
import itemSlice from "../features/itemSlice";
// import { ToolkitStore } from "@reduxjs/toolkit/dist/configureStore";
export const store = configureStore({
  reducer: itemSlice,
});
