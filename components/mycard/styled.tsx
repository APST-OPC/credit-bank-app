import styled from "styled-components/native";
import { Form } from "@/components/form/Form";
import { View } from "react-native";

export const StyledTextInput = styled(Form.ControlledTextInput)({
  width: "48.7%",
});
export const StyledLowerFormView = styled(View)({
  display: "flex",
  flexDirection: "row",
  gap: 10,
});
