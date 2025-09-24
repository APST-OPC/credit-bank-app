import type { ReactElement } from "react";
import type { ICredentials } from "@/components/auth/type";
import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useTranslation } from "react-i18next";
import { Form } from "@/components/common/form/Form";
import { signInFormInstance } from "@/components/auth/utils";
import { ElevatedView, FormView, Title } from "@/components/auth/styled";

import { localizationKey } from "@/i18n/key";
import AuthContainer from "@/components/auth/auth-container/AuthContainer";
import AuthDescription from "@/components/auth/auth-description/AuthDescription";
import { useAuth } from "@/context/authContext";

const signInLocalKey = localizationKey.auth.signIn;

const SignInForm = (): ReactElement => {
  const { Button, ControlledTextInput } = Form;
  const { t } = useTranslation();
  return (
    <FormView>
      <ControlledTextInput
        name="email"
        label={t(signInLocalKey.email)}
        placeholder="ex: jon.smith@email.com"
      />
      <ControlledTextInput
        name="password"
        type="password"
        label={t(signInLocalKey.password)}
        placeholder="********"
      />
      <Button>{t(signInLocalKey.signInBtn)}</Button>
    </FormView>
  );
};

const LoginScreen = (): ReactElement => {
  const { t } = useTranslation();

  const { login } = useAuth();

  const handleSubmit = (values: Record<string, unknown>) => {
    login(values as unknown as ICredentials);
  };

  const renderElevatedView = () => {
    return (
      <ElevatedView>
        <Title>{t(signInLocalKey.signInHeader)}</Title>
        <Form
          instance={{
            ...signInFormInstance,
            onSubmit: handleSubmit,
          }}
        >
          <SignInForm />
        </Form>
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
