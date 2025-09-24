import type { IOtpVerify } from "@/components/auth/type";
import type { ReactElement } from "react";
import React, { useState, useEffect, createRef } from "react";
import {
  TextInput as RNTextInput,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useRouter } from "expo-router";
import { useFormik, useFormikContext } from "formik";

import AuthContainer from "@/components/auth/auth-container/AuthContainer";
import {
  ElevatedView,
  OtpContainer,
  OtpFormView,
  OtpInput,
  Subtitle,
  Title,
} from "@/components/auth/styled";
import Form from "@/components/common/app-form/Form";
import SubmitButton from "@/components/common/submit-button/SubmitButton";

interface FormValues {
  otp: string[];
}

const OptForm = () => {
  const initialValues: FormValues = {
    otp: Array(5).fill(""),
  };
  const [optValue, setOtpValue] = useState<FormValues>(initialValues);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { setFieldValue } = useFormikContext<IOtpVerify>();
  const router = useRouter();

  const inputRefs = Array(5)
    .fill(0)
    .map(() => createRef<RNTextInput>());

  const handleOtpChange = (index: number) => (text: string) => {
    if (/^\d*$/.test(text)) {
      const newOtp = [...optValue.otp];
      newOtp[index] = text;
      setOtpValue({ ...optValue, otp: newOtp });

      if (text.length === 1 && index < 4) {
        inputRefs[index + 1].current?.focus();
      }

      if (text === "" && index > 0) {
        inputRefs[index - 1].current?.focus();
      }
    }
  };

  const { handleSubmit } = useFormikContext<{ otp: string }>();
  const otpSubmit = () => {
    const reducedOpt = optValue.otp.reduce((prev, current) => prev + current);
    setFieldValue("otp", `${reducedOpt}`);
    handleSubmit();
    router.push("/(auth)/verified");
  };

  useEffect(() => {
    const allFieldsFilled = optValue.otp.every((digit) => digit.length === 1);
    setIsButtonDisabled(!allFieldsFilled);
  }, [optValue.otp]);
  return (
    <OtpFormView>
      <OtpContainer>
        {optValue.otp.map((digit, index) => (
          <OtpInput
            key={index}
            ref={inputRefs[index]}
            keyboardType="number-pad"
            maxLength={1}
            selectTextOnFocus
            value={digit}
            onChangeText={handleOtpChange(index)}
          />
        ))}
      </OtpContainer>
      <SubmitButton onPress={() => otpSubmit()} disabled={isButtonDisabled}>
        SEND CODE
      </SubmitButton>
    </OtpFormView>
  );
};

const VerifyPhoneScreen = (): ReactElement => {
  const formValue = useFormik<{ otp: string }>({
    initialValues: { otp: "" },
    onSubmit: (values) => console.log(values),
  });
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <AuthContainer isAbsolute>
        <ElevatedView>
          <Title>Verify your phone number</Title>
          <Subtitle>
            We will send you a One-Time-Password (OTP){"\n"}on this mobile
            number.
          </Subtitle>
          <Form instance={formValue}>
            <OptForm />
          </Form>
        </ElevatedView>
      </AuthContainer>
    </KeyboardAvoidingView>
  );
};

export default VerifyPhoneScreen;
