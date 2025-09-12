import type { ReactElement, ReactNode } from "react";
import type { IVerifierModal, PhoneVerifyForm } from "@/components/auth/type";
import { useState } from "react";
import {
  Modal,
  Platform,
  Pressable,
  Text,
  KeyboardAvoidingView,
} from "react-native";
import { TextInput } from "react-native-paper";
import { useRouter } from "expo-router";
import { useFormikContext } from "formik";
import React from "react";

import AuthContainer from "@/components/auth/auth-container/AuthContainer";
import {
  ElevatedView,
  ModalBody,
  ModalContainer,
  ModalHeader,
  ModalOverlay,
  ModalTitle,
  PhoneInputContainer,
  Subtitle,
  Title,
} from "@/components/auth/styled";
import { Form } from "@/components/common/form/Form";
import { countryCodes } from "@/components/auth/utils";
import FormContainer from "@/components/common/form/form-container/FormContainer";

const CountryModal = (props: IVerifierModal) => {
  const { open, handleFieldValue, handleOnClose } = props;
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
              handleFieldValue("countryCode", code.value);
              handleOnClose();
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
      visible={open}
      onRequestClose={handleOnClose}
    >
      <ModalOverlay onPress={handleOnClose} />
      <ModalContainer>
        {modalHeader()}
        {modalBody()}
      </ModalContainer>
    </Modal>
  );
};

const VerifyPhoneForm = (): ReactElement => {
  const { Button, ControlledTextInput } = Form;
  const router = useRouter();
  const { values, setFieldValue } = useFormikContext<PhoneVerifyForm>();
  const [modalOpen, setModalOpen] = useState(false);
  const handleFieldValue = (name: string, value: string) => {
    setFieldValue(name, value);
  };

  return (
    <FormContainer>
      <PhoneInputContainer>
        <ControlledTextInput
          name="countryCode"
          style={{ width: "25%" }}
          editable={false}
          right={
            <TextInput.Icon
              icon="chevron-down"
              onPress={() => setModalOpen(true)}
            />
          }
        />
        <ControlledTextInput
          name="phoneNumber"
          value={values.phoneNumber.replace(/\D/g, "")}
          style={{ width: "73%" }}
          inputMode="tel"
          keyboardType="phone-pad"
          placeholder="Enter phone number"
          maxLength={10}
        />
        <CountryModal
          open={modalOpen}
          handleFieldValue={handleFieldValue}
          handleOnClose={() => setModalOpen(false)}
        />
      </PhoneInputContainer>
      <Button
        submitFn={() => router.push("/(auth)/otpverify")}
        disabled={values.phoneNumber.length < 10}
      >
        SEND CODE
      </Button>
    </FormContainer>
  );
};

const VerifyPhoneScreen = (): ReactElement => {
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
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <AuthContainer>
        <Form
          instance={{
            initialValues: {
              countryCode: countryCodes[0].value,
              phoneNumber: "",
            },
            onSubmit: (values) => console.log(values),
          }}
        >
          <ElevatedView>
            {renderHeader()}
            <VerifyPhoneForm />
          </ElevatedView>
        </Form>
      </AuthContainer>
    </KeyboardAvoidingView>
  );
};

export default VerifyPhoneScreen;
