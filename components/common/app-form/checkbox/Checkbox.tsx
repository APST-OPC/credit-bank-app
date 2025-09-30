import React from "react";
import { View } from "react-native";
import { HelperText, Checkbox as RNCheckbox, Text } from "react-native-paper";
import styled from "styled-components/native";
import { ICheckbox } from "@/components/common/app-form/type";

const CheckBoxView = styled(View)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 5,
});

const Checkbox = (props: ICheckbox) => {
  const { label, name, errorFn, errorMsg, status, ...rest } = props;
  return (
    <View>
      <CheckBoxView nativeID={name}>
        <RNCheckbox status={status} {...rest} />
        <Text variant="bodyLarge">{label}</Text>
      </CheckBoxView>
      {errorFn && <HelperText type="error">{errorMsg}</HelperText>}
    </View>
  );
};

export default Checkbox;
