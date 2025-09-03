import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import { useRouter } from "expo-router";
import { Form } from "@/components/common/form/Form";
import { signInFormInstance } from "@/components/auth/utils";
import { Background, Container, Title } from "@/components/auth/styled";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnboardingScreen from "@/components/auth/onboard/OnboardingScreen";
import AuthDescription from "@/components/auth/auth-description/AuthDescription";
import ElevatedView from "@/components/auth/elevated-view/ElevatedView";

export default function LoginScreen() {
  const [isOnboarded, setIsOnboarded] = useState<boolean>();
  const router = useRouter();

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
      <Background
        source={require("@/assets/images/bgworld.png")}
        resizeMode="cover"
      />
    );
  };

  const handleSubmit = (values: Record<string, unknown>) => {
    console.log("form", values);
    router.push("/(tabs)");
  };

  const renderForm = () => {
    const { Button, ControlledTextInput } = Form;
    return (
      <Form
        instance={{
          ...signInFormInstance,
          onSubmit: handleSubmit,
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
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Container>
        {renderBackground()}
        {renderElevatedView()}
      </Container>
    </KeyboardAvoidingView>
  );
}
