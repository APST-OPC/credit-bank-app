import { Stack } from "expo-router";
import StackLayout from "@/components/StackLayout";
import React from "react";

const SettingsLayout = () => {
  return (
    <StackLayout>
      <Stack.Screen
        name="changePassword"
        options={{
          headerShown: true,
          headerTitle: "Change Password",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="contactUs"
        options={{
          headerShown: true,
          headerTitle: "Contact Us",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="profile"
        options={{
          headerShown: true,
          headerTitle: "My Profile",
          headerTitleAlign: "center",
        }}
      />
      <Stack.Screen
        name="termsAndConditons"
        options={{
          headerShown: true,
          headerTitle: "Terms and Conditions",
          headerTitleAlign: "center",
        }}
      />
    </StackLayout>
  );
};

export default SettingsLayout;
