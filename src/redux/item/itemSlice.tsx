import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Column } from "../../data/data";

export interface MyState {
  sortBy: string;
  direction: boolean;
  selectedCells: Record<string, Partial<Record<Column, boolean>>>;
  searchText: string;
  colorMapType: boolean;
}

const initialState: MyState = {
  sortBy: "",
  direction: false,
  selectedCells: {},
  searchText: "",
  colorMapType: true,
};

export const itemSlice = createSlice({
  name: "item",
  initialState,
  reducers: {
    sortingBy(state, action) {
      state.sortBy = action.payload;
      state.direction = !state.direction;
    },
    selectCell: (state, action: PayloadAction<{itemId: string, column: Column}>) => {
        const { itemId, column } = action.payload;

        if (!state.selectedCells[itemId]) {
          state.selectedCells[itemId] = {
            [column]: true
          };
        }
        else{
          state.selectedCells[itemId][column] = !state.selectedCells[itemId][column]
        }
      },

    searchingText(state, action: PayloadAction<string>) {
      state.searchText = action.payload;
    },
    toggleColorMap(state) {
      state.colorMapType = !state.colorMapType;
    },
  },
});

export const { sortingBy, selectCell, searchingText, toggleColorMap } = itemSlice.actions;
