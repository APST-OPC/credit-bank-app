import type { IAuthContainer } from "@/components/auth/type";

import React from "react";
import styled from "styled-components/native";
import { View, Image } from "react-native";

export const Container = styled(View)({
  flex: 1,
  width: "100%",
  maxWidth: 480,
  alignSelf: "center",
  position: "relative",
});
export const Background = styled(Image)({
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
