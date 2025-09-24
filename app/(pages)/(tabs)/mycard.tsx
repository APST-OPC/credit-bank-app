import { Text, Avatar, Chip, Surface } from "react-native-paper";
import { Router, useRouter } from "expo-router";
import { Platform, View, TouchableOpacity } from "react-native";
import styled from "styled-components/native";
import ParallaxScrollView from "@/components/ParralaxView";
import CreditCarousel from "@/components/mycard/credit-carousel/CreditCarousel";
import {
  CardDataProps,
  TransactionProsps,
  useCardData,
} from "@/store/mycard/useCardData";
import theme from "@/theme";
import { Ionicons } from "@expo/vector-icons";
import React, { ReactElement, ReactNode } from "react";

const ParentView = styled(View)({
  padding: 15,
  gap: 15,
});
const CategoryView = styled(View)({
  gap: 10,
});
const HeaderView = styled(View)({
  display: "flex",
  flexDirection: "row",
  flexGrow: 1,
  justifyContent: "space-between",
  alignItems: "center",
});

const PointView = styled(View)({
  backgroundColor: theme.colors.tertiary,
  borderRadius: 10,
  padding: 5,
});
const StyledPointTitle = styled(Text)({
  color: "white",
  textAlign: "center",
  padding: 10,
  fontFamily: "PoppinsBold",
});
const StyledPointContent = styled(Text)({
  textAlign: "center",
  padding: 10,
  width: "100%",
  backgroundColor: "white",
  borderBottomRightRadius: 7,
  borderBottomLeftRadius: 7,
  fontWeight: "600",
});

const StyledAccountView = styled(View)({
  padding: "10px 15px 10px 15px",
  backgroundColor: "#004068",
  borderRadius: 10,
  gap: 10,
});
const StyledAccountText = styled(Text)({
  fontFamily: "PoppinsBold",
  color: "white",
});

const StyledTransactionCard = styled(Surface)({
  gap: 15,
  padding: 15,
  borderRadius: 15,
  backgroundColor: "white",
});
const TextBold = styled(Text)({
  fontFamily: "PoppinsBold",
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

const ViewMore = ({ item }: { item: TransactionProsps[] }): ReactNode[] => {
  return item.map(({ title, category, price }, index) => {
    const newPrice = price.replace(/[^0-9]/g, "");
    if (index <= 3) {
      return (
        <TransactionContainer key={index}>
          <TransactionAvatar>
            <Avatar.Text size={30} label={title.slice(0, 2).toUpperCase()} />
            <View>
              <TextBold>{title}</TextBold>
              <Text
                variant="labelSmall"
                style={{
                  fontFamily: "Poppins",
                }}
              >
                {category}
              </Text>
            </View>
          </TransactionAvatar>

          <Text>{`$ ${newPrice}`}</Text>
        </TransactionContainer>
      );
    } else return null;
  });
};

const renderCardDetails = (
  data: CardDataProps,
  reroute: Router,
  key: number
): ReactElement => {
  return (
    <ParentView key={key}>
      <PointView>
        <StyledPointTitle variant="titleMedium">Point Balance</StyledPointTitle>
        <StyledPointContent variant="headlineLarge">
          {data.pointBalance}
        </StyledPointContent>
      </PointView>
      <CategoryView>
        <TextBold variant="labelLarge">Account Details</TextBold>
        <StyledAccountView>
          {data.account.map(({ label, value }, index) => (
            <HeaderView key={index}>
              <StyledAccountText>{label}</StyledAccountText>
              <StyledAccountText>{value}</StyledAccountText>
            </HeaderView>
          ))}
        </StyledAccountView>
      </CategoryView>
      <CategoryView>
        <HeaderView>
          <TextBold variant="labelLarge">Recent Transactions</TextBold>
          <TouchableOpacity
            onPress={() => reroute.push("/recentTransactions")}
            hitSlop={20}
          >
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
        </HeaderView>

        <StyledTransactionCard>
          {data.transaction.length <= 0 ? (
            <Text>No Transaction Available</Text>
          ) : (
            <ViewMore item={data.transaction} />
          )}
        </StyledTransactionCard>
      </CategoryView>
    </ParentView>
  );
};

const MyCards = (): ReactElement => {
  const reroute = useRouter();
  const { activeIndex, cardData } = useCardData();
  const platformView = () => {
    if (Platform.OS === "web") {
      return cardData.map((data, index) =>
        activeIndex.web === index
          ? renderCardDetails(data, reroute, index)
          : null
      );
    } else {
      return cardData.map((data, index) =>
        activeIndex.mobile === index
          ? renderCardDetails(data, reroute, index)
          : null
      );
    }
  };
  return (
    <ParallaxScrollView>
      <ParentView>
        <HeaderView>
          <Text variant="titleMedium" style={{ fontFamily: "PoppinsSemiBold" }}>
            My Cards
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
            New Card
          </Chip>
        </HeaderView>
      </ParentView>
      <CreditCarousel />
      {platformView()}
    </ParallaxScrollView>
  );
};

export default MyCards;
