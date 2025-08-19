import React from "react";
import { TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { socialBtn } from "@/components/auth/utils";
import {
  AuthContainer,
  AuthText,
  DescriptionView,
  ModeButton,
  ModeLabel,
  SocialButtons,
  SocialIcon,
} from "@/components/auth/styled";
import { IProps } from "@/components/auth/type";

const AuthDescription = (props: IProps) => {
  const { type } = props;
  const router = useRouter();
  const handleSignUp = () => {
    if (type === "sign-in") {
      router.push("/(auth)/signup");
    } else {
      router.push("/(auth)");
    }
  };
  return (
    <DescriptionView>
      <AuthContainer>
        <AuthText>or sign in with</AuthText>
      </AuthContainer>

      <SocialButtons>
        {socialBtn.map((data, index) => (
          <TouchableOpacity key={index}>
            <SocialIcon source={data} resizeMode="contain" />
          </TouchableOpacity>
        ))}
      </SocialButtons>

      <AuthContainer>
        <AuthText>Don't have an account? </AuthText>
        <ModeButton onPress={handleSignUp}>
          <ModeLabel>{type === "sign-in" ? "SIGN UP" : "SIGN-IN"}</ModeLabel>
        </ModeButton>
      </AuthContainer>
    </DescriptionView>
  );
};

export default AuthDescription;
