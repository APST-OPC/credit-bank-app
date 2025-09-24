import { Text } from "react-native";
import React from "react";
import { Button, ButtonProps } from "react-native-paper";

const SubmitButton = (props: ButtonProps) => {
  const { children, mode = "contained", ...rest } = props;
  return (
    <Button
      mode={mode}
      style={{ paddingVertical: 5 }}
      labelStyle={{ fontSize: 17 }}
      {...rest}
    >
      <Text>{children}</Text>
    </Button>
  );
};

export default SubmitButton;
