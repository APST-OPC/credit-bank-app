import React, { useState } from "react";
import {
  Text,
  TextInput as RNPTextInput,
  TextInputProps,
} from "react-native-paper";

export interface ITextInput extends TextInputProps {
  label: string;
  type?: "password" | "text";
  iconColor?: string;
}

const TextInput = (props: ITextInput) => {
  const {
    label,
    type = "text",
    mode = "outlined",
    right,
    placeholderTextColor = "#9A9A9A",
    iconColor = "#9A9A9A",
    ...rest
  } = props;

  const [show, setShow] = useState(false);
  return (
    <>
      <Text variant="bodyLarge">{label}</Text>
      <RNPTextInput
        mode={mode}
        outlineStyle={{ borderRadius: 10 }}
        activeOutlineColor="#0265A1"
        placeholderTextColor={placeholderTextColor}
        right={
          type === "password" ? (
            <RNPTextInput.Icon
              icon={show ? "eye" : "eye-off"}
              onPress={() => setShow((prev) => !prev)}
              color={iconColor}
            />
          ) : (
            right
          )
        }
        secureTextEntry={type === "password" ? !show : false}
        {...rest}
      />
    </>
  );
};

export default TextInput;
