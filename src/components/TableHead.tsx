import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { columns, Column } from "../data/data";

import { sortingBy } from "../redux/item/itemSlice";

import classes from "./TableHead.module.css";

export const TableHead = () => {
  const dispatch = useDispatch();

  const sortBy = useCallback(
    (column: Column) => () => {
      dispatch(sortingBy(column));
    },
    [dispatch],
  );

  return (
    <thead className={classes.thead}>
      <tr className={classes["thead-row"]}>
        {columns.map((column) => (
          <th
            className={classes["thead-column"]}
            key={column}
            onClick={sortBy(column)}
          >
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
};
