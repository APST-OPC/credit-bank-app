import type { IOtpVerify } from "@/components/auth/type";
import type { ReactElement } from "react";
import React, { useState, useEffect, createRef } from "react";
import {
  TextInput as RNTextInput,
  Platform,
  KeyboardAvoidingView,
} from "react-native";
import { useRouter } from "expo-router";
import { useFormikContext } from "formik";

import AuthContainer from "@/components/auth/auth-container/AuthContainer";
import {
  ElevatedView,
  OtpContainer,
  OtpFormView,
  OtpInput,
  Subtitle,
  Title,
} from "@/components/auth/styled";
import { Form } from "@/components/common/form/Form";

interface FormValues {
  otp: string[];
}

const OptForm = () => {
  const { Button, ControlledTextInput } = Form;
  const initialValues: FormValues = {
    otp: Array(5).fill(""),
  };
  const [formValue, setFormValue] = useState<FormValues>(initialValues);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { setFieldValue } = useFormikContext<IOtpVerify>();
  const router = useRouter();

  const inputRefs = Array(5)
    .fill(0)
    .map(() => createRef<RNTextInput>());

  const handleOtpChange = (index: number) => (text: string) => {
    if (/^\d*$/.test(text)) {
      const newOtp = [...formValue.otp];
      newOtp[index] = text;
      setFormValue({ ...formValue, otp: newOtp });

      if (text.length === 1 && index < 4) {
        inputRefs[index + 1].current?.focus();
      }

      if (text === "" && index > 0) {
        inputRefs[index - 1].current?.focus();
      }
    }
  };

  const handleSubmit = () => {
    const reducedOpt = formValue.otp.reduce((prev, current) => prev + current);
    setFieldValue("otp", `${reducedOpt}`);
    router.push("/(auth)/verified");
  };

  useEffect(() => {
    const allFieldsFilled = formValue.otp.every((digit) => digit.length === 1);
    setIsButtonDisabled(!allFieldsFilled);
  }, [formValue.otp]);
  return (
    <>
      <OtpContainer>
        <ControlledTextInput name="otp" style={{ display: "none" }} />
        {formValue.otp.map((digit, index) => (
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
      <Button submitFn={handleSubmit} disabled={isButtonDisabled}>
        SEND CODE
      </Button>
    </>
  );
};

const VerifyPhoneScreen = (): ReactElement => {
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
          <Form
            instance={{
              initialValues: { otp: "" },
              onSubmit: (values) => console.log(values),
            }}
          >
            <OtpFormView>
              <OptForm />
            </OtpFormView>
          </Form>
        </ElevatedView>
      </AuthContainer>
    </KeyboardAvoidingView>
  );
};

export default VerifyPhoneScreen;
