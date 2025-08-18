import { Form } from "@/components/form/Form";
import { useRouter } from "expo-router";
import { useFormikContext } from "formik";
import React, { ReactElement, ReactNode, useState } from "react";
import { Modal, Pressable, ScrollView, View } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { styled } from "styled-components/native";
import { PhoneVerifyForm } from "../type";
import { countryCodes } from "../utils";

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

const VerifyPhoneForm = (): ReactElement => {
  const router = useRouter();
  const { values, setFieldValue } = useFormikContext<PhoneVerifyForm>();
  const [modalOpen, setModalOpen] = useState(false);
  const renderSubmitBtn = (): ReactNode => {
    return (
      <Form.Button
        mode="contained"
        submitFn={() => router.push("/(auth)/otpverify")}
        disabled={values.phoneNumber.length < 10}
        contentStyle={{ height: 45 }}
        style={{ borderRadius: 10 }}
      >
        SEND CODE
      </Form.Button>
    );
  };

  const renderModal = () => {
    const modalHeader = () => {
      return (
        <ModalHeader>
          <ModalTitle>Select Country Code</ModalTitle>
        </ModalHeader>
      );
    };
    const modalBody = () => {
      return (
        <ModalBody>
          {countryCodes.map((code) => (
            <Pressable
              key={code.value}
              onPress={() => {
                setFieldValue("countryCode", code.value);
                setModalOpen(false);
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
      );
    };
    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalOpen}
        onRequestClose={() => setModalOpen(false)}
      >
        <ModalOverlay onPress={() => setModalOpen(false)} />
        <ModalContainer>
          {modalHeader()}
          {modalBody()}
        </ModalContainer>
      </Modal>
    );
  };
  return (
    <>
      <PhoneInputContainer>
        <Form.ControlledTextInput
          label=""
          name="countryCode"
          value={values.countryCode}
          style={{ width: "25%" }}
          editable={false}
          right={
            <TextInput.Icon
              icon="chevron-down"
              onPress={() => setModalOpen(true)}
            />
          }
        />

        <Form.ControlledTextInput
          label=""
          name="phoneNumber"
          value={values.phoneNumber.replace(/\D/g, "")}
          style={{ width: "73%" }}
          inputMode="tel"
          keyboardType="phone-pad"
          placeholder="Enter phone number"
          maxLength={10}
        />
      </PhoneInputContainer>
      {renderSubmitBtn()}
      {renderModal()}
    </>
  );
};

export default VerifyPhoneForm;
