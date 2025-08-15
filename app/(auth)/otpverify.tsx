import ElevatedView from "@/components/auth/elevated-view/ElevatedView";
import theme from "@/theme";
import { useRouter } from "expo-router";
import React, { useState, useEffect, createRef } from "react";
import { TextInput as RNTextInput, Platform } from "react-native";
import { Button } from "react-native-paper";
import styled from "styled-components/native";
import TextInput from "@/components/form/text-input/TextInput";
import { KeyboardAvoidingView } from "react-native";
import AuthContainer from "@/components/auth/auth-container/AuthContainer";
import { Subtitle, Title } from "@/components/auth/styled";

interface FormValues {
  otp: string[];
}

const PhoneInputContainer = styled.View({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});

const OtpInput = styled(TextInput)({
  width: 60,
  height: 60,
  fontSize: 30,
  paddingLeft: 7,
});

export default function VerifyPhoneScreen() {
  const router = useRouter();
  const initialValues: FormValues = {
    otp: Array(5).fill(""),
  };

  const [formValue, setFormValue] = useState<FormValues>(initialValues);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const handleOtpChange = (index: number) => (text: string) => {
    if (/^\d*$/.test(text)) {
      const newOtp = [...formValue.otp];
      newOtp[index] = text;
      setFormValue({ ...formValue, otp: newOtp });

      if (text.length === 1 && index < 4) {
        (inputRefs[index + 1].current as RNTextInput)?.focus();
      }

      if (text === "" && index > 0) {
        (inputRefs[index - 1].current as RNTextInput)?.focus();
      }
    }
  };

  useEffect(() => {
    const allFieldsFilled = formValue.otp.every((digit) => digit.length === 1);
    setIsButtonDisabled(!allFieldsFilled);
  }, [formValue.otp]);

  const inputRefs = Array(5)
    .fill(0)
    .map(() => createRef<RNTextInput>());

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
          <PhoneInputContainer>
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
          </PhoneInputContainer>
          <Button
            mode="contained"
            onPress={() => router.push("/(auth)/verified")}
            buttonColor={theme.colors.primary}
            style={{ borderRadius: 10 }}
            contentStyle={{ height: 45 }}
            disabled={isButtonDisabled}
          >
            SEND CODE
          </Button>
        </ElevatedView>
      </AuthContainer>
    </KeyboardAvoidingView>
  );
}
