import React from "react";
import { columns } from "../data/data";

import classes from "./TableHead.module.css";

// type TableHeadProps = {
//   sortBy: (column: string) => string;
// };
export const TableHead: React.FC = () => {
  const sortBy: (column: string) => void = (column: string) => {
    console.log(column);
  };

  return (
    <thead className={classes.thead}>
      <tr className={classes["thead-row"]}>
        {columns.map((column) => (
          <th
            className={classes["thead-column"]}
            key={column}
            onClick={() => {
              sortBy(column);
            }}
          >
            {column}
          </th>
        ))}
      </tr>
    </thead>
  );
};
