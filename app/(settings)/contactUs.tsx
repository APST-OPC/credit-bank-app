import { Text } from "react-native-paper";
import { ScrollView, Platform, Linking, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import ParallaxScrollView from "@/components/ParralaxView";
import React, { ReactElement } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import theme from "@/theme";

const commonPadding = Platform.OS === "ios" ? 20 : 30;

const StyledView = styled(ScrollView)({
  paddingTop: 20,
  gap: 15,
  paddingLeft: commonPadding,
  paddingRight: commonPadding,
});

const StyledText = styled(Text)(() => ({
  color: theme.colors.primary,
  fontSize: 18,
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "center",
  textAlign: "center",
}));

const StyledIcon = styled(MaterialIcons)(() => ({
  marginRight: 10,
  fontSize: 30,
  alignSelf: "center",
  color: theme.colors.primary,
}));

const StyledInfo = styled(Text)(() => ({
  fontSize: 20,
  color: theme.colors.primary,
  marginBottom: 20,
  fontWeight: "600",
  textAlign: "center",
}));

const ContactUs = (): ReactElement => {
  const handlePhonePress = () => {
    Linking.openURL("tel:+639187388888");
  };

  const handleEmailPress = () => {
    Linking.openURL("mailto:QDiCharge@gmail.com");
  };

  return (
    <ParallaxScrollView>
      <StyledView
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <StyledIcon name="phone" />
        <TouchableOpacity onPress={handlePhonePress}>
          <StyledText>Contact Number:</StyledText>
        </TouchableOpacity>
        <StyledInfo>+63 918 738 8888</StyledInfo>

        <StyledIcon name="email" />
        <TouchableOpacity onPress={handleEmailPress}>
          <StyledText>Email Address:</StyledText>
        </TouchableOpacity>
        <StyledInfo>QDiCharge@gmail.com</StyledInfo>

        <StyledIcon name="home" />
        <StyledText>Home Address:</StyledText>
        <StyledInfo>
          Unit 2402 City Trade and Financial Tower, 7th Avenue, BGC, Taguig
        </StyledInfo>
      </StyledView>
    </ParallaxScrollView>
  );
};

export default ContactUs;
