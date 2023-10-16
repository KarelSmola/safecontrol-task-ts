import { createSlice } from "@reduxjs/toolkit";

export interface MyState {
  sortBy: string;
  direction: boolean;
}

const initialState: MyState = {
  sortBy: "",
  direction: false,
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    sortingBy(state, action) {
      state.sortBy = action.payload;
      state.direction = !state.direction;
    },
  },
});

export const { sortingBy } = itemSlice.actions;
export default itemSlice.reducer;
