import React, { useState, useRef } from "react";
import {
  Animated,
  PanResponder,
  useWindowDimensions,
  Image,
  View,
  Text
} from "react-native";
import { Button } from "react-native-paper";
import styled from "styled-components/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { screens } from "./utils";

interface IOnboarding {
  completeOnboarding: (isOnboarded: boolean) => void;
}
interface PaginationDotProps {
  isActive: boolean
}

const Container = styled.View({
  flex: 1,
  backgroundColor: "#006d84",
});

const ContentWrapper = styled(Animated.View)({
  flex: 1,
  alignItems: "center",
  justifyContent: "center",
  padding: 20,
  paddingBottom: 140,
});

const AnimationContainer = styled.View({
  width: "100%",
  height: 200,
  alignItems: "center",
  justifyContent: "center",
  marginBottom: 40,
});

const TitleText = styled(Text)({
  color: "white",
  fontSize: 24,
  fontWeight: "bold",
  textAlign: "center",
  marginBottom: 16,
});

const DescriptionText = styled(Text)({
  color: "rgba(255, 255, 255, 0.8)",
  fontSize: 16,
  textAlign: "center",
  lineHeight: 24,
  maxWidth: 320,
});

const BottomSection = styled(View)({
  position: "absolute",
  bottom: 0,
  left: 0,
  right: 0,
  padding: 70,
  alignItems: "center",
});

const PaginationContainer = styled.View({
  flexDirection: "row",
  gap: 8,
  marginBottom: 20,
});

const PaginationDot = styled(View)((props: PaginationDotProps) => ({
  width: props.isActive ? 24 : 8,
  height: 8,
  borderRadius: 4,
  backgroundColor: props.isActive ? "white" : "rgba(255, 255, 255, 0.3)",
}));

const OnboardingScreen = (props: IOnboarding) => {
  const { completeOnboarding } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mountGif, setMountGif] = useState(true);
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
};

export default OnboardingScreen;
