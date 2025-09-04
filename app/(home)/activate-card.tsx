import React, {
  Fragment,
  ReactElement,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from "react";
import styled from "styled-components/native";
import { Card, Switch, Text } from "react-native-paper";
import Animated from "react-native-reanimated";
import { LinearGradient } from "expo-linear-gradient";
import {
  ImageBackground,
  Modal,
  Platform,
  TouchableOpacity,
  View,
} from "react-native";

import Container from "@/components/Container";

import BottomSheet, { BottomSheetMethods } from "@devvie/bottom-sheet";

import CreditCard from "@/components/credit-carousel/CreditCard";
import { Ionicons } from "@expo/vector-icons";

const TextBold = styled(Text)({
  fontFamily: "PoppinsBold",
  color: "#FFFFFF",
});

const ContainerOpacity = styled(View)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  borderRadius: 10,
  backgroundColor: "rgba(255, 255, 255, 0.7)",
  justifyContent: "center",
  alignItems: "center",
});

const Overlay = styled(View)({
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.5)",
  justifyContent: "center",
  pointerEvents: "auto",
  width: 480,
  alignSelf: "center",
});

const ModalContainer = styled(View)({
  backgroundColor: "#fff",
  borderRadius: 20,
  width: 350,
  padding: 25,
  alignSelf: "center",
  overflow: "hidden",
  position: "absolute",
});

const ButtonContainer = styled(View)({
  flexDirection: "row",
  justifyContent: "space-between",
  width: "100%",
});

const ModalButton = styled(TouchableOpacity)({
  backgroundColor: "white",
  padding: 6,
  width: "50%",
  alignItems: "center",
  borderTopWidth: 2,
  borderTopColor: "#D3D3D3",
});

const ButtonText = styled(Text)({
  fontSize: 16,
  fontWeight: 600,
  fontFamily: "PoppinsBold",
});

const Separator = styled(View)({
  borderLeftWidth: 2,
  borderLeftColor: "#D3D3D3",
  height: "100%",
});

const TextWhite = styled(Text)({
  fontFamily: "PoppinsSemiBold",
  color: "#FFFFFF",
});

interface CardSettingProps {
  label: string;
  value: boolean;
  onToggle: () => void;
}

interface CardLockProps {
  isVisible: boolean;
  isLocked: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

interface CustomOverlayProps {
  closeBottomSheet: () => void;
}

const CardSetting = (props: CardSettingProps): ReactElement => {
  const { label, value, onToggle } = props;
  return (
    <Card
      style={{
        ...(Platform.OS === "web" && { padding: 8 }),
        ...(Platform.OS === "ios" && { padding: 8 }),
      }}
    >
      <Card.Content
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          paddingVertical: 8,
        }}
      >
        <Text variant="bodyLarge" style={{ fontFamily: "PoppinsSemiBold" }}>
          {label}
        </Text>
        <Switch hitSlop={20} value={value} onValueChange={onToggle} />
      </Card.Content>
    </Card>
  );
};

const CardLockModal = (props: CardLockProps): ReactElement => {
  const { isVisible, isLocked, onClose, onConfirm } = props;
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <Overlay>
        <ModalContainer>
          <View>
            <Text
              style={{
                marginTop: 20,
                fontFamily: "PoppinsBold",
                textAlign: "center",
                fontSize: 25,
              }}
            >
              {!isLocked ? "Lock card?" : "Unlock card?"}
            </Text>
            <Text
              style={{
                marginTop: 15,
                textAlign: "center",
                marginBottom: 30,
              }}
            >
              {!isLocked
                ? "You will no longer be able to make new purchases or pay for them using your digital wallet."
                : "You will be able to make new purchases or pay for them using your digital wallet again."}
            </Text>
          </View>
          <ButtonContainer>
            <ModalButton onPress={onConfirm}>
              <ButtonText
                style={{
                  marginTop: 15,
                  fontSize: 19,
                  color: isLocked ? "#0094F1" : "red",
                }}
              >
                {!isLocked ? "Lock" : "Unlock"}
              </ButtonText>
            </ModalButton>
            <Separator />
            <ModalButton onPress={onClose}>
              <ButtonText
                style={{
                  marginTop: 15,
                  fontSize: 19,
                  fontFamily: "PoppinsBold",
                }}
              >
                Cancel
              </ButtonText>
            </ModalButton>
          </ButtonContainer>
        </ModalContainer>
      </Overlay>
    </Modal>
  );
};

const CustomOverlay = ({
  closeBottomSheet,
}: CustomOverlayProps): ReactElement => {
  return (
    <TouchableOpacity
      onPress={closeBottomSheet}
      activeOpacity={1}
      style={{
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        width: "100%",
        alignSelf: "center",
      }}
    />
  );
};

const ActivateCard = () => {
  const [isLockCard, setIsLockCard] = useState<boolean>(false);
  const [isLockVisible, setIsLockVisible] = useState<boolean>(false);
  const [isHome, setIsHome] = useState<boolean>(false);

  const sheetRef = useRef<BottomSheetMethods>(null);

  const handleSnapPress = useCallback(() => {
    sheetRef.current?.open();
  }, []);

  const renderBottomSheet = (): ReactNode => {
    return (
      <BottomSheet
        ref={sheetRef}
        animationType={"slide"}
        height={"75%"}
        customBackdropComponent={() => (
          <CustomOverlay closeBottomSheet={() => sheetRef.current?.close()} />
        )}
        disableBodyPanning={isLockVisible === true}
      >
        <View
          style={{
            paddingHorizontal: 16,
            flexDirection: "column",
            rowGap: 16,
          }}
        >
          {isLockCard ? (
            <Fragment>
              <ImageBackground
                source={{ uri: "https://legacy.reactjs.org/logo-og.png" }}
                resizeMode="cover"
                style={{
                  borderRadius: 10,
                  overflow: "hidden",
                }}
              >
                <CreditCard />

                <ContainerOpacity>
                  <Ionicons name="lock-closed" size={62} color="gray" />
                </ContainerOpacity>
              </ImageBackground>
            </Fragment>
          ) : (
            <CreditCard />
          )}

          <View style={{ flexDirection: "column", rowGap: 8 }}>
            <Text variant="bodyLarge" style={{ fontFamily: "PoppinsBold" }}>
              Card Settings
            </Text>

            <CardSetting
              label={"Lock Card"}
              value={isLockCard}
              onToggle={() => setIsLockVisible(true)}
            />

            <CardSetting
              label={"Set Home Card"}
              value={isHome}
              onToggle={() => setIsHome(!isHome)}
            />
          </View>
        </View>
        <CardLockModal
          isVisible={isLockVisible}
          isLocked={isLockCard}
          onConfirm={() => {
            setIsLockCard(!isLockCard);
            setIsLockVisible(false);
          }}
          onClose={() => setIsLockVisible(false)}
        />
      </BottomSheet>
    );
  };

  return (
    <Fragment>
      <Container>
        <Animated.View
          style={{
            paddingHorizontal: 16,
            flexDirection: "column",
            rowGap: 5,
            paddingVertical: 8,
          }}
        >
          <Card elevation={3}>
            <LinearGradient
              colors={["#9EA448", "#B93B3B"]}
              style={{ borderRadius: 10 }}
              start={{ x: 0, y: 1 }}
              end={{ x: 1, y: 0.8 }}
            >
              <TouchableOpacity onPress={handleSnapPress}>
                <Card.Content
                  style={{
                    padding: 20,
                    flexDirection: "column",
                    rowGap: 5,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <TextWhite variant="bodyMedium">Credit Card</TextWhite>
                    <TextWhite variant="bodyMedium">
                      1234 1234 1234 1234
                    </TextWhite>
                  </View>

                  <TextBold variant="bodyMedium">Personal Savings</TextBold>

                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <TextBold variant="bodyMedium">123456789</TextBold>
                    <TextBold variant="bodyMedium">PHP 128,000.00</TextBold>
                  </View>
                </Card.Content>
              </TouchableOpacity>
            </LinearGradient>
          </Card>
        </Animated.View>
      </Container>

      {renderBottomSheet()}
    </Fragment>
  );
};

export default ActivateCard;
