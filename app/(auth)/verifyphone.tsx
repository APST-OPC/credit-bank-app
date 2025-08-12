import { useState } from "react";
import { ScrollView, View, Modal, Pressable, Image } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";
import styled from "styled-components/native";
import { useRouter } from "expo-router";
import theme from "@/theme";
import React from "react";

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

  return (
    <Container>
      <BackgroundImage
        source={require("@/assets/images/bgworld.png")}
        resizeMode="cover"
      />

      <ScrollView
        contentContainerStyle={{ flexGrow: 1, justifyContent: "flex-end" }}
      >
        <Card>
          <Title>Verify your phone number</Title>
          <Subtitle>
            We will send you a One-Time-Password (OTP){"\n"}
            on this mobile number.
          </Subtitle>

          <PhoneInputContainer>
            <Pressable onPress={() => setModalVisible(true)}>
              <CountryCodeInput
                mode="outlined"
                value={countryCode.value}
                editable={false}
                pointerEvents="none"
                right={
                  <TextInput.Icon
                    icon="chevron-down"
                    onPress={() => setModalVisible(true)}
                  />
                }
              />
            </Pressable>

            <PhoneInput
              mode="outlined"
              value={phoneNumber}
              onChangeText={(text: string) =>
                setPhoneNumber(text.replace(/[^0-9]/g, "").slice(0, 10))
              }
              keyboardType="phone-pad"
              placeholder="Enter phone number"
              maxLength={10}
            />
          </PhoneInputContainer>

          <Button
            mode="contained"
            onPress={() => router.push("/(auth)/otpverify")}
            disabled={phoneNumber.length < 10}
            contentStyle={{ height: 45 }}
            buttonColor={theme.colors.primary}
            style={{ borderRadius: 10 }}
          >
            SEND CODE
          </Button>
        </Card>
      </ScrollView>

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
    </Container>
  );
}

const Container = styled(View)({
  flex: 1,
  width: "100%",
  maxWidth: "480px",
  alignSelf: "center",
});

const BackgroundImage = styled(Image)({
  flex: 1,
  width: "100%",
  height: "100%",
  position: "absolute",
});

const Card = styled(View)({
  width: "100%",
  maxWidth: "480px",
  alignSelf: "center",
  backgroundColor: "white",
  borderTopLeftRadius: 20,
  borderTopRightRadius: 20,
  padding: "50px 50px",
  elevation: 4,
});

const Title = styled(Text)({
  fontSize: 24,
  fontWeight: "600",
  marginBottom: 10,
  color: "#333",
});

const Subtitle = styled(Text)({
  fontSize: 14,
  color: "#666",
  marginBottom: 25,
  lineHeight: 20,
});

const PhoneInputContainer = styled(View)({
  paddingBottom: 300,
  flexDirection: "row",
  gap: 8,
  marginBottom: 30,
});

const CountryCodeInput = styled(TextInput)({
  width: 90,
  backgroundColor: "white",
});

const PhoneInput = styled(TextInput)({
  flex: 1,
  backgroundColor: "white",
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
