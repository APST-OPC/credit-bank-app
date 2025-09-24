import { Text } from "react-native-paper";
import { ScrollView, Platform } from "react-native";
import styled from "styled-components/native";
import ParallaxScrollView from "@/components/ParralaxView";
import React, { ReactElement } from "react";
import theme from "@/theme";

const commonPadding = Platform.OS === "ios" ? 20 : 30;

const StyledView = styled(ScrollView)({
  paddingTop: 20,
  gap: 15,
  paddingLeft: commonPadding,
  paddingRight: commonPadding,
});

const policyContent = {
  policyTitle: "Policy",
  policyText: {
    type: "text",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. \n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. \n\nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
  termsTitle: "Terms and Conditions",
  termsText: {
    type: "text",
    content:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. \n\nDuis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
  },
};

const TermsAndConditions = (): ReactElement => {
  return (
    <ParallaxScrollView>
      <StyledView>
        <Text variant="headlineMedium" style={{ color: theme.colors.primary }}>
          {policyContent.policyTitle}
        </Text>
        <Text style={{ marginBottom: 20 }}>
          {policyContent.policyText.content}
        </Text>

        <Text variant="headlineMedium" style={{ color: theme.colors.primary }}>
          {policyContent.termsTitle}
        </Text>
        <Text>{policyContent.termsText.content}</Text>
      </StyledView>
    </ParallaxScrollView>
  );
};

export default TermsAndConditions;
