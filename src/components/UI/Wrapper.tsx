import React, { JSXElementConstructor, ReactElement } from "react";

import classes from "./Wrapper.module.css";

type WrapperProps = any;
export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
  return <div className={classes.wrapper}>{children}</div>;
};
