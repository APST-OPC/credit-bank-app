import React, { useState, useRef } from "react";
import {
  Animated,
  PanResponder,
  useWindowDimensions,
  Image,
  View,
} from "react-native";
import { Button, Text } from "react-native-paper";
import styled from "styled-components/native";
import { useOnboard } from "@/store/onboard/onBoard";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Container = styled.View`
  flex: 1;
  background-color: #006d84;
`;

const ContentWrapper = styled(Animated.View)`
  flex: 1;
  align-items: center;
  justify-content: center;
  padding: 20px;
  padding-bottom: 140px;
`;

const AnimationContainer = styled.View`
  width: 100%;
  height: 200px;
  align-items: center;
  justify-content: center;
  margin-bottom: 40px;
`;

const TitleText = styled(Text)`
  color: white;
  font-size: 24px;
  font-weight: bold;
  text-align: center;
  margin-bottom: 16px;
`;

const DescriptionText = styled(Text)`
  color: rgba(255, 255, 255, 0.8);
  font-size: 16px;
  text-align: center;
  line-height: 24px;
  max-width: 320px;
`;

const BottomSection = styled(View)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 70px;
  align-items: center;
`;

const PaginationContainer = styled.View`
  flex-direction: row;
  gap: 8px;
  margin-bottom: 20px;
`;

const PaginationDot = styled.View<{ isActive: boolean }>`
  width: ${(props: { isActive: string }) => (props.isActive ? "24px" : "8px")};
  height: 8px;
  border-radius: 4px;
  background-color: ${(props: { isActive: string }) =>
    props.isActive ? "white" : "rgba(255, 255, 255, 0.3)"};
`;

const screens = [
  {
    animation: require("@/assets/images/real-time.gif"),
    title: "Real-time Spending Insights",
    description:
      "Help you track expenses effortlessly with automatic categorization, detailed analytics, and instant alerts—giving you full control over your finances at a glance",
  },
  {
    animation: require("@/assets/images/notif.gif"),
    title: "Bank-Level Security",
    description:
      "Ensures your money and data stay safe with encryption, multi-factor authentication, and real-time fraud protection",
  },
  {
    animation: require("@/assets/images/security.gif"),
    title: "Instant Notification",
    description:
      "Keep you updated with real-time alerts for transactions, account activity, and security updates—so you're always in control",
  },
];

export default function OnboardingScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mountGif, setMountGif] = useState(true);
  const { completeOnboarding } = useOnboard((state) => state);
  const translateX = useRef(new Animated.Value(0)).current;

  const { width } = useWindowDimensions();
  const isMobile = width < 768;

  const handleNext = async () => {
    if (currentIndex < screens.length - 1) {
      setCurrentIndex((prev) => prev + 1);
    } else {
      setMountGif(false);
      completeOnboarding(false);
      await AsyncStorage.setItem("hasLaunched", "true");
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
    }
  };

  const panResponder = isMobile
    ? PanResponder.create({
        onStartShouldSetPanResponder: () => true,
        onMoveShouldSetPanResponder: () => true,
        onPanResponderMove: (_, gestureState) => {
          translateX.setValue(gestureState.dx);
        },
        onPanResponderRelease: (_, gestureState) => {
          if (gestureState.dx < -50 && currentIndex < screens.length - 1) {
            Animated.timing(translateX, {
              toValue: -500,
              duration: 200,
              useNativeDriver: true,
            }).start(() => {
              translateX.setValue(0);
              handleNext();
            });
          } else if (gestureState.dx > 50 && currentIndex > 0) {
            Animated.timing(translateX, {
              toValue: 500,
              duration: 200,
              useNativeDriver: true,
            }).start(() => {
              translateX.setValue(0);
              handlePrev();
            });
          } else {
            Animated.spring(translateX, {
              toValue: 0,
              useNativeDriver: true,
            }).start();
          }
        },
      })
    : null;

  return (
    <Container>
      <ContentWrapper
        {...(panResponder?.panHandlers || {})}
        style={{ transform: [{ translateX }] }}
      >
        {mountGif ? (
          <AnimationContainer>
            <Image
              source={screens[currentIndex].animation}
              resizeMode="contain"
              style={{
                width: "100%",
                height: "100%",
              }}
            />
          </AnimationContainer>
        ) : null}

        <TitleText>{screens[currentIndex].title}</TitleText>
        <DescriptionText>{screens[currentIndex].description}</DescriptionText>
      </ContentWrapper>

      <BottomSection>
        <PaginationContainer>
          {screens.map((_, index) => (
            <PaginationDot key={index} isActive={currentIndex === index} />
          ))}
        </PaginationContainer>
        <Button
          mode="contained"
          onPress={handleNext}
          contentStyle={{ height: 50 }}
          style={{ width: 320, backgroundColor: "white", borderRadius: 10 }}
          labelStyle={{ color: "#006d84", fontFamily: "PoppinsBold" }}
        >
          {currentIndex === screens.length - 1 ? "GET STARTED" : "NEXT"}
        </Button>
      </BottomSection>
    </Container>
  );
}
