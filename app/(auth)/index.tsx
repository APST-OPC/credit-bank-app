import type { ReactElement } from "react";
import type { ICredentials } from "@/components/auth/type";
import React from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useTranslation } from "react-i18next";
import Form from "@/components/common/app-form/Form";
import { signInFormInstance } from "@/components/auth/utils";
import { ElevatedView, FormView, Title } from "@/components/auth/styled";

import { localizationKey } from "@/i18n/key";
import AuthContainer from "@/components/auth/auth-container/AuthContainer";
import AuthDescription from "@/components/auth/auth-description/AuthDescription";
import { useAuth } from "@/context/authContext";
import { useFormik } from "formik";
import { ControlledTextField } from "@/components/common/app-form/controlled";
import SubmitButton from "@/components/common/submit-button/SubmitButton";

const signInLocalKey = localizationKey.auth.signIn;

const SignInForm = (): ReactElement => {
  const { t } = useTranslation();
  return (
    <>
      <ControlledTextField
        name="email"
        label={t(signInLocalKey.email)}
        placeholder="ex: jon.smith@email.com"
      />
      <ControlledTextField
        name="password"
        type="password"
        label={t(signInLocalKey.password)}
        placeholder="********"
      />
    </>
  );
};

const LoginScreen = (): ReactElement => {
  const { t } = useTranslation();
  const { login } = useAuth();
  const handleSubmit = (values: ICredentials) => {
    console.log(values);
    login(values);
  };
  const formValue = useFormik<ICredentials>({
    initialValues: signInFormInstance.initialValues,
    validationSchema: signInFormInstance.validationSchema,
    onSubmit: (values) => handleSubmit(values),
  });

  const renderElevatedView = () => {
    return (
      <ElevatedView>
        <Title>{t(signInLocalKey.signInHeader)}</Title>
        <Form instance={formValue}>
          <FormView>
            <SignInForm />
            <SubmitButton onPress={() => formValue.handleSubmit()}>
              SIGN IN
            </SubmitButton>
          </FormView>
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
