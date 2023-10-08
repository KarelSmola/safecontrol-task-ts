import React from "react";
import { columns } from "../data/data";

import classes from "./TableHead.module.css";

type TableHeadProps = {
  reguestSort: (column: string) => void;
};

export const TableHead: React.FC<TableHeadProps> = ({ reguestSort }) => {
  return (
    <thead className={classes.thead}>
      <tr className={classes["thead-row"]}>
        {columns.map((column) => (
          <th
            className={classes["thead-column"]}
            key={column}
            onClick={() => {
              reguestSort(column);
            }}
          >
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
};
