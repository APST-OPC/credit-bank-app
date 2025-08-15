import { ReactNode, useState } from "react";
import { ScrollView, View, Modal, Pressable, Platform } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import styled from "styled-components/native";
import { useRouter } from "expo-router";
import React from "react";
import AuthContainer from "@/components/auth/auth-container/AuthContainer";
import ElevatedView from "@/components/auth/elevated-view/ElevatedView";
import { Subtitle, Title } from "@/components/auth/styled";
import { KeyboardAvoidingView } from "react-native";
import { Form } from "@/components/form/Form";

const countryCodes = [
  { label: "Philippines (+63)", value: "+63" },
  { label: "United States (+1)", value: "+1" },
  { label: "United Kingdom (+44)", value: "+44" },
  { label: "Australia (+61)", value: "+61" },
  { label: "China (+86)", value: "+86" },
];

export default function VerifyPhoneScreen() {
  const [countryCode, setCountryCode] = useState(countryCodes[0]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const router = useRouter();

  const renderHeader = (): ReactNode => {
    return (
      <>
        <Title>Verify your phone number</Title>
        <Subtitle>
          We will send you a One-Time-Password (OTP){"\n"}
          on this mobile number.
        </Subtitle>
      </>
    );
  };

  const renderPhoneInput = (): ReactNode => {
    return (
      <PhoneInputContainer>
        <Form.ControlledTextInput
          label=""
          name="countryCode"
          value={countryCode.value}
          style={{ width: "25%" }}
          editable={false}
          right={
            <TextInput.Icon
              icon="chevron-down"
              onPress={() => setModalVisible(true)}
            />
          }
        />

        <Form.ControlledTextInput
          label=""
          name="phoneNumber"
          style={{ width: "73%" }}
          onChangeText={(text: string) =>
            setPhoneNumber(text.replace(/[^0-9]/g, "").slice(0, 10))
          }
          keyboardType="phone-pad"
          placeholder="Enter phone number"
          maxLength={10}
        />
      </PhoneInputContainer>
    );
  };

  const renderSubmitBtn = (): ReactNode => {
    return (
      <Form.Button
        mode="contained"
        // onPress={() => router.push("/(auth)/otpverify")}
        submitFn={() => router.push("/(auth)/otpverify")}
        disabled={phoneNumber.length < 10}
        contentStyle={{ height: 45 }}
        style={{ borderRadius: 10 }}
      >
        SEND CODE
      </Form.Button>
    );
  };

  const renderModal = () => {
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <ModalOverlay onPress={() => setModalVisible(false)} />
        <ModalContainer>
          <ModalHeader>
            <ModalTitle>Select Country Code</ModalTitle>
          </ModalHeader>
          <ModalBody>
            {countryCodes.map((code) => (
              <Pressable
                key={code.value}
                onPress={() => {
                  setCountryCode(code);
                  setModalVisible(false);
                }}
                style={{
                  paddingVertical: 15,
                  paddingHorizontal: 20,
                  borderBottomWidth: 1,
                  borderBottomColor: "#f0f0f0",
                }}
              >
                <Text style={{ fontSize: 16 }}>{code.label}</Text>
              </Pressable>
            ))}
          </ModalBody>
          <ModalFooter>
            <Button
              mode="outlined"
              onPress={() => setModalVisible(false)}
              style={{ borderRadius: 20 }}
            >
              CANCEL
            </Button>
          </ModalFooter>
        </ModalContainer>
      </Modal>
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <AuthContainer>
        <Form
          instance={{
            initialValues: { countryCode: "", phoneNumber: "" },
            onSubmit: (values) => console.log(values),
          }}
        >
          <ElevatedView>
            {renderHeader()}
            {renderPhoneInput()}
            {renderSubmitBtn()}
          </ElevatedView>
        </Form>

        {renderModal()}
      </AuthContainer>
    </KeyboardAvoidingView>
  );
}

const PhoneInputContainer = styled(View)({
  display: "flex",
  flexDirection: "row",
  justifyContent: "space-between",
});

const ModalOverlay = styled(Pressable)({
  flex: 1,
});

const ModalContainer = styled(View)({
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

const ModalHeader = styled(View)({
  alignItems: "center",
  padding: 10,
});

const ModalTitle = styled(Text)({
  fontSize: 18,
  fontWeight: "bold",
});

const ModalBody = styled(ScrollView)({
  maxHeight: "300px",
});

const ModalFooter = styled(View)({
  alignItems: "center",
  padding: 10,
});
