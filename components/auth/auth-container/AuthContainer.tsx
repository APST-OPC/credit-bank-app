import React, { ReactNode } from "react";
import { View, Image } from "react-native";
import styled from "styled-components/native";

interface IAuthContainer {
  isAbsolute?: boolean;
  children: ReactNode;
}
const Container = styled(View)({
  flex: 1,
  width: "100%",
  maxWidth: 480,
  alignSelf: "center",
  position: "relative",
});
const Background = styled(Image)({
  flex: 1,
  width: "100%",
  height: "100%",
});

const AuthContainer = ({ isAbsolute = false, children }: IAuthContainer) => {
  return (
    <Container>
      <Background
        source={require("@/assets/images/bgworld.png")}
        resizeMode="cover"
        style={{ position: isAbsolute ? "absolute" : undefined }}
      />
      {children}
    </Container>
  );
};

export default AuthContainer;
