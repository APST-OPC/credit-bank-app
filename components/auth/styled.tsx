import {
  View,
  Image,
  Text,
  TouchableOpacity,
  Pressable,
  ScrollView,
} from "react-native";
import { styled } from "styled-components/native";
import theme from "@/theme";

//auth-container
export const Container = styled(View)({
  flex: 1,
  width: "100%",
  maxWidth: 480,
  alignSelf: "center",
  position: "relative",
});
export const Background = styled(Image)({
  flex: 1,
  width: "100%",
  height: "100%",
});

//auth-description
export const SocialButtons = styled(View)({
  flexDirection: "row",
  justifyContent: "center",
  gap: 30,
});
export const AuthContainer = styled(View)({
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  gap: 5,
});
export const AuthText = styled(Text)({
  color: "#666",
});
export const SocialIcon = styled(Image)({
  width: 30,
  height: 30,
});
export const DescriptionView = styled(View)({
  display: "flex",
  flexDirection: "column",
  gap: 10,
});
export const ModeButton = styled(TouchableOpacity)({
  marginTop: 4,
});
export const ModeLabel = styled(Text)({
  color: theme.colors.primary,
  fontFamily: "PoppinsSemiBold",
});

//elevated-view
export const StyledElevatedView = styled(View)({
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

//verified
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

//verify-phone-form
export const PhoneInputContainer = styled(View)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});
export const ModalOverlay = styled(Pressable)({
  flex: 1,
});
export const ModalContainer = styled(View)({
  bottom: 0,
  width: "100%",
  backgroundColor: "white",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  padding: "20px 0",
  boxShadow: "0px -2px 10px rgba(0, 0, 0, 0.1)",
  maxWidth: "480px",
  alignSelf: "center",
});
export const ModalHeader = styled(View)({
  alignItems: "center",
  padding: 10,
});
export const ModalTitle = styled(Text)({
  fontSize: 18,
  fontWeight: "bold",
});
export const ModalBody = styled(ScrollView)({
  maxHeight: "300px",
});
