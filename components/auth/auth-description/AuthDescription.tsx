import React from "react";
import { View, TouchableOpacity, Text, Image } from "react-native";
import styled from "styled-components/native";
import { useRouter } from "expo-router";
import { socialBtn } from "@/components/auth/utils";

interface IProps {
  type: "sign-up" | "sign-in";
}

const SocialButtons = styled(View)({
  flexDirection: "row",
  justifyContent: "center",
  gap: 30,
});

const AuthContainer = styled(View)({
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: 5,
});

const AuthText = styled(Text)({
  color: "#666",
});

const SocialIcon = styled(Image)({
  width: 30,
  height: 30,
});

const DescriptionView = styled(View)({
  display: "flex",
  flexDirection: "column",
  gap: 10,
});

const ModeButton = styled(TouchableOpacity)({
  marginTop: 4,
});
const ModeLabel = styled(Text)({
  color: "#004068",
  fontFamily: "PoppinsSemiBold",
});

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
