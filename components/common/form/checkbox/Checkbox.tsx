import React from "react";
import { View } from "react-native";
import { Checkbox as RNCheckbox, Text } from "react-native-paper";
import styled from "styled-components/native";
import { ICheckbox } from "@/components/common/form/type";

const CheckBoxView = styled(View)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: 5,
});

const Checkbox = (props: ICheckbox) => {
  const { label, status, ...rest } = props;
  return (
    <CheckBoxView>
      <RNCheckbox status={status} {...rest} />
      <Text variant="bodyLarge">{label}</Text>
    </CheckBoxView>
  );
};

export default Checkbox;
