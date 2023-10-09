import React from "react";

import classes from "./IDlist.module.css";

type IDlistProps = {
  items: {
    id: string;
    title: string;
    description: string;
    selected: boolean;
  }[];
};

export const IDlist: React.FC<IDlistProps> = ({ items }) => {
  return (
    <ul>
      {items
        .filter((item) => item.selected)
        .map((item) => (
          <li key={item.id}>{item.id}</li>
        ))}
    </ul>
  );
};
