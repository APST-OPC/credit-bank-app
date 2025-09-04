import { Text, Button, TextInput } from "react-native-paper";
import { ScrollView, Platform, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import ParallaxScrollView from "@/components/ParralaxView";
import React, { Fragment, ReactElement, useState } from "react";
import { MaterialIcons } from "@expo/vector-icons";
import theme from "@/theme";

const commonPadding = Platform.OS === "ios" ? 20 : 25;
const iconSize = Platform.OS === "ios" ? 28 : 25;
const iconColor = theme.colors.primary;

const StyledView = styled(ScrollView)({
  paddingTop: 20,
  paddingLeft: commonPadding,
  paddingRight: commonPadding,
});

const StyledButton = styled(Button)({
  borderRadius: 10,
  marginTop: 40,
  padding: 5,
});

const StyledButtonTitle = styled(Text)({
  color: "white",
  alignSelf: "center",
});

const StyledText = styled(Text)({
  color: "#6F6F6F",
  marginTop: 10,
  marginBottom: 10,
  fontSize: 16,
});

type PasswordFieldProps = {
  label: string;
  value: string;
  onChange: (value: string) => void;
  visibility: boolean;
  toggleVisibility: () => void;
};

const PasswordField = (props: PasswordFieldProps): ReactElement => {
  const { label, value, onChange, visibility, toggleVisibility } = props;
  const handleSpaceReject = (text: string) => {
    const newValue = text.replace(/\s/g, "");
    onChange(newValue);
  };

  return (
    <Fragment>
      <StyledText>{label}</StyledText>
      <TextInput
        placeholder={`Enter your ${label.toLowerCase()}`}
        mode="outlined"
        placeholderTextColor="#9A9A9A"
        activeOutlineColor={theme.colors.primary}
        value={value}
        onChangeText={handleSpaceReject}
        secureTextEntry={!visibility}
        right={
          <TextInput.Icon
            disabled={value.trim() === "" ? true : false}
            icon={() => (
              <TouchableOpacity onPress={toggleVisibility}>
                <MaterialIcons
                  name={visibility ? "visibility-off" : "visibility"}
                  size={iconSize}
                  color={value.trim() === "" ? "#A0A0A0" : iconColor}
                />
              </TouchableOpacity>
            )}
          />
        }
      />
    </Fragment>
  );
};

const ChangePassword = (): ReactElement => {
  const [passwords, setPasswords] = useState<{
    password: string;
    newPassword: string;
    confirmPassword: string;
  }>({
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [visibility, setVisibility] = useState<{
    password: boolean;
    newPassword: boolean;
    confirmPassword: boolean;
  }>({
    password: false,
    newPassword: false,
    confirmPassword: false,
  });

  const togglePasswordVisibility = (field: keyof typeof visibility) => {
    setVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const handlePasswordChange = (
    field: keyof typeof passwords,
    value: string
  ) => {
    setPasswords((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <ParallaxScrollView>
      <StyledView>
        <PasswordField
          label="Password"
          value={passwords.password}
          onChange={(value: string) => handlePasswordChange("password", value)}
          visibility={visibility.password}
          toggleVisibility={() => togglePasswordVisibility("password")}
        />
        <PasswordField
          label="New Password"
          value={passwords.newPassword}
          onChange={(value: string) =>
            handlePasswordChange("newPassword", value)
          }
          visibility={visibility.newPassword}
          toggleVisibility={() => togglePasswordVisibility("newPassword")}
        />
        <PasswordField
          label="Confirm Password"
          value={passwords.confirmPassword}
          onChange={(value: string) =>
            handlePasswordChange("confirmPassword", value)
          }
          visibility={visibility.confirmPassword}
          toggleVisibility={() => togglePasswordVisibility("confirmPassword")}
        />
        <StyledButton
          buttonColor={theme.colors.primary}
          textColor="white"
          labelStyle={{ fontSize: 17 }}
        >
          <StyledButtonTitle>SET PASSWORD</StyledButtonTitle>
        </StyledButton>
      </StyledView>
    </ParallaxScrollView>
  );
};

export default ChangePassword;
