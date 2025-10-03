import React, { ReactElement } from "react";
import { FlatList, View } from "react-native";
import Animated from "react-native-reanimated";
import { Avatar, Text } from "react-native-paper";

import { transaction } from "@/data/home";
import Container from "@/components/Container";

const Transaction = (): ReactElement => {
  return (
    <Container>
      <Animated.View
        style={{
          flexDirection: "column",
          rowGap: 3,
        }}
      >
        <FlatList
          data={transaction}
          keyExtractor={(_item, index) => index.toString()}
          renderItem={({ item }) => (
            <View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                  backgroundColor: "#FFFFFF",
                  borderBottom: "1px solid #c3c3c3ff",
                }}
              >
                <View style={{ flexDirection: "row", columnGap: 4 }}>
                  <Avatar.Text label="AP" size={30} />
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
              </View>
            </View>
          )}
          ListEmptyComponent={
            <Animated.View
              style={{
                paddingVertical: 16,
              }}
            >
              <Text
                variant="bodyMedium"
                style={{ textAlign: "center", color: "gray" }}
              >
                No recent transactions available
              </Text>
            </Animated.View>
          }
        />
      </Animated.View>
    </Container>
  );
};

export default Transaction;
