import React from "react";

import classes from "./SearchBar.module.css";

type SearBarProps = {
  searchText: string;
  onSearchText: any;
};
export const SearchBar: React.FC<SearBarProps> = ({
  searchText,
  onSearchText,
}) => {
  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearchText(e.target.value);
  };

  return (
    <form className={classes.form}>
      <label>Search in data</label>
      <input type="text" onChange={inputChangeHandler} value={searchText} />
    </form>
  );
};
