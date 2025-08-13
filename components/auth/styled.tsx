import { View, Image, Text } from "react-native";
import { styled } from "styled-components/native";

export const Container = styled(View)({
  flex: 1,
  width: "100%",
  maxWidth: 480,
  alignSelf: "center",
  position: "relative",
});
export const BackgroundImage = styled(Image)({
  flex: 1,
  width: "100%",
  height: "100%",
  position: "absolute",
});

export const Title = styled(Text)({
  fontSize: 27,
  fontFamily: "PoppinsBold",
  textAlign: "center",
  color: "#333",
});
