import { TransactionProsps } from "@/store/mycard/useCardData";
import React from "react";
import { ReactNode } from "react";
import { View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import { styled } from "styled-components/native";

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

export default ViewMore;
