import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { socialBtn } from "@/components/auth/utils";
import { IProps } from "@/components/auth/type";
import { useTranslation } from "react-i18next";
import { localizationKey } from "@/i18n/key";
import { styled } from "styled-components/native";
import theme from "@/theme";

const SocialButtons = styled(View)({
  flexDirection: "row",
  justifyContent: "center",
  gap: 30,
});
const AuthView = styled(View)({
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
  color: theme.colors.primary,
  fontFamily: "PoppinsSemiBold",
});

const AuthDescription = (props: IProps) => {
  const { type } = props;
  const { t } = useTranslation();
  const signInLocalKey = localizationKey.auth.signIn;
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
      <AuthView>
        <AuthText>{t(signInLocalKey.alternativeSignIn)}</AuthText>
      </AuthView>

      <SocialButtons>
        {socialBtn.map((data, index) => (
          <TouchableOpacity key={index}>
            <SocialIcon source={data} resizeMode="contain" />
          </TouchableOpacity>
        ))}
      </SocialButtons>

      <AuthView>
        <AuthText>{t(signInLocalKey.haveAnAccount)}</AuthText>
        <ModeButton onPress={handleSignUp}>
          <ModeLabel>
            {type === "sign-in" ? t(signInLocalKey.signUp) : "SIGN-IN"}
          </ModeLabel>
        </ModeButton>
      </AuthView>
    </DescriptionView>
  );
};

export default AuthDescription;
