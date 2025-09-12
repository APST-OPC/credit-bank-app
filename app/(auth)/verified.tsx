import React, { ReactElement } from "react";
import { useRouter } from "expo-router";
import theme from "@/theme";
import AuthContainer from "@/components/auth/auth-container/AuthContainer";
import {
  Content,
  IconContainer,
  StyledButton,
  VerifiedTitle,
  VerifiedSubtitle,
} from "@/components/auth/styled";

const VerificationScreen = (): ReactElement => {
  const router = useRouter();
  return (
    <AuthContainer>
      <Content>
        <IconContainer source={require("@/assets/images/verifiedlogo.png")} />
        <VerifiedTitle>Verified!</VerifiedTitle>
        <VerifiedSubtitle>
          Your account has been created successfully.
        </VerifiedSubtitle>
        <StyledButton
          onPress={() => router.push("/(auth)")}
          buttonColor={theme.colors.primary}
          style={{ borderRadius: 10 }}
        >
          SIGN IN
        </StyledButton>
      </Content>
    </AuthContainer>
  );
};

export default VerificationScreen;
