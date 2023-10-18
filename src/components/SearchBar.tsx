import React, { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import { searchingText } from "../redux/item/itemSlice";
import { selectSearchText } from "../redux/item/selectors";

import classes from "./SearchBar.module.css";

export const SearchBar = () => {
  const searchText = useSelector(selectSearchText)

  const dispatch = useDispatch();

  const inputChangeHandler = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(searchingText(e.target.value));
    },
    [dispatch],
  );

  return (
    <form className={classes.form}>
      <label>Search in data</label>
      <input type="text" onChange={inputChangeHandler} value={searchText} />
    </form>
  );
};
