import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface MyState {
  sortBy: string;
  direction: boolean;
  selectedCells: {};
}

const initialState: MyState = {
  sortBy: "",
  direction: false,
  selectedCells: {},
};

const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    sortingBy(state, action) {
      state.sortBy = action.payload;
      state.direction = !state.direction;
    },
    selectCell: {
      prepare(itemId, column) {
        return { payload: { itemId, column } };
      },

      reducer(state, action: any) {
        const { itemId, column } = action.payload;
        const newState = { ...state.selectedCells } as any;

        if (!newState[itemId]) {
          newState[itemId] = {};
        }

        newState[itemId] = {
          ...newState[itemId],
          [column]: !newState[itemId][column],
        };

        state.selectedCells = { ...newState };
      },
    },
  },
});

export const { sortingBy, selectCell } = itemSlice.actions;
export default itemSlice.reducer;
