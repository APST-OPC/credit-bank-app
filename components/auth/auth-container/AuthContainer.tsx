import React from "react";
import { IAuthContainer } from "@/components/auth/type";
import { Background, Container } from "@/components/auth/styled";



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
