import React, { ReactElement } from "react";
import { RelativePathString, useRouter } from "expo-router";
import {
  FlatList,
  Image,
  Pressable,
  TouchableOpacity,
  View,
} from "react-native";
import { Avatar, Badge, Surface, Text } from "react-native-paper";
import styled from "styled-components/native";

import { Ionicons } from "@expo/vector-icons";

import CreditCard from "@/components/mycard/credit-carousel/CreditCard";
import ParallaxScrollView from "@/components/ParralaxView";
import { initialNotifications, menuList, transaction } from "@/data/home";
import { useAppTheme } from "@/hooks/useTheme";
import { creditCardArray } from "@/data/mycard";
import theme from "@/theme";

interface TransactionItem {
  title: string;
  category: string;
  price: string;
}

const BlueBackground = styled(View)({
  width: "100%",
  height: 250,
  backgroundColor: theme.colors.primary,
  position: "absolute",
  borderBottomLeftRadius: 24,
  borderBottomRightRadius: 24,
});

const TransactionContainer = styled(View)({
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
});

const TransactionAvatar = styled(View)({
  flexDirection: "row",
  gap: 5,
  alignItems: "center",
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

const RenderTransactionItem = (props: TransactionItem): ReactElement => {
  return (
    <TransactionContainer>
      <TransactionAvatar>
        <Avatar.Text size={30} label={props.title.slice(0, 2).toUpperCase()} />
        <View>
          <TextBold>{props.title}</TextBold>
          <Text
            variant="labelSmall"
            style={{
              fontFamily: "Poppins",
            }}
          >
            {props.category}
          </Text>
        </View>
      </TransactionAvatar>

      <Text>{props.price}</Text>
    </TransactionContainer>
  );
};

export default function HomeScreen() {
  const router = useRouter();

  const theme = useAppTheme();

  const unreadCount = initialNotifications.filter(
    (notification) => !notification.read
  ).length;

  const handleNotification = () => {
    router.push("/notification");
  };

  const handleViewRecent = () => {
    router.push("/transaction");
  };

  const handleNavigateMenu = (route: RelativePathString) => {
    router.push(route);
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
            <WhiteText variant="labelSmall">Welcome back,</WhiteText>
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

  const renderMenu = () => {
    return menuList.map((item, ids) => (
      <Pressable
        key={ids}
        onPress={() => handleNavigateMenu(item.route as RelativePathString)}
      >
        <Surface
          style={{
            backgroundColor: theme.colors.background,
            borderRadius: 16,
            paddingHorizontal: 16,
            alignItems: "center",
            width: 100,
            height: 125,
            justifyContent: "center",
          }}
        >
          <Image source={item.image} style={{ width: 70, height: 70 }} />
          <Text
            variant="labelMedium"
            style={{
              textAlign: "center",
              fontFamily: "PoppinsSemiBold",
              fontSize: 12,
            }}
          >
            {item.label}
          </Text>
        </Surface>
      </Pressable>
    ));
  };

  const renderBalance = () => {
    return (
      <StyledAccountView>
        <StyledAccountText>Available Credit</StyledAccountText>
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
          {renderMenu()}
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <TextBold variant="labelLarge">Recent Transaction</TextBold>
          <TouchableOpacity hitSlop={20} onPress={handleViewRecent}>
            <Text
              variant="bodySmall"
              style={{
                fontFamily: "PoppinsSemiBold",
                color: theme.colors.primary,
              }}
            >
              View more
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
              <RenderTransactionItem
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
}
