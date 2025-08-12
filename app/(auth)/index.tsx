import React, { useEffect } from "react";
import styled from "styled-components/native";
import { Button, Text } from "react-native-paper";
import { View, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import OnboardingScreen from "@/components/auth/onboard/OnboardingScreen";
import { useOnboarding } from "@/hooks/useOnboarding";
import ElevatedView from "@/components/auth/elevated-view/ElevatedView";
import { Form } from "@/components/form/Form";

const Container = styled(View)({
  flex: 1,
  width: "100%",
  maxWidth: 480,
  alignSelf: "center",
  position: "relative",
});
const BackgroundImage = styled(Image)({
  flex: 1,
  width: "100%",
  height: "100%",
  position: "absolute",
});

const Title = styled(Text)({
  fontSize: 27,
  fontFamily: "PoppinsBold",
  textAlign: "center",
  color: "#333",
});

const SocialButtons = styled(View)({
  flexDirection: "row",
  justifyContent: "center",
  gap: 30,
});

const AuthContainer = styled(View)({
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
});

const AuthText = styled(Text)({
  color: "#666",
});

const SocialIcon = styled(Image)({
  width: 30,
  height: 30,
});

const DescriptionView = styled(View)({
  display: "flex",
  flexDirection: "column",
  gap: 10,
});

export default function LoginScreen() {
  const socialBtn = [
    require("@/assets/images/google.png"),
    require("@/assets/images/fb.png"),
    require("@/assets/images/twitter.png"),
  ];
  const router = useRouter();
  const { isOnboarded, checkFirstLaunch, completeOnboarding } = useOnboarding();

  useEffect(() => {
    checkFirstLaunch();
  }, [completeOnboarding]);

  const handleSignUp = () => {
    router.push("/(auth)/signup");
  };

  const renderBackground = () => {
    return (
      <BackgroundImage
        source={require("@/assets/images/bgworld.png")}
        resizeMode="cover"
      />
    );
  };

  const renderForm = () => {
    return (
      <Form
        instance={{
          initialValues: { email: "", password: "" },
          onSubmit: (values) => console.log("form", values),
        }}
      >
        <View style={{ display: "flex", flexDirection: "column", gap: 15 }}>
          <Form.ControlledTextInput
            name="email"
            label="Email"
            keyboardType="email-address"
            placeholder="ex: jon.smith@email.com"
          />
          <Form.ControlledTextInput
            name="password"
            type="password"
            label="Password"
            placeholder="********"
          />
          <Form.Button mode="contained">SIGN IN</Form.Button>
        </View>
      </Form>
    );
  };

  const renderDescriptions = () => {
    return (
      <DescriptionView>
        <AuthContainer>
          <AuthText>or sign in with</AuthText>
        </AuthContainer>

        <SocialButtons>
          {socialBtn.map((data, index) => (
            <TouchableOpacity key={index}>
              <SocialIcon source={data} resizeMode="contain" />
            </TouchableOpacity>
          ))}
        </SocialButtons>

        <AuthContainer>
          <AuthText>Don't have an account? </AuthText>
          <Button mode="text" onPress={handleSignUp}>
            SIGN UP
          </Button>
        </AuthContainer>
      </DescriptionView>
    );
  };

  const renderElevatedView = () => {
    return (
      <ElevatedView>
        <Title>Sign in to your account</Title>
        {renderForm()}
        {renderDescriptions()}
      </ElevatedView>
    );
  };

  return isOnboarded ? (
    <OnboardingScreen />
  ) : (
    <Container>
      {renderBackground()}
      {renderElevatedView()}
    </Container>
  );
}
