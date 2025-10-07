import React from "react";
import { ReactElement } from "react";
import { View } from "react-native";
import { Avatar, Text } from "react-native-paper";
import { styled } from "styled-components/native";

interface ITransactionItem {
  title: string;
  category: string;
  price: string;
}
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
const TextBold = styled(Text)({
  fontFamily: "PoppinsBold",
});

const TransactionItem = (props: ITransactionItem): ReactElement => {
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

export default TransactionItem;
