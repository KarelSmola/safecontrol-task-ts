import { RootState } from "../store";

export const selectSearchText = (state: RootState) => state.item.searchText
