import React, { useEffect, useState } from "react";
import { View } from "react-native";
import ElevatedView from "@/components/auth/elevated-view/ElevatedView";
import { Form } from "@/components/form/Form";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnboardingScreen from "@/components/auth/onboard/OnboardingScreen";
import AuthDescription from "@/components/auth/auth-description/AuthDescription";
import { signInFormInstance } from "@/components/auth/utils";
import { BackgroundImage, Container, Title } from "@/components/auth/styled";

export default function LoginScreen() {
  const [isOnboarded, setIsOnboarded] = useState<boolean>();

  const checkFirstLaunch = async () => {
    try {
      const value = await AsyncStorage.getItem("hasLaunched");
      if (value === null) {
        setIsOnboarded(true);
      } else {
        setIsOnboarded(false);
      }
    } catch (error) {
      console.error("Error checking first launch", error);
    }
  };

  useEffect(() => {
    checkFirstLaunch();
  });

  const renderBackground = () => {
    return (
      <BackgroundImage
        source={require("@/assets/images/bgworld.png")}
        resizeMode="cover"
      />
    );
  };

  const renderForm = () => {
    const { Button, ControlledTextInput } = Form;
    return (
      <Form
        instance={{
          ...signInFormInstance,
          onSubmit: (values) => console.log("form", values),
        }}
      >
        <View style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          <ControlledTextInput
            name="email"
            label="Email"
            keyboardType="email-address"
            placeholder="ex: jon.smith@email.com"
          />
          <ControlledTextInput
            name="password"
            type="password"
            label="Password"
            placeholder="********"
          />
          <Button mode="contained">SIGN IN</Button>
        </View>
      </Form>
    );
  };

  const renderElevatedView = () => {
    return (
      <ElevatedView>
        <Title>Sign in to your account</Title>
        {renderForm()}
        <AuthDescription type="sign-in" />
      </ElevatedView>
    );
  };

  return isOnboarded ? (
    <OnboardingScreen completeOnboarding={setIsOnboarded} />
  ) : (
    <Container>
      {renderBackground()}
      {renderElevatedView()}
    </Container>
  );
}
