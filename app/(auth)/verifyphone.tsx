import { ReactElement, ReactNode } from "react";
import { Platform } from "react-native";
import React from "react";
import AuthContainer from "@/components/auth/auth-container/AuthContainer";
import ElevatedView from "@/components/auth/elevated-view/ElevatedView";
import { Subtitle, Title } from "@/components/auth/styled";
import { KeyboardAvoidingView } from "react-native";
import { Form } from "@/components/common/form/Form";
import VerifyPhoneForm from "@/components/auth/verify-phone-form/VerifyPhoneForm";
import { countryCodes } from "@/components/auth/utils";

const VerifyPhoneScreen = (): ReactElement => {
  const renderHeader = (): ReactNode => {
    return (
      <>
        <Title>Verify your phone number</Title>
        <Subtitle>
          We will send you a One-Time-Password (OTP){"\n"}
          on this mobile number.
        </Subtitle>
      </>
    );
  };
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <AuthContainer>
        <Form
          instance={{
            initialValues: {
              countryCode: countryCodes[0].value,
              phoneNumber: "",
            },
            onSubmit: (values) => console.log(values),
          }}
        >
          <ElevatedView>
            {renderHeader()}
            <VerifyPhoneForm />
          </ElevatedView>
        </Form>
      </AuthContainer>
    </KeyboardAvoidingView>
  );
};

export default VerifyPhoneScreen;
