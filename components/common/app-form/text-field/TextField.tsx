import React, { useState } from "react";
import { View } from "react-native";
import { Text, TextInput } from "react-native-paper";
import { ITextInput } from "@/components/common/app-form/type";

const TextField = (props: ITextInput) => {
  const {
    label,
    width = "100%",
    errorFn,
    type = "text",
    mode = "outlined",
    right,
    placeholderTextColor = "#9A9A9A",
    iconColor = "#9A9A9A",
    ...rest
  } = props;

  const [show, setShow] = useState(false);
  return (
    <View style={{ width: width }}>
      <Text
        variant="bodyLarge"
        style={{ color: errorFn ? "red" : "black", marginBottom: 5 }}
      >
        {label}
      </Text>
      <TextInput
        mode={mode}
        outlineStyle={{
          borderRadius: 10,
          borderColor: errorFn ? "red" : "#A9A9A9",
        }}
        activeOutlineColor="#0265A1"
        placeholderTextColor={errorFn ? "red" : placeholderTextColor}
        right={
          type === "password" ? (
            <TextInput.Icon
              icon={show ? "eye" : "eye-off"}
              onPress={() => setShow((prev) => !prev)}
              color={errorFn ? "red" : iconColor}
            />
          ) : (
            right
          )
        }
        secureTextEntry={type === "password" ? !show : false}
        {...rest}
      />
    </View>
  );
};

export default TextField;
