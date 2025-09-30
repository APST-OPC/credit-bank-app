import { View, Text, Pressable, ScrollView, Image } from "react-native";
import { styled } from "styled-components/native";
import TextField from "../common/app-form/text-field/TextField";

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

//verify-phone-form
export const PhoneInputContainer = styled(View)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
  gap: 5,
});

//Modal
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
export const ModalOverlay = styled(Pressable)({
  flex: 1,
});

//otp verify
export const OtpInput = styled(TextField)({
  width: 60,
  height: 60,
  fontSize: 30,
  paddingLeft: 7,
});
export const OtpContainer = styled.View({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});
export const OtpFormView = styled(View)({
  gap: 15,
});

//verified
export const Content = styled(View)({
  display: "flex",
  width: "100%",
  height: "100%",
  justifyContent: "center",
  alignItems: "center",
  padding: 20,
  position: "absolute",
});
export const IconContainer = styled(Image)({
  width: 80,
  height: 80,
  marginBottom: 20,
});
export const VerifiedTitle = styled(Text)({
  fontSize: 24,
  fontWeight: "bold",
  color: "#fff",
  marginBottom: 10,
});
export const VerifiedSubtitle = styled(Text)({
  fontSize: 16,
  color: "#fff",
  textAlign: "center",
  marginBottom: 40,
  opacity: 0.8,
});
