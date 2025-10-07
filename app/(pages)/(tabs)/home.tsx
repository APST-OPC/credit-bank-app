import React, { ReactElement } from "react";
import { useRouter } from "expo-router";
import { FlatList, TouchableOpacity, View } from "react-native";
import { Avatar, Badge, Surface, Text } from "react-native-paper";
import styled from "styled-components/native";

import { Ionicons } from "@expo/vector-icons";

import CreditCard from "@/components/mycard/credit-carousel/CreditCard";
import ParallaxScrollView from "@/components/ParralaxView";
import { initialNotifications, transaction } from "@/data/home";
import { useAppTheme } from "@/hooks/useTheme";
import { creditCardArray } from "@/data/mycard";
import theme from "@/theme";
import { useTranslation } from "react-i18next";
import Menu from "@/components/tabs/home/Menu";
import TransactionItem from "@/components/tabs/home/TransactionItem";
import { localizationKey } from "@/i18n/key";

const BlueBackground = styled(View)({
  width: "100%",
  height: 250,
  backgroundColor: theme.colors.primary,
  position: "absolute",
  borderBottomLeftRadius: 24,
  borderBottomRightRadius: 24,
});

const WhiteText = styled(Text)({
  color: "#FFFFFF",
  fontFamily: "Poppins",
});

const TextBold = styled(Text)({
  fontFamily: "PoppinsBold",
});

const StyledAccountView = styled(View)({
  flexDirection: "row",
  padding: "10px 15px 10px 15px",
  backgroundColor: "#004068",
  borderRadius: 10,
  justifyContent: "space-between",
  alignItems: "center",
  gap: 10,
});
const StyledAccountText = styled(Text)({
  fontFamily: "PoppinsBold",
  color: "white",
});

const HomeScreen = (): ReactElement => {
  const router = useRouter();
  const theme = useAppTheme();
  const { t } = useTranslation();
  const localKey = localizationKey.tabs.home;

  const unreadCount = initialNotifications.filter(
    (notification) => !notification.read
  ).length;

  const handleNotification = () => {
    router.push("/notification");
  };

  const handleViewRecent = () => {
    router.push("/transaction");
  };

  const renderHeader = () => {
    return (
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <View
          style={{
            flexDirection: "row",
            gap: 10,
            alignItems: "center",
          }}
        >
          <Avatar.Image
            size={40}
            source={{
              uri: "https://images7.alphacoders.com/489/thumb-1920-489447.jpg",
            }}
          />
          <View>
            <WhiteText variant="labelSmall">
              {t(localKey.welcomeMsg)}
            </WhiteText>
            <WhiteText variant="labelLarge">Charles James</WhiteText>
          </View>
        </View>

        <TouchableOpacity
          onPress={handleNotification}
          hitSlop={20}
          style={{ backgroundColor: "transparent" }}
        >
          <Badge style={{ position: "absolute", top: -5, right: 23 }}>
            {unreadCount}
          </Badge>
          <Ionicons name="notifications" size={30} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
    );
  };

  const renderBalance = () => {
    return (
      <StyledAccountView>
        <StyledAccountText>
          {t(localKey.availableCredit)}
        </StyledAccountText>
        <StyledAccountText>PHP 60,530.00</StyledAccountText>
      </StyledAccountView>
    );
  };

  return (
    <ParallaxScrollView>
      <BlueBackground />

      <View style={{ padding: 15, rowGap: 15 }}>
        {renderHeader()}

        <CreditCard creditCard={creditCardArray[0]} />
        {renderBalance()}

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            alignContent: "center",
          }}
        >
          <Menu />
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextBold variant="labelLarge">
            {t(localKey.recentTransaction)}
          </TextBold>
          <TouchableOpacity hitSlop={20} onPress={handleViewRecent}>
            <Text
              variant="bodySmall"
              style={{
                fontFamily: "PoppinsSemiBold",
                color: theme.colors.primary,
              }}
            >
              {t(localKey.viewMore)}
            </Text>
          </TouchableOpacity>
        </View>

        <Surface
          style={{
            backgroundColor: theme.colors.background,
            borderRadius: 16,
            paddingHorizontal: 16,
            paddingVertical: 16,
          }}
        >
          <FlatList
            scrollEnabled={false}
            data={transaction.slice(0, 4)}
            keyExtractor={(_item, index) => index.toString()}
            renderItem={({ item }) => (
              <TransactionItem
                title={item.title}
                price={item.price}
                category={item.category}
              />
            )}
            ListEmptyComponent={
              <Text
                variant="bodyMedium"
                style={{ textAlign: "center", color: "gray" }}
              >
                No recent transactions available
              </Text>
            }
          />
        </Surface>
      </View>
    </ParallaxScrollView>
  );
};

export default HomeScreen;
