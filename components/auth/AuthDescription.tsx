import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native-paper";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { localizationKey } from "@/i18n/key";
import { styled } from "styled-components/native";
import theme from "@/theme";
import { IAuthContainer } from "@/components/auth/type";

const AuthView = styled(View)({
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: 5,
});
const AuthText = styled(Text)({
  color: "#666",
});
const DescriptionView = styled(View)({
  display: "flex",
  flexDirection: "column",
  gap: 10,
});
const ModeLabel = styled(Text)({
  color: theme.colors.primary,
  fontFamily: "PoppinsSemiBold",
});

const AuthDescription = (props: Pick<IAuthContainer, "type">) => {
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
        <AuthText>{t(signInLocalKey.haveAnAccount)}</AuthText>
        <TouchableOpacity onPress={handleSignUp}>
          <ModeLabel>
            {type === "sign-in" ? t(signInLocalKey.signUp) : "SIGN-IN"}
          </ModeLabel>
        </TouchableOpacity>
      </AuthView>
    </DescriptionView>
  );
};

export default AuthDescription;
