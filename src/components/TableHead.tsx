import React from "react";
import { useDispatch } from "react-redux";
import { columns } from "../data/data";
import { sortingBy } from "../features/itemSlice";

import classes from "./TableHead.module.css";

export const TableHead: React.FC = () => {
  const dispatch = useDispatch();

  return (
    <thead className={classes.thead}>
      <tr className={classes["thead-row"]}>
        {columns.map((column) => (
          <th
            className={classes["thead-column"]}
            key={column}
            onClick={() => dispatch(sortingBy(column))}
          >
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
};
