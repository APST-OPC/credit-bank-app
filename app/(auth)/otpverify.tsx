import ElevatedView from "@/components/auth/elevated-view/ElevatedView";
import theme from "@/theme";
import { useRouter } from "expo-router";
import React, { useState, useEffect } from "react";
import { TextInput as RNTextInput, View, Image } from "react-native";
import { Button, Text } from "react-native-paper";
import styled from "styled-components/native";

interface FormValues {
  otp: string[];
}

const Container = styled(View)({
  flex: 1,
  width: "100%",
  maxWidth: 480,
  alignSelf: "center",
});

const BackgroundImage = styled(Image)({
  flex: 1,
  width: "100%",
  height: "100%",
  position: "absolute",
});

const Title = styled(Text)({
  fontSize: 24,
  fontWeight: "600",
  marginBottom: 10,
  color: "#333",
});

const Subtitle = styled(Text)({
  fontSize: 14,
  color: "#666",
  marginBottom: 25,
  lineHeight: 20,
});

const PhoneInputContainer = styled.View({
  paddingBottom: 300,
  flexDirection: "row",
  gap: 8,
  alignSelf: "center",
  marginBottom: 30,
});

const OtpInput = styled(RNTextInput)({
  backgroundColor: "#ffffff",
  width: 50,
  height: 50,
  borderWidth: 1,
  borderRadius: 8,
  textAlign: "center",
  fontSize: 20,
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
    .map(() => React.createRef<RNTextInput>());

  return (
    <Container>
      <BackgroundImage
        source={require("@/assets/images/bgworld.png")}
        resizeMode="cover"
      />
      <ElevatedView>
        <Title>Verify your phone number</Title>
        <Subtitle>
          We will send you a One-Time-Password (OTP){"\n"}on this mobile number.
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
    </Container>
  );
}
