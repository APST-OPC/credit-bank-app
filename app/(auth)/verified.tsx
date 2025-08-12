import React from "react";
import styled from "styled-components/native";
import { Button, Text } from "react-native-paper";
import { useRouter } from "expo-router";
import theme from "@/theme";
import { Image, View } from "react-native";

const Background = styled(Image)({
  flex: 1,
  width: "100%",
  height: "100%",
});

const Content = styled(View)({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
});

const Container = styled(View)({
  flex: 1,
  width: "100%",
  maxWidth: 480,
  alignSelf: "center",
});

const IconContainer = styled(Image)({
  width: 80,
  height: 80,
  marginBottom: 20,
});

const Title = styled(Text)({
  fontSize: 24,
  fontWeight: "bold",
  color: "#fff",
  marginBottom: 10,
});

const Subtitle = styled(Text)({
  fontSize: 16,
  color: "#fff",
  textAlign: "center",
  marginBottom: 40,
  opacity: 0.8,
});

const StyledButton = styled(Button)({
  width: "100%",
  marginTop: 20,
  backgroundColor: "#fff",
  borderRadius: 25,
  paddingVertical: 8,
});

export default function VerificationScreen() {
  const router = useRouter();
  return (
    <Container>
      <Background
        source={require("@/assets/images/bgworld.png")}
        resizeMode="cover"
      >
        <Content>
          <IconContainer source={require("@/assets/images/verifiedlogo.png")} />
          <Title>Verified!</Title>
          <Subtitle>Your account has been created successfully.</Subtitle>
          <StyledButton
            onPress={() => router.push("/(auth)")}
            buttonColor={theme.colors.primary}
            style={{ borderRadius: 10 }}
          >
            SIGN IN
          </StyledButton>
        </Content>
      </Background>
    </Container>
  );
}
