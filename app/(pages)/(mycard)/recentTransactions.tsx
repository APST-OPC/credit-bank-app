import React, { ReactElement } from "react";
import { FlatList, Platform, TouchableOpacity, View } from "react-native";
import Animated from "react-native-reanimated";
import { Avatar, Text } from "react-native-paper";
import Container from "@/components/Container";
import { useCardData } from "@/store/mycard/useCardData";

const RecentTransactions = (): ReactElement => {
  const { cardData, activeIndex } = useCardData();
  const transactionList =
    Platform.OS === "web"
      ? cardData[activeIndex.web].transaction
      : cardData[activeIndex.mobile].transaction;
  return (
    <Container>
      <Animated.View
        style={{
          flexDirection: "column",
          rowGap: 3,
        }}
      >
        <FlatList
          data={transactionList}
          nestedScrollEnabled={true}
          renderItem={({ item, index }) => (
            <TouchableOpacity key={index}>
              <Animated.View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                  backgroundColor: "#FFFFFF",
                }}
              >
                <View style={{ flexDirection: "row", columnGap: 4 }}>
                  <Avatar.Text
                    label={item.title.slice(0, 2).toUpperCase()}
                    size={30}
                  />
                  <View>
                    <Text
                      variant="labelLarge"
                      style={{ fontFamily: "PoppinsSemiBold" }}
                    >
                      {item.title}
                    </Text>
                    <Text
                      variant="labelSmall"
                      style={{
                        flexWrap: "wrap",
                        fontFamily: "Poppins",
                      }}
                    >
                      {item.category}
                    </Text>
                  </View>
                </View>

                <Text
                  variant="labelSmall"
                  style={{ color: "#A0A0A0", fontFamily: "Poppins" }}
                >
                  {item.price}
                </Text>
              </Animated.View>
            </TouchableOpacity>
          )}
        />
      </Animated.View>
    </Container>
  );
};

export default RecentTransactions;
