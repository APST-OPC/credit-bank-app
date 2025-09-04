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
import { useTranslation } from "react-i18next";
import { localizationKey } from "@/i18n/key";

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
      <AuthContainer>
        <AuthText>{t(signInLocalKey.alternativeSignIn)}</AuthText>
      </AuthContainer>

      <SocialButtons>
        {socialBtn.map((data, index) => (
          <TouchableOpacity key={index}>
            <SocialIcon source={data} resizeMode="contain" />
          </TouchableOpacity>
        ))}
      </SocialButtons>

      <AuthContainer>
        <AuthText>{t(signInLocalKey.haveAnAccount)}</AuthText>
        <ModeButton onPress={handleSignUp}>
          <ModeLabel>
            {type === "sign-in" ? t(signInLocalKey.signUp) : "SIGN-IN"}
          </ModeLabel>
        </ModeButton>
      </AuthContainer>
    </DescriptionView>
  );
};

export default AuthDescription;
