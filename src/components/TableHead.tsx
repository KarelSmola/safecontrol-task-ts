import React from "react";
import { columns } from "../data/data";

import classes from "./TableHead.module.css";

export const TableHead: React.FC = () => {
  return (
    <thead className={classes.thead}>
      <tr className={classes["thead-row"]}>
        {columns.map((column) => (
          <th className={classes["thead-column"]}>{column}</th>
        ))}
      </tr>
    </thead>
  );
};
