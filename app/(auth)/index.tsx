import type { ReactElement } from "react";
import type { ISignInForm } from "@/components/auth/type";
import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import { Form } from "@/components/common/form/Form";
import { signInFormInstance } from "@/components/auth/utils";
import { ElevatedView, FormView, Title } from "@/components/auth/styled";
import AuthDescription from "@/components/auth/auth-description/AuthDescription";
import { localizationKey } from "@/i18n/key";
import AuthContainer from "@/components/auth/auth-container/AuthContainer";

const SignInForm = ({ onSubmit, translate }: ISignInForm): ReactElement => {
  const { Button, ControlledTextInput } = Form;
  const { t } = useTranslation();
  return (
    <Form
      instance={{
        ...signInFormInstance,
        onSubmit: onSubmit,
      }}
    >
      <FormView>
        <ControlledTextInput
          name="email"
          label={t(translate.email)}
          placeholder="ex: jon.smith@email.com"
        />
        <ControlledTextInput
          name="password"
          type="password"
          label={t(translate.password)}
          placeholder="********"
        />
        <Button>{t(translate.signInBtn)}</Button>
      </FormView>
    </Form>
  );
};

const LoginScreen = (): ReactElement => {
  const { t } = useTranslation();
  const signInLocalKey = localizationKey.auth.signIn;
  const router = useRouter();

  const handleSubmit = (values: Record<string, unknown>) => {
    console.log("form", values);
    router.push("/(tabs)");
  };

  const renderElevatedView = () => {
    return (
      <ElevatedView>
        <Title>{t(signInLocalKey.signInHeader)}</Title>
        <SignInForm onSubmit={handleSubmit} translate={signInLocalKey} />
        <AuthDescription type="sign-in" />
      </ElevatedView>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <AuthContainer>{renderElevatedView()}</AuthContainer>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
