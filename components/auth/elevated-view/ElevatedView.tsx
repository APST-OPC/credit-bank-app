import React from "react";
import { StyledElevatedView } from "@/components/auth/styled";
import { IElevatedView } from "@/components/auth/type";

const ElevatedView = (props: IElevatedView) => {
  const { children } = props;
  return <StyledElevatedView>{children}</StyledElevatedView>;
};

export default ElevatedView;
