import React from "react";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import "react-native-reanimated";
import { PaperProvider } from "react-native-paper";
import theme from "@/theme";
import styled from "styled-components/native";
import { View } from "react-native";
import { Image } from "expo-image";
import * as SplashScreen from "expo-splash-screen";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

SplashScreen.preventAutoHideAsync();

const ContainedView = styled(View)({
  maxWidth: 480,
  width: "100%",
  height: "100%",
  alignSelf: "center",
});

export default function RootLayout() {
  const [isSplashVisible, setIsSplashVisible] = useState<boolean>(true);
  const fadeAnim = useSharedValue(1);

  const [loaded] = useFonts({
    Poppins: require("../assets/fonts/Poppins-Regular.ttf"),
    PoppinsBold: require("../assets/fonts/Poppins-Bold.ttf"),
    PoppinsExtraBold: require("../assets/fonts/Poppins-ExtraBold.ttf"),
    PoppinsSemiBold: require("../assets/fonts/Poppins-SemiBold.ttf"),
  });

  useEffect(() => {
    if (!loaded) return;

    if (loaded) {
      SplashScreen.hideAsync().then(() => {
        setTimeout(() => {
          fadeAnim.value = withTiming(0, { duration: 500 });
          setTimeout(() => {
            setIsSplashVisible(false);
          }, 500);
        }, 1500);
      });
    }
  }, [loaded, fadeAnim]);

  const animatedStyle = useAnimatedStyle(() => ({
    opacity: fadeAnim.value,
  }));

  if (isSplashVisible) {
    return (
      <Animated.View
        style={[
          {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
            width: "100vw",
            overflow: "hidden",
          },
          animatedStyle,
        ]}
      >
        <View
          style={{
            maxWidth: 480,
            width: "100%",
            height: "100%",
            justifyContent: "center",
            alignItems: "center",
            overflow: "hidden",
            backgroundColor: "#0061A7",
          }}
        >
          <Image
            source={require("@/assets/images/logo.gif")}
            style={{
              width: 300,
              height: "50%",
            }}
          />
        </View>
      </Animated.View>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <ContainedView>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="(auth)"
        >
          <Stack.Screen name="(tabs)" />
          <Stack.Screen name="(home)" />
          <Stack.Screen name="(mycard)" />
          <Stack.Screen name="(auth)" />
          <Stack.Screen name="(settings)" />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="auto" backgroundColor={theme.colors.primary} />
      </ContainedView>
    </PaperProvider>
  );
}
