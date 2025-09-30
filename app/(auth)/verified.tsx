import React, { ReactElement } from "react";
import { useRouter } from "expo-router";
import AuthContainer from "@/components/auth/auth-container/AuthContainer";
import {
  Content,
  IconContainer,
  VerifiedTitle,
  VerifiedSubtitle,
} from "@/components/auth/styled";
import SubmitButton from "@/components/common/submit-button/SubmitButton";

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
        <SubmitButton onPress={() => router.push("/(auth)")}>
          SIGN IN
        </SubmitButton>
      </Content>
    </AuthContainer>
  );
};

export default VerificationScreen;
