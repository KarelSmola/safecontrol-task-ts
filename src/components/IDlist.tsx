import React from "react";

import classes from "./IDlist.module.css";

type IDlistProps = { IDtoShow: string };

export const IDlist: React.FC<IDlistProps> = ({ IDtoShow }) => {
  return <p>{IDtoShow}</p>;
};
