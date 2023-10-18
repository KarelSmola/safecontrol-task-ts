import { RootState } from "../store";

export const selectSearchText = (state: RootState) => state.item.searchText;
export const selectSelectedCells = (state: RootState) =>
  state.item.selectedCells;
export const selectSortBy = (state: RootState) => state.item.sortBy;
export const selectDirection = (state: RootState) => state.item.direction;
export const selectColorMapType = (state: RootState) => state.item.colorMapType;
