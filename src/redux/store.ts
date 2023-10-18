import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {itemSlice} from "./item/itemSlice";

const rootReducer = combineReducers({
  item: itemSlice.reducer
})

export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof rootReducer>
