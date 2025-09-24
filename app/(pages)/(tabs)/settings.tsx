import React, { useState } from "react";
import { Text } from "react-native-paper";
import { Modal, TouchableOpacity, View, Platform } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ParallaxScrollView from "@/components/ParralaxView";
import styled from "styled-components/native";
import { useRouter } from "expo-router";
import theme from "@/theme";
import { useTranslation } from "react-i18next";
import { ISettingsModal } from "@/components/settings/type";
import { languageSetting } from "@/components/settings/utils";
import { useAuth } from "@/context/authContext";

const commonPadding = Platform.OS === "ios" ? 16 : 12;

const StyledView = styled(View)({
  paddingTop: 15,
  gap: 10,
  paddingLeft: commonPadding,
  paddingRight: commonPadding,
});

const Section = styled(View)({
  padding: commonPadding,
  alignItems: "center",
});

const SectionTitle = styled(Text)({
  fontSize: 17,
  fontWeight: "600",
  padding: commonPadding,
  marginBottom: 26,
});

const Description = styled(Text)({
  fontSize: 16,
  color: theme.colors.primary,
  padding: commonPadding,
  paddingBottom: 7,
  fontWeight: "bold",
});

const MenuItem = styled(TouchableOpacity)({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  padding: commonPadding,
  borderBottomWidth: 1,
  borderBottomColor: "white",
  backgroundColor: "white",
  borderRadius: 10,
  shadowColor: "#d8e1eb",
  shadowRadius: 8,
});

const MenuText = styled(Text)({
  fontSize: 16,
  color: "#000000",
});

const LogoutItem = styled(MenuItem)({
  padding: commonPadding,
  gap: 100,
  borderBottomWidth: 1,
  borderBottomColor: "white",
  marginTop: 20,
});

const LogoutText = styled(Text)({
  color: "#FF0000",
  fontSize: 17,
  fontWeight: "bold",
});

const ModalContainer = styled(View)({
  flex: 1,
  justifyContent: "center",
  alignItems: "center",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  alignSelf: "center",
  width: 480,
});

const ModalContent = styled(View)({
  backgroundColor: "white",
  padding: 20,
  borderRadius: 25,
  width: "70%",
  alignItems: "center",
});
const ModalText = styled(Text)({
  fontSize: 19,
  marginBottom: 25,
  fontWeight: "600",
  padding: commonPadding,
});

const ModalButton = styled(TouchableOpacity)({
  backgroundColor: "#FFFFFF",
  padding: 6,
  width: "50%",
  alignItems: "center",
  borderTopWidth: 2,
  borderTopColor: "#D3D3D3",
});

const ModalButtonText = styled(Text)({
  fontSize: 16,
  fontWeight: "600",
  marginTop: 15,
});

const Separator = styled(View)(() => ({
  borderLeftWidth: 2,
  borderLeftColor: "#D3D3D3",
  height: "100%",
}));

const ButtonsContainer = styled(View)(() => ({
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
}));

const LanguageView = styled(View)({
  flexDirection: "row",
  gap: 10,
  alignItems: "center",
});

const LanguageText = styled(Text)({
  fontSize: 16,
  color: "#000000",
  fontWeight: "bold",
});

const LanguageItem = styled(TouchableOpacity)({
  width: "100%",
  padding: 10,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  backgroundColor: "#f0f0f0",
  borderRadius: 10,
  marginTop: 2,
  marginBottom: 2,
});

const SettingsModal = (props: ISettingsModal) => {
  const { open, title, children } = props;
  return (
    <Modal visible={open} transparent animationType="fade">
      <ModalContainer>
        <ModalContent>
          <ModalText>{title}</ModalText>
          {children}
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
};

const SettingsScreen = () => {
  const { i18n } = useTranslation();
  const { logout } = useAuth();
  const reroute = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const [visible, setVisible] = useState(false);

  const handleLogout = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  const handleConfirmLogout = () => {
    logout();
  };

  const handleLanguageChange = (lng: string) => {
    i18n.changeLanguage(lng);
    setVisible(false);
  };

  return (
    <ParallaxScrollView>
      <StyledView>
        <Section>
          <SectionTitle>Settings</SectionTitle>
        </Section>

        <Description>General</Description>
        <MenuItem onPress={() => reroute.push("/profile")}>
          <MenuText>My Profile</MenuText>
          <MaterialIcons name="chevron-right" size={24} color="#7E848D" />
        </MenuItem>

        <MenuItem onPress={() => reroute.push("/contactUs")}>
          <MenuText>Contact Us</MenuText>
          <MaterialIcons name="chevron-right" size={24} color="#7E848D" />
        </MenuItem>

        <MenuItem onPress={() => setVisible(true)}>
          <MenuText>Language</MenuText>
          <LanguageView>
            <LanguageText>
              {i18n.language !== "en"
                ? i18n.language.toUpperCase().slice(2, 4)
                : "en".toUpperCase()}
            </LanguageText>
            <MaterialIcons name="more-vert" size={24} color="#7E848D" />
          </LanguageView>
        </MenuItem>

        <Description>Security</Description>
        <MenuItem onPress={() => reroute.push("/termsAndConditons")}>
          <MenuText>Terms and Conditions</MenuText>
          <MaterialIcons name="chevron-right" size={24} color="#7E848D" />
        </MenuItem>
        <MenuItem onPress={() => reroute.push("/changePassword")}>
          <MenuText>Change Password</MenuText>
          <MaterialIcons name="chevron-right" size={24} color="#7E848D" />
        </MenuItem>

        <LogoutItem onPress={handleLogout}>
          <LogoutText>Log out</LogoutText>
          <MaterialIcons name="exit-to-app" size={24} color="#FF0000" />
        </LogoutItem>

        <SettingsModal open={modalVisible} title="Log out">
          <Text style={{ fontSize: 14, marginBottom: 30 }}>
            Are you sure you want to logout?
          </Text>

          <ButtonsContainer>
            <ModalButton onPress={handleConfirmLogout}>
              <ModalButtonText style={{ color: "red" }}>
                Log out
              </ModalButtonText>
            </ModalButton>
            <Separator />
            <ModalButton onPress={handleCloseModal}>
              <ModalButtonText>Cancel</ModalButtonText>
            </ModalButton>
          </ButtonsContainer>
        </SettingsModal>

        <SettingsModal open={visible} title="Language">
          {languageSetting.map(({ label, code }, index) => (
            <LanguageItem
              key={index}
              onPress={() => handleLanguageChange(code)}
            >
              <MenuText>{label}</MenuText>
            </LanguageItem>
          ))}
        </SettingsModal>
      </StyledView>
    </ParallaxScrollView>
  );
};

export default SettingsScreen;
