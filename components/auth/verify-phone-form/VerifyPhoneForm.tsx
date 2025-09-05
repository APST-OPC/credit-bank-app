import { Form } from "@/components/common/form/Form";
import { useRouter } from "expo-router";
import { useFormikContext } from "formik";
import React, { ReactElement, ReactNode, useState } from "react";
import { Modal, Pressable } from "react-native";
import { TextInput, Text } from "react-native-paper";
import { PhoneVerifyForm } from "../type";
import { countryCodes } from "../utils";
import {
  ModalHeader,
  ModalTitle,
  ModalBody,
  ModalOverlay,
  ModalContainer,
  PhoneInputContainer,
} from "@/components/auth/styled";

const VerifyPhoneForm = (): ReactElement => {
  const router = useRouter();
  const { values, setFieldValue } = useFormikContext<PhoneVerifyForm>();
  const [modalOpen, setModalOpen] = useState(false);
  const renderSubmitBtn = (): ReactNode => {
    return (
      <Form.Button
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
