import { CardDataProps } from "@/store/mycard/useCardData";
import theme from "@/theme";
import { Router } from "expo-router";
import React from "react";
import { ReactElement } from "react";
import { TouchableOpacity, View } from "react-native";
import { Surface, Text } from "react-native-paper";
import { styled } from "styled-components/native";
import ViewMore from "./ViewMore";
import { useTranslation } from "react-i18next";
import { localizationKey } from "@/i18n/key";
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

interface ICardDetails {
  data: CardDataProps;
  reroute: Router;
  key: number;
}

const CardDetails = (props: ICardDetails): ReactElement => {
  const { data, reroute, key } = props;
  const { t } = useTranslation();
  const localKey = localizationKey.tabs.myCard;
  const detailsLabel = [
    t(localKey.outstandingBalance),
    t(localKey.availableCredit),
  ];
  return (
    <ParentView key={key}>
      <PointView>
        <StyledPointTitle variant="titleMedium">
          {t(localKey.pointBalance)}
        </StyledPointTitle>
        <StyledPointContent variant="headlineLarge">
          {data.pointBalance}
        </StyledPointContent>
      </PointView>
      <CategoryView>
        <TextBold variant="labelLarge">{t(localKey.accountDetails)}</TextBold>
        <StyledAccountView>
          {data.account.map(({ value }, index) => (
            <HeaderView key={index}>
              <StyledAccountText>{detailsLabel[index]}</StyledAccountText>
              <StyledAccountText>{value}</StyledAccountText>
            </HeaderView>
          ))}
        </StyledAccountView>
      </CategoryView>
      <CategoryView>
        <HeaderView>
          <TextBold variant="labelLarge">
            {t(localKey.recentTransaction)}
          </TextBold>
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
              {t(localKey.viewMore)}
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

export default CardDetails;
