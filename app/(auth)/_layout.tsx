import { Stack } from "expo-router";
import React, { ReactElement } from "react";

const AuthenticationLayout = (): ReactElement => {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
};

export default AuthenticationLayout;
