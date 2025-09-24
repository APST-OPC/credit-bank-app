import React, { PropsWithChildren } from "react";
import { View } from "react-native";
import styled from "styled-components/native";

const FormView = styled(View)({
  paddingHorizontal: 16,
  paddingVertical: 20,
  gap: 15,
});
const FormContainer = ({ children }: PropsWithChildren) => {
  return <FormView>{children}</FormView>;
};

export default FormContainer;
