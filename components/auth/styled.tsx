import { View, Text } from "react-native";
import { styled } from "styled-components/native";

//common
export const ElevatedView = styled(View)({
  width: "100%",
  maxWidth: 480,
  backgroundColor: "white",
  borderTopLeftRadius: 40,
  borderTopRightRadius: 40,
  paddingVertical: 20,
  paddingHorizontal: 30,
  position: "absolute",
  bottom: 0,
  display: "flex",
  flexDirection: "column",
  gap: 20,
});

export const Title = styled(Text)({
  fontSize: 20,
  fontFamily: "PoppinsBold",
  textAlign: "center",
  color: "#333",
});
export const Subtitle = styled(Text)({
  fontSize: 14,
  color: "#666",
});
export const FormView = styled(View)({
  display: "flex",
  flexDirection: "column",
  gap: 15,
});
