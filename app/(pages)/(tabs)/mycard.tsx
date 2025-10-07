import { Text, Chip } from "react-native-paper";
import { useRouter } from "expo-router";
import { Platform, View } from "react-native";
import styled from "styled-components/native";
import ParallaxScrollView from "@/components/ParralaxView";
import CreditCarousel from "@/components/mycard/credit-carousel/CreditCarousel";
import { useCardData } from "@/store/mycard/useCardData";
import theme from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { ReactElement } from "react";
import { useTranslation } from "react-i18next";
import { localizationKey } from "@/i18n/key";
import CardDetails from "@/components/tabs/my-card/CardDetails";

const ParentView = styled(View)({
  padding: 15,
  gap: 15,
});
const HeaderView = styled(View)({
  display: "flex",
  flexDirection: "row",
  flexGrow: 1,
  justifyContent: "space-between",
  alignItems: "center",
});
const MyCards = (): ReactElement => {
  const reroute = useRouter();
  const { activeIndex, cardData } = useCardData();
  const { t } = useTranslation();
  const platformView = () => {
    const { web, mobile } = activeIndex;
    if (Platform.OS === "web") {
      return cardData.map(
        (data, index) =>
          web === index && (
            <CardDetails data={data} key={index} reroute={reroute} />
          )
      );
    }
    return cardData.map(
      (data, index) =>
        mobile === index && (
          <CardDetails data={data} key={index} reroute={reroute} />
        )
    );
  };
  const localKey = localizationKey.tabs.myCard;
  return (
    <ParallaxScrollView>
      <ParentView>
        <HeaderView>
          <Text variant="titleMedium" style={{ fontFamily: "PoppinsSemiBold" }}>
            {t(localKey.myCards)}
          </Text>

          <Chip
            compact
            textStyle={{ color: "white", fontFamily: "PoppinsSemiBold" }}
            style={{ backgroundColor: theme.colors.primary }}
            icon={() => (
              <Ionicons name="add-outline" color={"white"} size={24} />
            )}
            onPress={() => reroute.navigate("/addNewCard")}
          >
            {t(localKey.newCard)}
          </Chip>
        </HeaderView>
      </ParentView>
      <CreditCarousel />
      {platformView()}
    </ParallaxScrollView>
  );
};

export default MyCards;
