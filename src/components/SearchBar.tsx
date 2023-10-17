import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { MyState, searchingText } from "../features/itemSlice";

import classes from "./SearchBar.module.css";

export const SearchBar = () => {
  const searchText = useSelector((store: MyState) => store.searchText) as any;
  const dispatch = useDispatch();
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchingText(e.target.value));
  };

  return (
    <form className={classes.form}>
      <label>Search in data</label>
      <input type="text" onChange={inputChangeHandler} value={searchText} />
    </form>
  );
};
