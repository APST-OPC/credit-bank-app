import React, { ReactNode } from "react";
import { View } from "react-native";
import styled from "styled-components/native";

interface IElevatedView {
  children: ReactNode;
}

const StyledElevatedView = styled(View)({
  width: "100%",
  maxWidth: 480,
  backgroundColor: "white",
  borderTopLeftRadius: 40,
  borderTopRightRadius: 40,
  paddingVertical: 20,
  paddingHorizontal: 30,
  position: "absolute",
  bottom: 0,
  display: "flex",
  flexDirection: "column",
  gap: 20,
});

const ElevatedView = (props: IElevatedView) => {
  const { children } = props;
  return <StyledElevatedView>{children}</StyledElevatedView>;
};

export default ElevatedView;
